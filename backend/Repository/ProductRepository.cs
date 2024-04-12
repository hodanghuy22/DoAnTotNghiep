using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly CSDLContext _context;

        public ProductRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> CreateProduct(Product product)
        {
            var check = await _context.Products
                .FirstOrDefaultAsync(c => c.Name == product.Name);
            if (check != null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This product was exsist!!!"
                });
            }
            await _context.Products.AddAsync(product);
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

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.Include(p => p.Brand)
                .Include(p => p.ProductDetails)
                .Include(p => p.ProductDetails)
                    .ThenInclude(p => p.Capacity)
                .Include(p => p.ProductDetails)
                    .ThenInclude(p => p.Color)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> GetProductByName(string name)
        {
            return await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductDetails)
                .FirstOrDefaultAsync(p => p.Name == name);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.Include(p => p.Brand)
                .Include(p => p.ProductDetails)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByBrand(int brandId)
        {
            return await _context.Products
                   .Include(p => p.Brand)
                   .Include(p => p.ProductDetails)
                   .Where(p => p.BrandId == brandId)
                   .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsShow()
        {
            return await _context.Products.Where(p => p.Status == true)
                .ToListAsync(); ;
        }

        public async Task<bool> ProductExist(int id)
        {
            return await _context.Products.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if(id != product.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            _context.Entry(product).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await ProductExist(product.Id))
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }
                else
                {
                    throw;
                }
            }
            return new OkObjectResult(new
            {
                mess = "Updated was successfully!"
            });
        }

        public async Task<IActionResult> UpdateStatusProduct(int id, bool status)
        {
            var pt = await GetProduct(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this product!"
                });
            }

            pt.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Updated was successfully!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }
    }
}
