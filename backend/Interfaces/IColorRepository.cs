using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IColorRepository
    {
        Task<IActionResult> CreateColor(Color color);
        Task<IEnumerable<Color>> GetColors();
        Task<IEnumerable<Color>> GetColorsByProductId(int id);
        Task<IEnumerable<Color>> GetColorsShow();
        Task<Color> GetColor(int id);
        Task<bool> ColorExist(int id);
        Task<IActionResult> UpdateColor(Color color);
        Task<IActionResult> DeleteColor(int id);
    }
}
