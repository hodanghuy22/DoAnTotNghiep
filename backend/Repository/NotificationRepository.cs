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

        public async Task<Notification> GetNotification(int id)
        {
            return await _context.Notifications
                .Include(n => n.Invoice)
                .ThenInclude(i => i.InvoiceDetails)
                .ThenInclude(i => i.ProductDetail)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<IEnumerable<Notification>> GetNotificationsForAdmin()
        {
            return await _context.Notifications
                .Include(n => n.Invoice)
                .ThenInclude(i => i.InvoiceDetails)
                .ThenInclude(i => i.ProductDetail)
                .ThenInclude(p => p.Product)
                .Where(n => n.IsAdminAccess == true)
                .OrderByDescending(p => p.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetNotificationsForUser(string userId)
        {
            return await _context.Notifications
                .Include(n => n.Invoice)
                .ThenInclude(i => i.InvoiceDetails)
                .ThenInclude(i => i.ProductDetail)
                .ThenInclude(p => p.Product)
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetTop5NotificationsForUser(string userId)
        {
            return await _context.Notifications
                .Include(n => n.Invoice)
                .ThenInclude(i => i.InvoiceDetails)
                .ThenInclude(i => i.ProductDetail)
                .ThenInclude(p => p.Product)
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Id)
                .Take(5)
                .ToListAsync();
        }
    }
}
