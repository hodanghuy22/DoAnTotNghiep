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
        private readonly IEmailService _emailService;

        public InvoiceRepository(CSDLContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<int> CountCancelInvoicesByMonth(int month, int year)
        {
            int count = 0;

            var invoices = await _context.Invoices.ToListAsync();

            foreach (var item in invoices)
            {
                if (item.IssueDate.Month == month && item.IssueDate.Year == year && item.OrderStatusId == 6)
                {
                    count++;
                }
            }

            return count;
        }

        public async Task<int> CountInvoicesByMonth(int month, int year)
        {
            int count = 0;

            var invoices = await _context.Invoices.ToListAsync();

            foreach(var item in invoices)
            {
                if(item.IssueDate.Month == month && item.IssueDate.Year == year)
                {
                    count++;
                }
            }

            return count;
        }

        public async Task<Result<Invoice>> CreateInvoice(Invoice invoice)
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
                var notification = new Notification()
                {
                    Title = "Đơn hàng đã được tạo thành công!",
                    Message = $"Đơn hàng #{invoice.Id} đã được tạo. " +
                    $"Tổng tiền: {invoice.TotalPriceAfterDiscount}",
                    IsAdminAccess = true,
                    CreatedAt = DateTime.Now,
                    UserId = invoice.UserId,
                };
                await _context.Notifications.AddAsync(notification);
                await _context.SaveChangesAsync();
                var user = await _context.Users.FindAsync(invoice.UserId);
                var body = new EmailModel
                {
                    To = user.Email,
                    Subject = "Đơn hàng đặt thành công!",
                    Body = $"Đơn hàng đã được tạo thành công!. Đơn sẽ được giao trong vòng 1 đến 2 ngày. Trân trọng!\n" +
                        $"<p>Mã hóa đơn: {invoice.Id}</p> \n" +
                        $"<p>Tồng tiền: {invoice.TotalPriceAfterDiscount}</p> \n" +
                        $"<p>Ngày đặt hàng: {invoice.IssueDate}</p> \n",
                };
                await _emailService.SendEmail(body);
                return Result<Invoice>.Success(invoice);
            }
            return Result<Invoice>.Failure("Lỗi không tạo được hóa đơn!");
        }

        public async Task<Invoice> GetInvoice(int id)
        {
            return await _context.Invoices
                    .Include(i => i.User)
                    .Include(i => i.Coupon)
                    .Include(i => i.OrderStatus)
                    .Include(i => i.Transaction)
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
                    .OrderByDescending(i => i.Id)
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
                    .OrderByDescending(i => i.Id)
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
                    .OrderByDescending(i => i.Id)
                    .ToListAsync();
        }

        public async Task<int> GetRevenueAfterDiscountByMonth(int month, int year)
        {
            int count = 0;

            var invoices = await _context.Invoices.ToListAsync();

            foreach (var item in invoices)
            {
                if (item.IssueDate.Month == month && item.IssueDate.Year == year)
                {
                    count += item.TotalPriceAfterDiscount;
                }
            }

            return count;
        }

        public async Task<int> GetRevenueByMonth(int month, int year)
        {
            int count = 0;

            var invoices = await _context.Invoices.ToListAsync();

            foreach (var item in invoices)
            {
                if (item.IssueDate.Month == month && item.IssueDate.Year == year)
                {
                    count += item.TotalPrice;
                }
            }

            return count;
        }

        public async Task<IEnumerable<RevenueOfYearModel>> GetRevenueOfYear(int year)
        {
            var invoices = await _context.Invoices
                .Where(i => i.IssueDate.Year == year)
                .ToListAsync();

            var revenueByMonth = Enumerable.Range(1, 12)
                .Select(month => new RevenueOfYearModel
                {
                    Name = "Doanh thu",
                    Month = month.ToString(),
                    Revenue = invoices.Where(i => i.IssueDate.Month == month)
                                  .Sum(i => i.TotalPrice)
                })
                .ToList();

            var revenueByMonth2 = Enumerable.Range(1, 12)
                .Select(month => new RevenueOfYearModel
                {
                    Name = "Doanh thu sau chiết khấu",
                    Month = month.ToString(),
                    Revenue = invoices.Where(i => i.IssueDate.Month == month)
                                  .Sum(i => i.TotalPriceAfterDiscount)
                })
                .ToList();
            var combinedRevenue = revenueByMonth.Concat(revenueByMonth2).ToList();
            return combinedRevenue;
        }

        public async Task<IEnumerable<StatisticInvoiceOfYearModel>> GetTotalInvoiceOfYear(int year)
        {
            var invoices = await _context.Invoices
                .Where(i => i.IssueDate.Year == year)
                .ToListAsync();

            var countByMonth = Enumerable.Range(1, 12)
                .Select(month => new StatisticInvoiceOfYearModel
                {
                    Name = "Tổng hóa đơn",
                    Month = month.ToString(),
                    Total = invoices.Where(i => i.IssueDate.Month == month)
                                  .Count()
                })
                .ToList();

            var countByMonth2 = Enumerable.Range(1, 12)
                .Select(month => new StatisticInvoiceOfYearModel
                {
                    Name = "Hóa đơn hủy",
                    Month = month.ToString(),
                    Total = invoices.Where(i => i.IssueDate.Month == month)
                                  .Count(i => i.OrderStatusId == 6)
                })
                .ToList();
            var combinedRevenue = countByMonth.Concat(countByMonth2).ToList();
            return combinedRevenue;
        }

        public async Task<Result<Invoice>> HookPayment(Transaction transaction)
        {
            var invoice = await _context.Invoices
                .FirstOrDefaultAsync(i => i.Id == transaction.TxnRef);

            if(transaction.TransactionStatus != "00" && transaction.ResponseCode != "00")
            {
                invoice.Transaction = transaction;
                _context.Entry(invoice).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Result<Invoice>.Failure("Lỗi khi thanh toán!");
            }
            if (invoice == null)
            {
                return Result<Invoice>.Failure("Lỗi không tìm được hóa đơn!");
            }
            if (invoice.IsPaid == true)
            {
                return Result<Invoice>.Failure("Lỗi hóa đơn đã được thanh toán trước đó!");
            }
            if (invoice.TotalPriceAfterDiscount > transaction.Amount)
            {
                return Result<Invoice>.Failure("Lỗi số tiền thanh toán hóa đơn không đủ!");
            }
            if (invoice.TotalPriceAfterDiscount > transaction.Amount)
            {
                return Result<Invoice>.Failure("Lỗi số tiền thanh toán hóa đơn không đủ!");
            }
            invoice.OrderStatusId = 2;
            invoice.IsPaid = true;
            invoice.Transaction = transaction;
            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Result<Invoice>.Success(invoice);
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

            var orderStatus = await _context.OrderStatuses.FindAsync(orderStatusId);
            var notification = new Notification()
            {
                Title = $"Hóa đơn #{id} đã được {orderStatus.Title}!",
                Message = $"Trạng thái hóa đơn #{id} đã được cập nhật thành {orderStatus.Title}",
                UserId = pt.UserId,
                IsAdminAccess = orderStatusId != 6 ? false : true,
                CreatedAt = DateTime.Now,
            };
            await _context.Notifications.AddAsync(notification);
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
