using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProductDetailRepository : IProductDetailRepository
    {
        private readonly CSDLContext _context;

        public ProductDetailRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> CheckProductDetailExist(int productId, int colorId, int capacityId)
        {
            var pt = await _context.ProductDetails
                .FirstOrDefaultAsync(b => b.ProductId == productId 
                                    && b.ColorId == colorId 
                                    && b.CapacityId == capacityId);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateProductDetail(ProductDetail product)
        {
            var check = await CheckProductDetailExist(product.ProductId, product.ColorId, product.CapacityId);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This product detail was exsist!!!"
                });
            }
            try
            {
                await _context.ProductDetails.AddAsync(product);
            }
            catch(DbUpdateException ex)
            {
                var errorDetails = ex.InnerException.ToString();
                Console.WriteLine(errorDetails);
            }
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Successfully created!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<ProductDetail> GetAProductDetailForUser(int productId, int colorId, int capacityId)
        {
            return await _context.ProductDetails
                .FirstOrDefaultAsync(p => p.ProductId == productId
                                    && p.ColorId == colorId
                                    && p.CapacityId == capacityId);
        }

        public async Task<ProductDetail> GetProductDetail(int id)
        {
            return await _context.ProductDetails.FindAsync(id);   
        }

        public async Task<IEnumerable<ProductDetail>> GetProductDetails()
        {
            return await _context.ProductDetails.ToListAsync();
        }

        public async Task<bool> ProductDetailExist(int id)
        {
            var pt = await _context.ProductDetails.FindAsync(id);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> UpdateProductDetail(int id, ProductDetail product)
        {
            if (id != product.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckProductDetailExist(product.ProductId, product.ColorId, product.CapacityId);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetProductDetail(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }

        public async Task<IActionResult> UpdateStatusProductDetail(int id, bool status)
        {
            var pt = await GetProductDetail(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this product detail!"
                });
            }

            pt.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Successfully updated!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }
    }
}
