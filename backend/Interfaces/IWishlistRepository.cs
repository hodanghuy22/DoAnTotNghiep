using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IWishlistRepository
    {
        Task<IActionResult> CreateWishList(WishList wishList);
        Task<IEnumerable<WishList>> GetWishLists();
        Task<IEnumerable<WishList>> GetWishList(string userId);
        Task<bool> CheckWishListExist(string userId, int productId);
        Task<IActionResult> DeleteWishList(int id);
    }
}
