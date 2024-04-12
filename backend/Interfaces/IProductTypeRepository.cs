using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductTypeRepository
    {
        Task<IActionResult> CreateProductType(ProductType productType);
        Task<IEnumerable<ProductType>> GetProductTypes();
        Task<IEnumerable<ProductType>> GetProductTypesAdmin();
        Task<ProductType> GetProductType(int id);
        Task<bool> ProductTypeExist(int id);
        Task<bool> CheckProductTypeTitleExist(string title);
        Task<IActionResult> UpdateProductType(int id, ProductType productType);
        Task<IActionResult> UpdateStatusProductType(int id, bool status);
    }
}
