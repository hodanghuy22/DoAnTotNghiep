using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public CategoriesController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _uow.CategoryRepository.GetCategories();
            return Ok(categories);
        }
        [HttpGet]
        [Route("Show")]
        public async Task<IActionResult> GetCategoriesShow()
        {
            var categories = await _uow.CategoryRepository.GetCategoriesShow();
            return Ok(categories);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _uow.CategoryRepository.GetCategory(id);
            return Ok(category);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.CategoryRepository.CreateCategory(category, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.CategoryRepository.UpdateCategory(id, category, userId);
        }
        [HttpPut]
        [Route("UpdateStatusCategory/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusCategory(int id, bool status)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.CategoryRepository.UpdateStatusCategory(id, status, userId);
        }
    }
}
