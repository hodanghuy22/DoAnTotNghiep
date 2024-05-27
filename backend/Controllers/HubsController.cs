using backend.Hubs;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HubsController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public HubsController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> SendMess(string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
            return Ok("Done!");
        }
    }
}
