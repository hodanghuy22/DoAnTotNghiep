using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IBrandRepository
    {
        Task<IActionResult> CreateBrand(Brand brand, string userId);
        Task<IEnumerable<Brand>> GetBrands();
        Task<IEnumerable<Brand>> GetBrandsShow();
        Task<IEnumerable<Brand>> GetBrandsByCategory(int categoryId);
        Task<Brand> GetBrand(int id);
        Task<bool> BrandExist(int id);
        Task<bool> CheckBrandTitleExist(Brand brand);
        Task<IActionResult> UpdateBrand(int id, Brand brand, string userId);
        Task<IActionResult> UpdateStatusBrand(int id, bool status, string userId);
    }
}
