using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ISlideshowRepository
    {
        Task<IActionResult> CreateSlideshow(Slideshow slideshow, string userId);
        Task<IEnumerable<Slideshow>> GetSlideshows();
        Task<Slideshow> GetSlideshow(int id);
        Task<IEnumerable<Slideshow>> GetSlideshowsForPresent();
        Task<bool> SlideshowExist(int id);
        Task<IActionResult> UpdateSlideshow(int id, Slideshow slideshow, string userId);
        Task<IActionResult> DeleteSlideshow(int id, string userId);
        Task<IActionResult> UpdateStatusSlideshow(int id, bool status, string userId);
    }
}
