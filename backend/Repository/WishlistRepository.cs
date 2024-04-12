using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly CSDLContext _context;

        public WishlistRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckWishListExist(string userId, int productId)
        {
            var pt = await _context.WishLists
                .FirstOrDefaultAsync(p => p.UserId == userId && p.ProductId == productId);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateWishList(WishList wishList)
        {
            var check = await CheckWishListExist(wishList.UserId, wishList.ProductId);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It already exists!!!"
                });
            }
            await _context.WishLists.AddAsync(wishList);
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

        public async Task<IActionResult> DeleteWishList(int id)
        {
            var pt = await _context.WishLists.FindAsync(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this!"
                });
            }
            _context.WishLists.Remove(pt);
            var result =  await _context.SaveChangesAsync();
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

        public async Task<IEnumerable<WishList>> GetWishList(string userId)
        {
            return await _context.WishLists
                            .Include(wl => wl.Product)
                            .Where(wl => wl.UserId == userId)
                            .ToListAsync();
        }

        public async Task<IEnumerable<WishList>> GetWishLists()
        {
            return await _context.WishLists.Include(wl => wl.User)
                .Include(wl => wl.Product).ToListAsync();
        }
    }
}
