using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly CSDLContext _context;

        public BrandRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> BrandExist(int id)
        {
            return await _context.Brands.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> CreateBrand(Brand brand, string userId)
        {
            var check = await _context.Brands
                .FirstOrDefaultAsync(c => c.Title == brand.Title);
            if (check != null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This brand was exsist!!!"
                });
            }
            await _context.Brands.AddAsync(brand);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo Brand",
                    Date = DateTime.Now,
                    Object = "Brand",
                    ObjectId = brand.Id.ToString()??"",
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

        public async Task<IActionResult> UpdateStatusBrand(int id, bool status, string userId)
        {
            var pt = await GetBrand(id);

            if(pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this brand!"
                });
            }

            pt.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Sửa trạng thái Brand",
                    Date = DateTime.Now,
                    Object = "Brand",
                    ObjectId = id.ToString() ?? "",
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

        public async Task<Brand> GetBrand(int id)
        {
            return await _context.Brands.FindAsync(id);
        }

        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<IEnumerable<Brand>> GetBrandsShow()
        {
            return await _context.Brands.Where(b => b.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateBrand(int id, Brand brand, string userId)
        {
            if(id != brand.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckBrandTitleExist(brand);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetBrand(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(brand);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa Brand",
                Date = DateTime.Now,
                Object = "Brand",
                ObjectId = id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();

            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }

        public async Task<bool> CheckBrandTitleExist(Brand brand)
        {
            var pt = await _context.Brands
                .FirstOrDefaultAsync(b => b.Id != brand.Id && b.Title == brand.Title);
            if(pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<Brand>> GetBrandsByCategory(int categoryId)
        {
            return await _context.Brands
                    .Include(b => b.Products)
                    .Where(b => b.Products.Any(p => p.CategoryId == categoryId))
                    .ToListAsync();
        }
    }
}
