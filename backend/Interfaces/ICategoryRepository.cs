using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IActionResult> CreateCategory(Category category, string userId);
        Task<IEnumerable<Category>> GetCategories();
        Task<IEnumerable<Category>> GetCategoriesShow();
        Task<Category> GetCategory(int id);
        Task<bool> CategoryExist(int id);
        Task<bool> CheckCategoryTitleExist(Category category);
        Task<IActionResult> UpdateCategory(int id, Category category, string userId);
        Task<IActionResult> UpdateStatusCategory(int id, bool status, string userId);
    }
}
