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
            return await _uow.SlideshowRepository.CreateSlideshow(slideshow);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSlideShow(int id)
        {
            return await _uow.SlideshowRepository.DeleteSlideshow(id);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSlideShow(int id, Slideshow slideshow)
        {
            return await _uow.SlideshowRepository.UpdateSlideshow(id, slideshow);
        }
        [HttpPut]
        [Route("UpdateStatusSlideshow/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusSlideshow(int id, bool status)
        {
            return await _uow.SlideshowRepository.UpdateStatusSlideshow(id, status);
        }
    }
}
