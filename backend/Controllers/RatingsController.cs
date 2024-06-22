using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public RatingsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet("GetRatings/{prodId}")]
        public async Task<IActionResult> GetRatings(int prodId)
        {
            var ratings = await _uow.RatingRepository.GetRatings(prodId);
            return Ok(ratings);
        }
        [HttpGet]
        [Route("GetRating/{id}")]
        public async Task<IActionResult> GetRating(int id)
        {
            var rating = await _uow.RatingRepository.GetRating(id);
            return Ok(rating);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRating(Rating rating)
        {
            var result = await _uow.RatingRepository.CreateRating(rating);
            return Ok(result);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateRating(int id, Rating rating)
        {
            return await _uow.RatingRepository.UpdateRating(id,rating);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteRating(int id)
        {
            return await _uow.RatingRepository.DeleteRating(id);
        }
    }
}
