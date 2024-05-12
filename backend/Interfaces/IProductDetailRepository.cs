using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductDetailRepository
    {
        Task<IActionResult> CreateProductDetail(ProductDetail productDetail);
        Task<IEnumerable<ProductDetail>> GetProductDetails();
        Task<IEnumerable<ProductDetail>> GetProductDetailsActive();
        Task<ProductDetail> GetProductDetail(int id);
        Task<ProductDetail> GetAProductDetailForUser(int productId, int colorId, int capacityId);
        Task<bool> ProductDetailExist(int id);
        Task<bool> CheckProductDetailExist(ProductDetail productDetail);
        Task<IActionResult> UpdateProductDetail(int id, ProductDetail productDetail);
        Task<IActionResult> UpdateStatusProductDetail(int id, bool status);
    }
}
