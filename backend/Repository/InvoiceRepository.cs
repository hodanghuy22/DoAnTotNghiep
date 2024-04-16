using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly CSDLContext _context;

        public InvoiceRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> CreateInvoice(Invoice invoice)
        {
            if (invoice.CouponId != null)
            {
                var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Id == invoice.CouponId);
                coupon.Quantity -= 1;
            }
            await _context.Invoices.AddAsync(invoice);
            var cartsToRemove = await _context.Carts.Where(c => c.UserId == invoice.UserId).ToListAsync();
            _context.Carts.RemoveRange(cartsToRemove);
            foreach(var item in invoice.InvoiceDetails)
            {
                var productDetail = await _context.ProductDetails.FindAsync(item.ProductDetailId);
                productDetail.Quantity -= item.Quantity;
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

        public async Task<Invoice> GetInvoice(int id)
        {
            return await _context.Invoices
                    .Include(i => i.User)
                    .Include(i => i.Coupon)
                    .Include(i => i.OrderStatus)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Product)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Color)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Capacity)
                    .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Invoice>> GetInvoices(string userID)
        {
            return await _context.Invoices.Include(i => i.User)
                    .Include(i => i.Coupon)
                    .Include(i => i.OrderStatus)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Product)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Color)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Capacity)
                    .Where(i => i.UserId == userID)
                    .ToListAsync();
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesByStatus(string userID, int orderStatusId)
        {
            return await _context.Invoices.Include(i => i.User)
                    .Include(i => i.Coupon)
                    .Include(i => i.OrderStatus)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Product)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Color)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Capacity)
                    .Where(i => i.UserId == userID && i.OrderStatusId == orderStatusId)
                    .ToListAsync();
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesForAdmin()
        {
            return await _context.Invoices.Include(i => i.User)
                    .Include(i => i.Coupon)
                    .Include(i => i.OrderStatus)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Product)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Color)
                    .Include(i => i.InvoiceDetails)
                        .ThenInclude(i => i.ProductDetail)
                            .ThenInclude(p => p.Capacity)
              .ToListAsync();
        }

        public async Task<IActionResult> UpdateStatusInvoice(int id, int orderStatusId)
        {
            var pt = await GetInvoice(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this invoice!"
                });
            }

            var status = await _context.OrderStatuses.FindAsync(orderStatusId);

            if (status == null || status.Status == false)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "This order status is not working!"
                });
            }

            pt.OrderStatusId = orderStatusId;
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
    }
}
