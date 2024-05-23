using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IOrderStatusRepository
    {
        Task<IActionResult> CreateOrderStatus(OrderStatus orderStatus, string userId);
        Task<IEnumerable<OrderStatus>> GetOrderStatuses();
        Task<IEnumerable<OrderStatus>> GetOrderStatusesActive();
        Task<OrderStatus> GetOrderStatus(int id);
        Task<bool> CheckOrderStatus(OrderStatus orderStatus);
        Task<IActionResult> UpdateOrderStatus(int id, OrderStatus orderStatus, string userId);
        Task<IActionResult> UpdateStatusOrderStatus(int id, bool status, string userId);
    }
}
