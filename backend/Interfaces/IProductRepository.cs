using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductRepository
    {
        Task<IActionResult> CreateProduct(Product product, string userId);
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<ProductDisplayModel>> GetProductsActive();
        Task<IEnumerable<ProductDisplayModel>> GetProductsActiveByBrand(int brandId);
        Task<IEnumerable<ProductDisplayModel>> GetProductsActiveByCategory(int categoryId);
        Task<IEnumerable<Product>> SearchProductByName(string name);
        Task<IEnumerable<ProductBestSellerModel>> GetProductsBestSeller(FillterModel fillterModel);
        Task<Product> GetProduct(int id);
        Task<Product> GetProductActiveByName(string name);
        Task<bool> ProductExist(Product product);
        Task<IActionResult> UpdateProduct(int id, Product product, string userId);
        Task<IActionResult> UpdateStatusProduct(int id, bool status, string userId);
    }
}
