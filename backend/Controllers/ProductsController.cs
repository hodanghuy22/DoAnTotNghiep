﻿using backend.Interfaces;
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _uow.ProductRepository.GetProducts();
            return Ok(products);
        }
        [HttpGet]
        [Route("Active")]
        public async Task<IActionResult> GetProductsActive()
        {
            var products = await _uow.ProductRepository.GetProductsActive();
            return Ok(products);
        }
        [HttpGet]
        [Route("GetProductsActiveByBrand/{brandId}")]
        public async Task<IActionResult> GetProductsActiveByBrand(int brandId)
        {
            var products = await _uow.ProductRepository.GetProductsActiveByBrand(brandId);
            return Ok(products);
        }
        [HttpGet]
        [Route("GetProductsActiveByCategory/{categoryId}")]
        public async Task<IActionResult> GetProductsActiveByCategory(int categoryId)
        {
            var products = await _uow.ProductRepository.GetProductsActiveByCategory(categoryId);
            return Ok(products);
        }
        [HttpGet]
        [Route("GetProductsActiveByCategoryAndBrand/{categoryId}/${brandId}")]
        public async Task<IActionResult> GetProductsActiveByCategoryAndBrand(int categoryId, int brandId)
        {
            var products = await _uow.ProductRepository.GetProductsActiveByCategoryAndBrand(categoryId, brandId);
            return Ok(products);
        }
        [HttpGet]
        [Route("SearchProductByName/{name}")]
        public async Task<IActionResult> SearchProductByName(string name)
        {
            var products = await _uow.ProductRepository.SearchProductByName(name);
            return Ok(products);
        }
        [HttpGet]
        [Route("SearchAProductByName/{name}")]
        public async Task<IActionResult> SearchAProductByName(string name)
        {
            var products = await _uow.ProductRepository.SearchAProductByName(name);
            return Ok(products);
        }
        [HttpGet]
        [Route("SearchProductByNameAndCategory/{name}/{categoryId}")]
        public async Task<IActionResult> SearchProductByNameAndCategory(string name, int categoryId)
        {
            var products = await _uow.ProductRepository.SearchProductByNameAndCategory(name, categoryId);
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
        [Route("GetProductActiveByName/{name}")]
        public async Task<IActionResult> GetProductActiveByName(string name)
        {
            var products = await _uow.ProductRepository.GetProductActiveByName(name);
            return Ok(products);
        }
        [HttpPost]
        [Route("GetProductsBestSeller")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetProductsBestSeller(FillterModel fillterModel)
        {
            var products = await _uow.ProductRepository.GetProductsBestSeller(fillterModel);
            return Ok(products);
        }
        [HttpPost]
        [Route("GetPopularProducts")]
        public async Task<IActionResult> GetPopularProducts(FillterModel fillterModel)
        {
            var products = await _uow.ProductRepository.GetPopularProducts(fillterModel);
            return Ok(products);
        }
        [HttpPost]
        [Route("GetPopularProductsByCategory/{categoryId}")]
        public async Task<IActionResult> GetPopularProductsByCategory(int categoryId, FillterModel fillterModel)
        {
            var products = await _uow.ProductRepository.GetPopularProductsByCategory(categoryId, fillterModel);
            return Ok(products);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.ProductRepository.CreateProduct(product, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.ProductRepository.UpdateProduct(id, product, userId);
        }
        [HttpPut]
        [Route("UpdateStatusProduct/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusProduct(int id, bool status)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.ProductRepository.UpdateStatusProduct(id, status, userId);
        }
    }
}
