using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IColorRepository
    {
        Task<IActionResult> CreateColor(Color color, string userId);
        Task<IEnumerable<Color>> GetColors();
        Task<IEnumerable<Color>> GetColorsByProductId(int id);
        Task<IEnumerable<Color>> GetColorsShow();
        Task<Color> GetColor(int id);
        Task<bool> ColorExist(int id);
        Task<bool> CheckColorNameExist(Color color);
        Task<IActionResult> UpdateColor(int id, Color color, string userId);
        Task<IActionResult> UpdateStatusColor(int id, bool status, string userId);
    }
}
