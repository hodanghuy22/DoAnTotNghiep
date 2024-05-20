using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CapacitiesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public CapacitiesController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCapacities()
        {
            var capacities = await _uow.CapacityRepository.GetCapacities();
            //var capacitiesDto = _mapper.Map<IEnumerable<BrandDto>>(brands);
            return Ok(capacities);
        }
        [HttpGet]
        [Route("Show")]
        public async Task<IActionResult> GetCapacitiesShow()
        {
            var capacities = await _uow.CapacityRepository.GetCapacitiesShow();
            return Ok(capacities);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCapacity(int id)
        {
            var capacity = await _uow.CapacityRepository.GetCapacity(id);
            //var brandDto = _mapper.Map<BrandDto>(brand);
            return Ok(capacity);
        }
        [HttpGet]
        [Route("GetCapacitiesByProductId/{id}")]
        public async Task<IActionResult> GetCapacitiesByProductId(int id)
        {
            var capacity = await _uow.CapacityRepository.GetCapacitiesByProductId(id);
            return Ok(capacity);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCapacity(Capacity capacity)
        {
            return await _uow.CapacityRepository.CreateCapacity(capacity);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCapacity(int id, Capacity capacity)
        {
            if (id != capacity.Id)
            {
                return BadRequest();
            }
            return await _uow.CapacityRepository.UpdateCapacity(id, capacity);
        }
        [HttpPut]
        [Route("UpdateStatusCapacity/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusCapacity(int id, bool status)
        {
            return await _uow.CapacityRepository.UpdateStatusCapacity(id, status);
        }
    }
}
