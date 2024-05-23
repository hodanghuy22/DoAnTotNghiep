using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideshowsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public SlideshowsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet("Admin")]
        public async Task<IActionResult> GetSlideshows()
        {
            var sildeshows = await _uow.SlideshowRepository.GetSlideshows();
            return Ok(sildeshows);
        }

        [HttpGet]
        public async Task<IActionResult> GetSlideshowsForPresent()
        {
            var sildeshows = await _uow.SlideshowRepository.GetSlideshowsForPresent();
            return Ok(sildeshows);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSlideshow(int id)
        {
            var sildeshows = await _uow.SlideshowRepository.GetSlideshow(id);
            return Ok(sildeshows);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSlideShow(Slideshow slideshow)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.SlideshowRepository.CreateSlideshow(slideshow, userId);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSlideShow(int id)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.SlideshowRepository.DeleteSlideshow(id, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSlideShow(int id, Slideshow slideshow)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.SlideshowRepository.UpdateSlideshow(id, slideshow, userId);
        }
        [HttpPut]
        [Route("UpdateStatusSlideshow/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusSlideshow(int id, bool status)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.SlideshowRepository.UpdateStatusSlideshow(id, status, userId);
        }
    }
}
