using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface INotificationRepository
    {
        Task<IActionResult> CreateNotification(Notification notification, string userId);
        Task<IEnumerable<Notification>> GetNotificationsForUser(string userId);
        Task<Notification> GetNotification(int id);
        Task<IActionResult> UpdateNotification(int id, Notification notification, string userId);
    }
}
