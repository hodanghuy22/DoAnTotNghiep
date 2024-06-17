using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetNotificationsForUser(string userId);
        Task<IEnumerable<Notification>> GetTop5NotificationsForUser(string userId);
        Task<IEnumerable<Notification>> GetNotificationsForAdmin();
        Task<Notification> GetNotification(int id);
    }
}
