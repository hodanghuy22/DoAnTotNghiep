using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly CSDLContext _context;

        public NotificationRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> CreateNotification(Notification notification, string userId)
        {
            await _context.Notifications.AddAsync(notification);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo Notification",
                    Date = DateTime.Now,
                    Object = "Notification",
                    ObjectId = notification.Id.ToString() ?? "",
                };
                await _context.LogModels.AddAsync(logModel);
                await _context.SaveChangesAsync();
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
        public async Task<Notification> GetNotification(int id)
        {
            return await _context.Notifications.FindAsync(id);
        }

        public async Task<IEnumerable<Notification>> GetNotificationsForAdmin()
        {
            return await _context.Notifications
                .Where(n => n.IsAdminAccess == true)
                .OrderByDescending(p => p.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetNotificationsForUser(string userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateNotification(int id, Notification notification, string userId)
        {
            if (id != notification.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            try
            {
                var pt = await GetNotification(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(notification);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa Notification",
                Date = DateTime.Now,
                Object = "Notification",
                ObjectId = id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();

            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }
    }
}
