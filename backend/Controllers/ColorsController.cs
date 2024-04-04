using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ColorsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetColors()
        {
            var colors = await _uow.ColorRepository.GetColors();
            return Ok(colors);
        }
        [HttpGet]
        [Route("GetColorsShow")]
        public async Task<IActionResult> GetColorsShow()
        {
            var colors = await _uow.ColorRepository.GetColorsShow();
            return Ok(colors);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetColor(int id)
        {
            var color = await _uow.ColorRepository.GetColor(id);
            return Ok(color);
        }

        [HttpGet]
        [Route("GetColorByProductId/{id}")]
        public async Task<IActionResult> GetColorByProductId(int id)
        {
            var color = await _uow.ColorRepository.GetColorsByProductId(id);
            return Ok(color);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateColor(Color color)
        {
            return await _uow.ColorRepository.CreateColor(color);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateColor(int id, Color color)
        {
            if (id != color.Id)
            {
                return BadRequest();
            }
            return await _uow.ColorRepository.UpdateColor(color);
        }
        [HttpDelete]
        [Route("DeleteColor/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            return await _uow.ColorRepository.DeleteColor(id);
        }
    }
}
