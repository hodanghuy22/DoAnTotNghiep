using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public ProductsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        [Route("Admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _uow.ProductRepository.GetProducts();
            return Ok(products);
        }
        [HttpGet]
        public async Task<IActionResult> GetProductsShow()
        {
            var products = await _uow.ProductRepository.GetProductsShow();
            return Ok(products);
        }
        [HttpGet]
        [Route("GetProductsByBrand/{brandId}")]
        public async Task<IActionResult> GetProductsByBrand(int brandId)
        {
            var products = await _uow.ProductRepository.GetProductsByBrand(brandId);
            return Ok(products);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var products = await _uow.ProductRepository.GetProduct(id);
            return Ok(products);
        }
        [HttpGet]
        [Route("GetProductByName/{name}")]
        public async Task<IActionResult> GetProductByName(string name)
        {
            var products = await _uow.ProductRepository.GetProductByName(name);
            return Ok(products);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            return await _uow.ProductRepository.CreateProduct(product);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            return await _uow.ProductRepository.UpdateProduct(id, product);
        }
        [HttpPut]
        [Route("UpdateStatusProduct/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusProduct(int id, bool status)
        {
            return await _uow.ProductRepository.UpdateStatusProduct(id, status);
        }
    }
}
