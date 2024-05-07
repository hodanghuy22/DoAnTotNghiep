using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ImportInvoiceRepository : IImportInvoiceRepository
    {
        private readonly CSDLContext _context;

        public ImportInvoiceRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> CreateImportInvoice(ImportInvoice importInvoice)
        {
            
            await _context.ImportInvoices.AddAsync(importInvoice);
            foreach (var item in importInvoice.ImportInvoiceDetails)
            {
                var productDetail = await _context.ProductDetails.FindAsync(item.ProductDetailId);
                productDetail.Quantity += item.Quantity;
                productDetail.CostPrice = item.CostPrice;
            }
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

        public async Task<ImportInvoice> GetImportInvoice(int id)
        {
            return await _context.ImportInvoices
                    .Include(i => i.Supplier)
                    .Include(i => i.ImportInvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Product)
                    .Include(i => i.ImportInvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Color)
                    .Include(i => i.ImportInvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Capacity)
                    .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<ImportInvoice>> GetImportInvoices()
        {
            return await _context.ImportInvoices
                .Include(i => i.Supplier)
                    .Include(i => i.ImportInvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Product)
                    .Include(i => i.ImportInvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Color)
                    .Include(i => i.ImportInvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Capacity)
                    .ToListAsync();
        }

        public Task<IActionResult> UpdateImportInvoice(int id, ImportInvoice importInvoice)
        {
            throw new NotImplementedException();
        }

        
    }
}
