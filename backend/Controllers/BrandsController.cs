using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public BrandsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetBrands()
        {
            var brands = await _uow.BrandRepository.GetBrands();
            return Ok(brands);
        }
        [HttpGet]
        [Route("Show")]
        public async Task<IActionResult> GetBrandsShow()
        {
            var brands = await _uow.BrandRepository.GetBrandsShow();
            return Ok(brands);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetBrand(int id)
        {
            var brand = await _uow.BrandRepository.GetBrand(id);
            return Ok(brand);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateBrand(Brand brand)
        {
            return await _uow.BrandRepository.CreateBrand(brand);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBrand(int id, Brand brand)
        {
            return await _uow.BrandRepository.UpdateBrand(id, brand);
        }
        [HttpPut]
        [Route("UpdateStatusBrand/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusBrand(int id, bool status)
        {
            return await _uow.BrandRepository.UpdateStatusBrand(id, status);
        }
    }
}
