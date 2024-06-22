using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ProductDetailsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetProductDetails()
        {
            var products = await _uow.ProductDetailRepository.GetProductDetails();
            return Ok(products);
        }
        [HttpGet]
        [Route("Active")]
        public async Task<IActionResult> GetProductDetailsActive()
        {
            var products = await _uow.ProductDetailRepository.GetProductDetailsActive();
            return Ok(products);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _uow.ProductDetailRepository.GetProductDetail(id);
            return Ok(product);
        }
        [HttpGet]
        [Route("GetAProductDetailForUser/{productId}/{colorId}/{capacityId}")]
        public async Task<IActionResult> GetAProductDetailForUser(int productId, int colorId, int capacityId)
        {
            var product = await _uow.ProductDetailRepository.GetAProductDetailForUser(productId, colorId, capacityId);
            return Ok(product);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProductDetail(ProductDetail product)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.ProductDetailRepository.CreateProductDetail(product, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProductDetail(int id, ProductDetail product)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.ProductDetailRepository.UpdateProductDetail(id, product, userId);
        }
        [HttpPut]
        [Route("UpdateStatusProductDetail/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusProductDetail(int id, bool status)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.ProductDetailRepository.UpdateStatusProductDetail(id, status, userId); 
        }
    }
}
