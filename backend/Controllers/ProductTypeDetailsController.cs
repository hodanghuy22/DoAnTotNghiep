using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeDetailsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public ProductTypeDetailsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetProductTypeDetails()
        {
            var ProductTypeDetail = await _uow.ProductTypeDetailRepository.GetProductTypeDetails();
            return Ok(ProductTypeDetail);
        }
        [HttpGet]
        [Route("GetProductsByProductType/{productTypeId}")]
        public async Task<IActionResult> GetProductsByProductType(int productTypeId)
        {
            if (productTypeId <= 0)
            {
                return BadRequest();
            }
            var ProductTypeDetail = await _uow.ProductTypeDetailRepository.GetProductsByProductType(productTypeId);
            return Ok(ProductTypeDetail);
        }

        [HttpGet]
        [Route("GetProductTypeByProductId/{productId}")]
        public async Task<IActionResult> GetProductTypeByProductId(int productId)
        {
            if (productId <= 0)
            {
                return BadRequest();
            }
            var ProductTypeDetail = await _uow.ProductTypeDetailRepository.GetProductTypeByProductId(productId);
            return Ok(ProductTypeDetail);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProductTypeDetail(int id)
        {
            var ProductTypeDetail = await _uow.ProductTypeDetailRepository.GetProductTypeDetail(id);
            return Ok(ProductTypeDetail);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProductTypeDetail(ProductTypeDetail productTypeDetail)
        {
            return await _uow.ProductTypeDetailRepository.CreateProductTypeDetail(productTypeDetail);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProductTypeDetail(int id, ProductTypeDetail productTypeDetail)
        {
            return await _uow.ProductTypeDetailRepository.UpdateProductTypeDetail(id, productTypeDetail);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProductTypeDetail(int id)
        {
            return await _uow.ProductTypeDetailRepository.DeleteProductTypeDetail(id);
        }
    }
}
