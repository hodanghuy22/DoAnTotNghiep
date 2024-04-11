using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ProductTypesController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProductType(ProductType productType)
        {
           return await _uow.ProductTypeRepository.CreateProductType(productType);
        }
        [HttpGet]
        public async Task<IActionResult> GetProductTypes()
        {
            var productTypes = await _uow.ProductTypeRepository.GetProductTypes();
            return Ok(productTypes);
        }
        [HttpGet]
        [Route("GetProductTypesAdmin")]
        public async Task<IActionResult> GetProductTypesAdmin()
        {
            var productTypes = await _uow.ProductTypeRepository.GetProductTypesAdmin();
            return Ok(productTypes);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProductType(int id)
        {
            var productTypes = await _uow.ProductTypeRepository.GetProductType(id);
            if (productTypes == null)
            {
                return NotFound();
            }
            return Ok(productTypes);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProductType(int id, ProductType productType)
        {
            if (id != productType.Id)
            {
                return BadRequest();
            }
            return await _uow.ProductTypeRepository.UpdateProductType(productType);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            return await _uow.ProductTypeRepository.DeleteProductType(id);
        }
    }
}
