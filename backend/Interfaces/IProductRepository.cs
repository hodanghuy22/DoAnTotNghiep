using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductRepository
    {
        Task<IActionResult> CreateProduct(Product product);
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Product>> GetProductsShow();
        Task<IEnumerable<Product>> GetProductsByBrand(int brandId);
        Task<Product> GetProduct(int id);
        Task<Product> GetProductByName(string name);
        Task<bool> ProductExist(int id);
        Task<IActionResult> UpdateProduct(int id, Product product);
        Task<IActionResult> UpdateStatusProduct(int id, bool status);
    }
}
