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

        public async Task<IActionResult> CreateBrand(Brand brand)
        {
            var check = await _context.Brands.FirstOrDefaultAsync(c => c.Title == brand.Title);
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
                return new OkResult();
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IActionResult> DeleteBrand(int id)
        {
            var pt = await GetBrand(id);

            if(pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this brand!"
                });
            }

            pt.Status = false;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkResult();
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

        public async Task<IActionResult> UpdateBrand(Brand brand)
        {
            _context.Entry(brand).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await BrandExist(brand.Id))
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found"
                    });
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }
    }
}
