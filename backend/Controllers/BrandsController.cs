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
        [Authorize(Roles = "Admin")]
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
        [Route("GetBrandsByCategory/{categoryId}")]
        public async Task<IActionResult> GetBrandsByCategory(int categoryId)
        {
            var brands = await _uow.BrandRepository.GetBrandsByCategory(categoryId);
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
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.BrandRepository.CreateBrand(brand, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBrand(int id, Brand brand)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.BrandRepository.UpdateBrand(id, brand, userId);
        }
        [HttpPut]
        [Route("UpdateStatusBrand/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusBrand(int id, bool status)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.BrandRepository.UpdateStatusBrand(id, status, userId);
        }
    }
}
