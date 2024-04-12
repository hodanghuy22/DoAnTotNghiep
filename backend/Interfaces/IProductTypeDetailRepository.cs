using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProductTypeDetailRepository
    {
        Task<IActionResult> CreateProductTypeDetail(ProductTypeDetail productTypeDetail);
        Task<IEnumerable<ProductTypeDetail>> GetProductTypeDetails();
        Task<IEnumerable<ProductTypeDetail>> GetProductsByProductType(int productTypeId);
        Task<ProductTypeDetail> GetProductTypeDetail(int id);
        Task<IEnumerable<ProductTypeDetail>> GetProductTypeByProductId(int productId);
        Task<bool> ProductTypeDetailExist(int id);
        Task<bool> CheckExist(int ProductId, int productTypeId);
        Task<IActionResult> UpdateProductTypeDetail(int id, ProductTypeDetail productTypeDetail);
        Task<IActionResult> DeleteProductTypeDetail(int id);
    }
}
