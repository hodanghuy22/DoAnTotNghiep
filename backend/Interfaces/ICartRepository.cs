using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICartRepository
    {
        Task<IActionResult> CreateCart(Cart cart);
        Task<IEnumerable<Cart>> GetCarts(string userId);
        Task<Cart> GetCart(int id);
        Task<bool> CheckCartExist(string userId, int productDetailId);
        Task<IActionResult> UpdateCart(int id, Cart cart);
        Task<IActionResult> DeleteCart(int id);
    }
}
