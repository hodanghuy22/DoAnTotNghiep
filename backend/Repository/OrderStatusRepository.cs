using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class OrderStatusRepository : IOrderStatusRepository
    {
        private readonly CSDLContext _context;

        public OrderStatusRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckOrderStatus(OrderStatus orderStatus)
        {
            var check = await _context.OrderStatuses
                .FirstOrDefaultAsync(o => o.Id != orderStatus.Id && o.Title == orderStatus.Title);
            if(check == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateOrderStatus(OrderStatus orderStatus)
        {
            var check = await CheckOrderStatus(orderStatus);
            if(check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This order status was exsist!!!"
                });
            }
            await _context.OrderStatuses.AddAsync(orderStatus);
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

        public async Task<OrderStatus> GetOrderStatus(int id)
        {
            return await _context.OrderStatuses.FindAsync(id);
        }

        public async Task<IEnumerable<OrderStatus>> GetOrderStatuses()
        {
            return await _context.OrderStatuses.ToListAsync();
        }

        public async Task<IEnumerable<OrderStatus>> GetOrderStatusesActive()
        {
            return await _context.OrderStatuses
                .Where(p => p.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateOrderStatus(int id, OrderStatus orderStatus)
        {
            if (id != orderStatus.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckOrderStatus(orderStatus);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetOrderStatus(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(orderStatus);
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

        public async Task<IActionResult> UpdateStatusOrderStatus(int id, bool status)
        {
            var pt = await GetOrderStatus(id);
            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this order status!"
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
    }
}
