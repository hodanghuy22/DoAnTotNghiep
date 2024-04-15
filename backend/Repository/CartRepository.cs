using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly CSDLContext _context;

        public CartRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> CheckCartExist(string userId, int productDetailId)
        {
            return await _context.Carts
                .AnyAsync(c => c.UserId == userId && c.ProductDetailId == productDetailId);
        }

        public async Task<IActionResult> CreateCart(Cart cart)
        {
            var productDetail = await _context.ProductDetails
                    .FindAsync(cart.ProductDetailId);
            if(productDetail.Quantity <= 0)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "The product is currently out of stock!!!"
                });
            }
            var check = await CheckCartExist(cart.UserId, cart.ProductDetailId);
            if (check == true)
            {
                var cartDetail = await _context.Carts
                    .FirstOrDefaultAsync(c => c.UserId == cart.UserId && c.ProductDetailId == cart.ProductDetailId);
                cartDetail.Quantity += 1;
            }
            else
            {
                await _context.Carts.AddAsync(cart);
            }
            productDetail.Quantity -= 1;
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

        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await GetCart(id);
            if (cart == null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var productDetail = await _context.ProductDetails.FindAsync(cart.ProductDetailId);
            productDetail.Quantity += cart.Quantity;
            _context.Carts.Remove(cart);
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

        public async Task<Cart> GetCart(int id)
        {
            return await _context.Carts.FindAsync(id);
        }

        public async Task<IEnumerable<Cart>> GetCarts(string userId)
        {
            return await _context.Carts
                .Include(c => c.ProductDetail)
                .ThenInclude(p => p.Color)
                .Include(c => c.ProductDetail)
                .ThenInclude(p => p.Capacity)
                .Include(c => c.ProductDetail)
                .ThenInclude(p => p.Images)
                .Include(c => c.ProductDetail)
                .ThenInclude(p => p.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            try
            {
                var pt = await GetCart(id);
                var productDetail = await _context.ProductDetails.FindAsync(cart.ProductDetailId);
                if (pt == null || productDetail == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }
                if (cart.Quantity > productDetail.Quantity)
                {
                    return new BadRequestObjectResult(new
                    {
                        mess = "The quantity exceeds the allowable limit!"
                    });
                }
                if (pt.Quantity < cart.Quantity)
                {
                    productDetail.Quantity -= cart.Quantity - pt.Quantity;
                }
                else
                {
                    productDetail.Quantity += pt.Quantity - cart.Quantity;
                }
                _context.Entry(pt).CurrentValues.SetValues(cart);
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
