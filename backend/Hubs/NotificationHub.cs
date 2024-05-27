using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace backend.Hubs
{
    public class NotificationHub : Hub
    {
        
        public async Task SendNotification(string message)
        {
            // Send the notification to the specific user
            await Clients.All.SendAsync("ReceiveNotification", message);
        }
    }
}
