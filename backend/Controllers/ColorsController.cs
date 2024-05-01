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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetColors()
        {
            var colors = await _uow.ColorRepository.GetColors();
            return Ok(colors);
        }
        [HttpGet]
        [Route("Show")]
        public async Task<IActionResult> GetColorsShow()
        {
            var colors = await _uow.ColorRepository.GetColorsShow();
            return Ok(colors);
        }
        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
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
            return await _uow.ColorRepository.UpdateColor(id, color);
        }
        [HttpPut]
        [Route("UpdateStatusColor/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusColor(int id, bool status)
        {
            return await _uow.ColorRepository.UpdateStatusColor(id, status);
        }
    }
}
