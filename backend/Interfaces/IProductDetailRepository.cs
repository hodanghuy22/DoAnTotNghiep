using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductDetailRepository
    {
        Task<IActionResult> CreateProductDetail(ProductDetail product);
        Task<IEnumerable<ProductDetail>> GetProductDetails();
        Task<ProductDetail> GetProductDetail(int id);
        Task<ProductDetail> GetAProductDetailForUser(int productId, int colorId, int capacityId);
        Task<bool> ProductDetailExist(int id);
        Task<bool> CheckProductDetailExist(int productId, int colorId, int capacityId);
        Task<IActionResult> UpdateProductDetail(int id, ProductDetail product);
        Task<IActionResult> UpdateStatusProductDetail(int id, bool status);
    }
}
