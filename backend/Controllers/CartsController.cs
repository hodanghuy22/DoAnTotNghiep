using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public CartsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetCarts(string userId)
        {
            var carts = await _uow.CartRepository.GetCarts(userId);
            return Ok(carts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCart(Cart cart)
        {
            return await _uow.CartRepository.CreateCart(cart);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCart(int id, Cart cart)
        {
            return await _uow.CartRepository.UpdateCart(id, cart);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            return await _uow.CartRepository.DeleteCart(id);
        }
    }
}
