using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadPhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public UploadPhotosController(IPhotoService photoService)
        {
            _photoService = photoService;
        }
        [HttpPost]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            var result = await _photoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var photo = new PhotoModel
            {
                PublicId = result.PublicId,
                Url = result.SecureUrl.ToString()
            };
            return Ok(photo);
        }
    }
}
