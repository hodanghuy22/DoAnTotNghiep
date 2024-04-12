using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ColorRepository : IColorRepository
    {
        private readonly CSDLContext _context;

        public ColorRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckColorNameExist(string colorName)
        {
            var pt = await _context.Colors
                .FirstOrDefaultAsync(p => p.ColorName == colorName); 
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> ColorExist(int id)
        {
            var color = await _context.Colors.FindAsync(id);
            if (color == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateColor(Color color)
        {
            var check = await _context.Colors.FirstOrDefaultAsync(c => c.ColorName == color.ColorName);
            if (check != null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This color was exsist!!!"
                });
            }
            await _context.Colors.AddAsync(color);
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

        public async Task<IActionResult> UpdateStatusColor(int id, bool status)
        {
            var color = await GetColor(id);
            if(color == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this color!"
                });
            }
            color.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Successfully updated!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<Color> GetColor(int id)
        {
            return await _context.Colors.FindAsync(id);
        }

        public async Task<IEnumerable<Color>> GetColors()
        {
            return await _context.Colors.ToListAsync();
        }

        public async Task<IEnumerable<Color>> GetColorsByProductId(int id)
        {
            return await _context.ProductDetails
                            .Where(p => p.ProductId == id && p.Color.Status == true)
                            .Select(p => p.Color)
                            .Distinct()
                            .ToListAsync();
        }

        public async Task<IEnumerable<Color>> GetColorsShow()
        {
            return await _context.Colors.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateColor(int id, Color color)
        {
            if (id != color.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckColorNameExist(color.ColorName);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetColor(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(color);
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
