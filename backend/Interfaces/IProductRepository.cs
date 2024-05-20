using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductRepository
    {
        Task<IActionResult> CreateProduct(Product product);
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Product>> GetProductsActive();
        Task<IEnumerable<Product>> GetProductsActiveByBrand(int brandId);
        Task<Product> GetProduct(int id);
        Task<Product> GetProductActiveByName(string name);
        Task<bool> ProductExist(Product product);
        Task<IActionResult> UpdateProduct(int id, Product product);
        Task<IActionResult> UpdateStatusProduct(int id, bool status);
    }
}
