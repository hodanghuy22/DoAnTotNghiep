using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WishlistsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public WishlistsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetWishlists()
        {
            var wishlists = await _uow.WishlistRepository.GetWishLists();
            return Ok(wishlists);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWishlist(string id)
        {
            var wishlist = await _uow.WishlistRepository.GetWishList(id);
            return Ok(wishlist);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateWishlist(WishList wishList)
        {
            return await _uow.WishlistRepository.CreateWishList(wishList);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            return await _uow.WishlistRepository.DeleteWishList(id);
        }
    }
}
