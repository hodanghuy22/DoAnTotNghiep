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
        [Route("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _uow.ProductDetailRepository.GetProductDetail(id);
            return Ok(product);
        }
        [HttpGet]
        [Route("GetAProductDetailForUser/{phoneId}/{colorId}/{capacityId}")]
        public async Task<IActionResult> GetAProductDetailForUser(int phoneId, int colorId, int capacityId)
        {
            var product = await _uow.ProductDetailRepository.GetAProductDetailForUser(phoneId, colorId, capacityId);
            return Ok(product);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProductDetail(ProductDetail product)
        {
            return await _uow.ProductDetailRepository.CreateProductDetail(product);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProductDetail(int id, ProductDetail product)
        {
            return await _uow.ProductDetailRepository.UpdateProductDetail(id, product);
        }
        [HttpPut]
        [Route("UpdateStatusProductDetail/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusProductDetail(int id, bool status)
        {
            return await _uow.ProductDetailRepository.UpdateStatusProductDetail(id, status); 
        }
    }
}
