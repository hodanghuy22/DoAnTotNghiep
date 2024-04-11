using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CapacityRepository : ICapacityRepository
    {
        private readonly CSDLContext _context;

        public CapacityRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> CapacityExist(int id)
        {
            return await _context.Capacitys.AnyAsync(c => c.Id == id);
        }

        public async Task<IActionResult> CreateCapacity(Capacity capacity)
        {
            var check = await _context.Capacitys.FirstOrDefaultAsync(c => c.TotalCapacity == capacity.TotalCapacity);
            if (check != null)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This capacity was exsist!!!"
                });
            }
            await _context.Capacitys.AddAsync(capacity);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkResult();
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IActionResult> DeleteCapacity(int id)
        {
            var pt = await GetCapacity(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this capacity!"
                });
            }

            pt.Status = false;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkResult();
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<Capacity> GetCapacity(int id)
        {
            return await _context.Capacitys.FindAsync(id);
        }

        public async Task<IEnumerable<Capacity>> GetCapacities()
        {
            return await _context.Capacitys.ToListAsync();
        }

        public async Task<IActionResult> UpdateCapacity(Capacity capacity)
        {
            _context.Entry(capacity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await CapacityExist(capacity.Id))
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }

        public async Task<IEnumerable<Capacity>> GetCapacitiesShow()
        {
            return await _context.Capacitys.Where(c => c.Status == true).ToListAsync();
        }

        //public async Task<IEnumerable<Capacity>> GetCapacitiesByPhoneId(int id)
        //{
        //    return await _context.Products
        //                    .Where(p => p.PhoneId == id && p.Capacity.Status == true)
        //                    .Select(p => p.Capacity)
        //                    .Distinct()
        //                    .ToListAsync();
        //}
    }
}
