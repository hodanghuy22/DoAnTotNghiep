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

        public async Task<IActionResult> CreateRating(Rating rating)
        {
            var kt = await _context.InvoiceDetails
                .AnyAsync(c => c.Invoice.UserId == rating.UserId && c.ProductDetailId == rating.ProductDetailId);
            if (kt == false)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "To evaluate the product, you need to make a purchase."
                });
            }
            var check = await _context.Ratings
                .FirstOrDefaultAsync(r => r.UserId == rating.UserId && r.ProductDetailId == rating.ProductDetailId);
            if (check != null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "You will be evaluated only once."
                });
            }
            var productDetails = await _context.ProductDetails.FindAsync(rating.ProductDetailId);
            productDetails.AverageRating = (int)(productDetails.AverageRating + rating.Star) / 2;
            await _context.Ratings.AddAsync(rating);
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

        public async Task<IEnumerable<Rating>> GetRatings(int productDetailsId)
        {
            return await _context.Ratings.Include(i => i.User)
                .Where(c => c.ProductDetailId == productDetailsId)
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
                var pt = await GetRating(id);
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
