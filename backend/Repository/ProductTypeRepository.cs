using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        private readonly CSDLContext _context;

        public ProductTypeRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> CreateProductType(ProductType productType)
        {
            var pt = await _context.ProductTypes
                    .FirstOrDefaultAsync(p => p.Title == productType.Title);
            if(pt != null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This product type was exsist!!!"
                });
            }
            await _context.ProductTypes.AddAsync(productType);
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

        public async Task<IActionResult> UpdateStatusProductType(int id, bool status)
        {
            var pt = await GetProductType(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this product type!"
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

        public async Task<ProductType> GetProductType(int id)
        {
            return await _context.ProductTypes.FindAsync(id);
        }

        public async Task<IEnumerable<ProductType>> GetProductTypesAdmin()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        public async Task<IEnumerable<ProductType>> GetProductTypes()
        {
            return await _context.ProductTypes.Where(p => p.Status == true).ToListAsync();
        }

        public async Task<bool> ProductTypeExist(int id)
        {
            return await _context.Products.AnyAsync(p => p.Id == id);
        }

        public async Task<IActionResult> UpdateProductType(int id, ProductType productType)
        {
            if (id != productType.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckProductTypeTitleExist(productType);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetProductType(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(productType);
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

        public async Task<bool> CheckProductTypeTitleExist(ProductType productType)
        {
            var pt = await _context.ProductTypes
                .FirstOrDefaultAsync(b => b.Id != productType.Id && b.Title == productType.Title);
            if (pt == null)
            {
                return false;
            }
            return true;
        }
    }
}
