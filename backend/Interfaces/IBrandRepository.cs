using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IBrandRepository
    {
        Task<IActionResult> CreateBrand(Brand brand);
        Task<IEnumerable<Brand>> GetBrands();
        Task<IEnumerable<Brand>> GetBrandsShow();
        Task<Brand> GetBrand(int id);
        Task<bool> BrandExist(int id);
        Task<IActionResult> UpdateBrand(Brand brand);
        Task<IActionResult> DeleteBrand(int id);
    }
}
