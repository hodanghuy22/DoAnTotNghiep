using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProductTypeDetailRepository : IProductTypeDetailRepository
    {
        private readonly CSDLContext _context;

        public ProductTypeDetailRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckExist(int ProductId, int productTypeId)
        {
            var pt = await _context.ProductTypeDetails
                .FirstOrDefaultAsync(p => p.ProductId == ProductId && p.ProductTypeId == productTypeId);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateProductTypeDetail(ProductTypeDetail productTypeDetail)
        {
            var check = await CheckExist(productTypeDetail.ProductId, productTypeDetail.ProductTypeId); 
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            await _context.ProductTypeDetails.AddAsync(productTypeDetail);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Created was successfully!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IActionResult> DeleteProductTypeDetail(int id)
        {
            var pt = await GetProductTypeDetail(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this product type detail!"
                });
            }
            _context.ProductTypeDetails.Remove(pt);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Deleted was successfully!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IEnumerable<ProductTypeDetail>> GetProductsByProductType(int productTypeId)
        {
            return await _context.ProductTypeDetails.Include(pt => pt.ProductType)
                .Include(pt => pt.Product)
                .Where(p => p.ProductTypeId == productTypeId)
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductTypeDetail>> GetProductTypeByProductId(int productId)
        {
            return await _context.ProductTypeDetails.Include(p => p.ProductType)
                .Include(p => p.Product)
                .Where(p => p.Product.Id == productId)
                .ToListAsync();
        }

        public async Task<ProductTypeDetail> GetProductTypeDetail(int id)
        {
            return await _context.ProductTypeDetails.Include(pt => pt.ProductType)
                .Include(pt => pt.Product)
                .FirstOrDefaultAsync(pt => pt.Id == id);
        }

        public async Task<IEnumerable<ProductTypeDetail>> GetProductTypeDetails()
        {
            return await _context.ProductTypeDetails.ToListAsync();
        }

        public async Task<bool> ProductTypeDetailExist(int id)
        {
            return await _context.ProductTypeDetails.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateProductTypeDetail(int id, ProductTypeDetail productTypeDetail)
        {
            if(id != productTypeDetail.Id)
            {
                new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckExist(productTypeDetail.ProductId, productTypeDetail.ProductTypeId);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var existingProductTypeDetail = await _context.ProductTypeDetails.FindAsync(id);
                if (existingProductTypeDetail == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(existingProductTypeDetail).CurrentValues.SetValues(productTypeDetail);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return new OkObjectResult(new
            {
                mess = "Updated was successfully!"
            });
        }
    }
}
