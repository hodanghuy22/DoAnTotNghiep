using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IRatingRepository
    {
        Task<IActionResult> CreateRating(Rating rating);
        Task<IEnumerable<Rating>> GetRatings(int productDetailsId);
        Task<Rating> GetRating(int id);
        Task<bool> RatingExist(int id);
        Task<IActionResult> UpdateRating(int id, Rating rating);
        Task<IActionResult> DeleteRating(int id);
    }
}
