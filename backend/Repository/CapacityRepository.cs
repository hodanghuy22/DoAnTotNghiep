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

        public async Task<IActionResult> UpdateStatusCapacity(int id, bool status)
        {
            var pt = await GetCapacity(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this capacity!"
                });
            }

            pt.Status = status;
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

        public async Task<Capacity> GetCapacity(int id)
        {
            return await _context.Capacitys.FindAsync(id);
        }

        public async Task<IEnumerable<Capacity>> GetCapacities()
        {
            return await _context.Capacitys.ToListAsync();
        }

        public async Task<IActionResult> UpdateCapacity(int id, Capacity capacity)
        {
            if(id != capacity.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckCapacityTotalExist(capacity);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetCapacity(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(capacity);
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

        public async Task<IEnumerable<Capacity>> GetCapacitiesShow()
        {
            return await _context.Capacitys.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<bool> CheckCapacityTotalExist(Capacity capacity)
        {
            var pt = await _context.Capacitys
                .FirstOrDefaultAsync(p => p.Id != capacity.Id && p.TotalCapacity == capacity.TotalCapacity);
            if(pt == null)
            {
                return false;
            }
            return true;
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
