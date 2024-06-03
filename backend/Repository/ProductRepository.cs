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
        public async Task<IActionResult> CreateProduct(Product product, string userId)
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
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo Product",
                    Date = DateTime.Now,
                    Object = "Product",
                    ObjectId = product.Id.ToString() ?? "",
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

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.Images)
                .Include(p => p.Ratings)
                .Include(p => p.Comments)
                .Include(p => p.ProductDetails.Where(pd => pd.Status == true))
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> GetProductActiveByName(string name)
        {
            return await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.ProductDetails)
                .FirstOrDefaultAsync(p => p.Name == name && p.Status == true);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.Images)
                .Include(p => p.ProductDetails)
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductDisplayModel>> GetProductsActiveByBrand(int brandId)
        {
            return await _context.Products
                   .Include(p => p.Brand)
                   .Include(p => p.Category)
                   .Include(p => p.ProductDetails)
                   .Include(p => p.Images)
                   .Where(p => p.BrandId == brandId && p.Status == true)
                   .Select(p => new ProductDisplayModel
                   {
                       Id = p.Id,
                       Name = p.Name,
                       AverageRating = p.AverageRating,
                       BrandTitle = p.Brand != null ? p.Brand.Title : "",
                       CategoryTitle = p.Category != null ? p.Category.Title : "",
                       ImagePublicId = p.Images.OrderBy(i => i.Id).Select(i => i.ImagePublicId).FirstOrDefault(),
                       ImageUrl = p.Images.OrderBy(i => i.Id).Select(i => i.ImageUrl).FirstOrDefault(),
                       Price = p.ProductDetails.DefaultIfEmpty().Min(pd => pd != null ? pd.RetailPrice : 0),
                       Quantity = p.ProductDetails.DefaultIfEmpty().Sum(pd => pd != null ? pd.Quantity : 0)
                   })
                   .ToListAsync();
        }

        public async Task<IEnumerable<ProductDisplayModel>> GetProductsActiveByCategory(int categoryId)
        {
            return await _context.Products
                   .Include(p => p.Brand)
                   .Include(p => p.Category)
                   .Include(p => p.ProductDetails)
                   .Include(p => p.Images)
                   .Where(p => p.CategoryId == categoryId && p.Status == true)
                   .Select(p => new ProductDisplayModel
                   {
                       Id = p.Id,
                       Name = p.Name,
                       AverageRating = p.AverageRating,
                       BrandTitle = p.Brand != null ? p.Brand.Title : "",
                       CategoryTitle = p.Category != null ? p.Category.Title : "",
                       ImagePublicId = p.Images.OrderBy(i => i.Id).Select(i => i.ImagePublicId).FirstOrDefault(),
                       ImageUrl = p.Images.OrderBy(i => i.Id).Select(i => i.ImageUrl).FirstOrDefault(),
                       Price = p.ProductDetails.DefaultIfEmpty().Min(pd => pd != null ? pd.RetailPrice : 0),
                       Quantity = p.ProductDetails.DefaultIfEmpty().Sum(pd => pd != null ? pd.Quantity : 0)
                   })
                   .ToListAsync();
        }
        public async Task<IEnumerable<Product>> SearchProductByName(string name)
        {
            return await _context.Products
                   .Include(p => p.Brand)
                   .Include(p => p.Category)
                   .Include(p => p.ProductDetails)
                   .Include(p => p.Images)
                   .Where(p => p.Name.ToLower().Contains(name.ToLower()))
                   .ToListAsync();
        }

        public async Task<IEnumerable<ProductDisplayModel>> GetProductsActive()
        {
            return await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.Images)
                .Include(p => p.ProductDetails)
                .Where(p => p.Status == true)
                .Select(p => new ProductDisplayModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    AverageRating = p.AverageRating,
                    BrandTitle = p.Brand != null ? p.Brand.Title : "",
                    CategoryTitle = p.Category != null ? p.Category.Title : "",
                    ImagePublicId = p.Images.OrderBy(i => i.Id).Select(i => i.ImagePublicId).FirstOrDefault(),
                    ImageUrl = p.Images.OrderBy(i => i.Id).Select(i => i.ImageUrl).FirstOrDefault(),
                    Price = p.ProductDetails.DefaultIfEmpty().Min(pd => pd != null ? pd.RetailPrice : 0),
                    Quantity = p.ProductDetails.DefaultIfEmpty().Sum(pd => pd != null ? pd.Quantity : 0)
                })
                .ToListAsync();
        }

        public async Task<bool> ProductExist(Product product)
        {
            var pt = await _context.Products
                .FirstOrDefaultAsync(p => p.Id != product.Id
                && p.Name == product.Name);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> UpdateProduct(int id, Product product, string userId)
        {
            if (id != product.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }

            var check = await ProductExist(product);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetProduct(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }
                pt.Images.Clear();
                foreach (var image in product.Images)
                {
                    var newImg = new Image();
                    newImg.ProductId = product.Id;
                    newImg.ImagePublicId = image.ImagePublicId;
                    newImg.ImageUrl = image.ImageUrl;

                    await _context.Images.AddAsync(newImg);
                }
                _context.Entry(pt).CurrentValues.SetValues(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa Product",
                Date = DateTime.Now,
                Object = "Product",
                ObjectId = product.Id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();
            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }

        public async Task<IActionResult> UpdateStatusProduct(int id, bool status, string userId)
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
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Sửa trạng thái Product",
                    Date = DateTime.Now,
                    Object = "Product",
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

        public async Task<IEnumerable<ProductBestSellerModel>> GetProductsBestSeller(FillterModel fillterModel)
        {
            var topSellingProducts = await _context.InvoiceDetails
             .Where(i => i.Invoice.IssueDate >= fillterModel.StartDate 
                        && i.Invoice.IssueDate <= fillterModel.EndDate)
             .Include(i => i.ProductDetail)
             .ThenInclude(p => p.Product)
             .ThenInclude(b => b.Brand)
             .Include(i => i.ProductDetail)
             .ThenInclude(p => p.Product)
             .ThenInclude(c => c.Category)
             .Select(g => new ProductBestSellerModel
             {
                 ProductId = g.ProductDetail.ProductId,
                 ProductName = g.ProductDetail.Product.Name,
                 ProductAverageRating = g.ProductDetail.Product.AverageRating,
                 BrandTitle = g.ProductDetail.Product.Brand.Title,
                 CategoryTitle = g.ProductDetail.Product.Category.Title,
                 SoldQuantity = g.Quantity
             })
             .GroupBy(g => new { g.ProductId, g.ProductName, g.ProductAverageRating, g.BrandTitle, g.CategoryTitle })
             .Select(g => new ProductBestSellerModel
             {
                 ProductId = g.Key.ProductId,
                 ProductName = g.Key.ProductName,
                 ProductAverageRating = g.Key.ProductAverageRating,
                 BrandTitle = g.Key.BrandTitle,
                 CategoryTitle = g.Key.CategoryTitle,
                 SoldQuantity = g.Sum(x => x.SoldQuantity)
             })
             .OrderByDescending(p => p.SoldQuantity)
             .Take(fillterModel.Top)
             .ToListAsync();
            return topSellingProducts;
        }
    }
}
