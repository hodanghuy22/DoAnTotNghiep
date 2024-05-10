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
        public async Task<bool> CheckProductDetailExist(ProductDetail productDetail)
        {
            var pt = await _context.ProductDetails
                .FirstOrDefaultAsync(b => b.Id != productDetail.Id &&
                                    b.ProductId == productDetail.ProductId 
                                    && b.ColorId == productDetail.ColorId
                                    && b.CapacityId == productDetail.CapacityId);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateProductDetail(ProductDetail productDetail)
        {
            var check = await CheckProductDetailExist(productDetail);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This product detail was exsist!!!"
                });
            }
            try
            {
                await _context.ProductDetails.AddAsync(productDetail);
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
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Color)
                .Include(p => p.Capacity)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.ProductId == productId
                                    && p.ColorId == colorId
                                    && p.CapacityId == capacityId);
        }

        public async Task<ProductDetail> GetProductDetail(int id)
        {
            return await _context.ProductDetails
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);   
        }

        public async Task<IEnumerable<ProductDetail>> GetProductDetails()
        {
            return await _context.ProductDetails
                .Include(p => p.Images)
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Color)
                .Include(p => p.Capacity).ToListAsync();
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

        public async Task<IActionResult> UpdateProductDetail(int id, ProductDetail productDetail)
        {
            if (id != productDetail.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckProductDetailExist(productDetail);
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
                pt.Images.Clear();
                foreach(var image in productDetail.Images)
                {
                    var newImg = new Image();
                    newImg.ProductDetailId = productDetail.Id;
                    newImg.ImagePublicId = image.ImagePublicId;
                    newImg.ImageUrl = image.ImageUrl;

                    await _context.Images.AddAsync(newImg);
                }
                _context.Entry(pt).CurrentValues.SetValues(productDetail);
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
