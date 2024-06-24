using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class RatingRepository : IRatingRepository
    {
        private readonly CSDLContext _context;

        public RatingRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<Result<Rating>> CreateRating(Rating rating)
        {
            var kt = await _context.InvoiceDetails
                .AnyAsync(c => c.Invoice.UserId == rating.UserId 
                && c.ProductDetail.ProductId == rating.ProductId);
            if (kt == false)
            {
                return Result<Rating>.Failure("Cần mua hàng để đánh giá!");
            }
            var check = await _context.Ratings
                .FirstOrDefaultAsync(r => r.UserId == rating.UserId 
                && r.ProductId == rating.ProductId);
            if (check != null)
            {
                return Result<Rating>.Failure("Chỉ được đánh giá 1 lần!");
            }
            var product = await _context.Products.FindAsync(rating.ProductId);
            if(product.AverageRating == 0)
            {
                product.AverageRating = rating.Star;
            }
            else
            {
                product.AverageRating = (int)(product.AverageRating + rating.Star) / 2; 
            }
            await _context.Ratings.AddAsync(rating);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Result<Rating>.Success(rating);

            }
            return Result<Rating>.Failure("Lỗi! Không thể đánh giá!");
        }

        public async Task<IActionResult> DeleteRating(int id)
        {
            var pt = await GetRating(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this rating!"
                });
            }
            _context.Ratings.Remove(pt);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Successfully deleted!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<Rating> GetRating(int id)
        {
            return await _context.Ratings.Include(i => i.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Rating>> GetRatings(int productId)
        {
            return await _context.Ratings.Include(i => i.User)
                .Where(c => c.ProductId == productId)
                .ToListAsync();
        }

        public async Task<bool> RatingExist(int id)
        {
            return await _context.Ratings.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateRating(int id, Rating rating)
        {
            if (id != rating.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            try
            {
                var soluong = await _context.Ratings
                    .CountAsync(r => r.ProductId == rating.ProductId);
                var pt = await GetRating(id);
                var product = await _context.Products.FindAsync(rating.ProductId);
                if (soluong == 1)
                {
                    product.AverageRating = rating.Star;
                }
                else
                {
                    product.AverageRating = (product.AverageRating * 2 - pt.Star + rating.Star) + 2;
                }
                _context.Entry(pt).CurrentValues.SetValues(rating);
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
    }
}
