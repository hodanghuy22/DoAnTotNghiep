using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly CSDLContext _context;

        public SupplierRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckSupplierExist(Supplier supplier)
        {
            var pt = await _context.Suppliers
                .FirstOrDefaultAsync(p => p.Id != supplier.Id && p.Name == supplier.Name);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateSupplier(Supplier supplier)
        {
            var check = await CheckSupplierExist(supplier);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This supplier was exsist!!!"
                });
            }
            await _context.Suppliers.AddAsync(supplier);
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

        public async Task<Supplier> GetSupplier(int id)
        {
            return await _context.Suppliers.FindAsync(id);
        }

        public async Task<IEnumerable<Supplier>> GetSupplierActive()
        {
            return await _context.Suppliers.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<IActionResult> UpdateStatusSupplier(int id, bool status)
        {
            var pt = await GetSupplier(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this supplier!"
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

        public async Task<IActionResult> UpdateSupplier(int id, Supplier supplier)
        {
            if (id != supplier.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckSupplierExist(supplier);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetSupplier(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(supplier);
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
