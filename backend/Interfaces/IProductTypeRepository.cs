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
        Task<bool> ProductExist(int id);
        Task<IActionResult> UpdateProductType(ProductType productType);
        Task<IActionResult> DeleteProductType(int id);
    }
}
