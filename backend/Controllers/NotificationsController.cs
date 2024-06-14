using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public NotificationsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetNotificationsForUser(string userId)
        {
            var notifications = await _uow.NotificationRepository.GetNotificationsForUser(userId);
            return Ok(notifications);
        }
        [HttpGet]
        [Route("GetNotification/{id}")]
        public async Task<IActionResult> GetNotification(int id)
        {
            var notification = await _uow.NotificationRepository.GetNotification(id);
            return Ok(notification);
        }
        [HttpGet]
        [Route("Admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetNotificationsForAdmin(int id)
        {
            var notification = await _uow.NotificationRepository.GetNotificationsForAdmin();
            return Ok(notification);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateNotification(Notification notification)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.NotificationRepository.CreateNotification(notification, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateNotification(int id, Notification notification)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            return await _uow.NotificationRepository.UpdateNotification(id, notification, userId);
        }
    }
}
