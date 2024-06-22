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

        public async Task<IActionResult> CreateProductDetail(ProductDetail productDetail, string userId)
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
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo ProductDetail",
                    Date = DateTime.Now,
                    Object = "ProductDetail",
                    ObjectId = productDetail.Id.ToString() ?? "",
                };
                await _context.LogModels.AddAsync(logModel);
                await _context.SaveChangesAsync();
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
            if(capacityId == 0)
            {
                return await _context.ProductDetails
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Color)
                .Include(p => p.Capacity)
                .FirstOrDefaultAsync(p => p.ProductId == productId
                                    && p.ColorId == colorId
                                    && p.Status == true);
            }
            return await _context.ProductDetails
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Color)
                .Include(p => p.Capacity)
                .FirstOrDefaultAsync(p => p.ProductId == productId
                                    && p.ColorId == colorId
                                    && p.CapacityId == capacityId && p.Status == true);
        }

        public async Task<ProductDetail> GetProductDetail(int id)
        {
            return await _context.ProductDetails
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);   
        }

        public async Task<IEnumerable<ProductDetail>> GetProductDetails()
        {
            return await _context.ProductDetails
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Color)
                .Include(p => p.Capacity).ToListAsync();
        }

        public async Task<IEnumerable<ProductDetail>> GetProductDetailsActive()
        {
            return await _context.ProductDetails
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Color)
                .Include(p => p.Capacity)
                .Where(p => p.Status == true)
                .ToListAsync();
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

        public async Task<IActionResult> UpdateProductDetail(int id, ProductDetail productDetail, string userId)
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
                _context.Entry(pt).CurrentValues.SetValues(productDetail);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa ProductDetail",
                Date = DateTime.Now,
                Object = "ProductDetail",
                ObjectId = productDetail.Id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();
            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }

        public async Task<IActionResult> UpdateStatusProductDetail(int id, bool status, string userId)
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
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Sửa trạng thái ProductDetail",
                    Date = DateTime.Now,
                    Object = "ProductDetail",
                    ObjectId = pt.Id.ToString() ?? "",
                };
                await _context.LogModels.AddAsync(logModel);
                await _context.SaveChangesAsync();
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
