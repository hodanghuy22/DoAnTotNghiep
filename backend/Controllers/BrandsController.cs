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
            if (id != brand.Id)
            {
                return BadRequest();
            }
            return await _uow.BrandRepository.UpdateBrand(brand);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            return await _uow.BrandRepository.DeleteBrand(id);
        }
    }
}
