using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class OrderStatusController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public OrderStatusController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrderStatus(OrderStatus orderStatus)
        {
            return await _uow.OrderStatusRepository.CreateOrderStatus(orderStatus);
        }
        [HttpGet]
        public async Task<IActionResult> GetOrderStatuses()
        {
            var orderStatuses = await _uow.OrderStatusRepository.GetOrderStatuses();
            return Ok(orderStatuses);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOrderStatus(int id)
        {
            var orderStatus = await _uow.OrderStatusRepository.GetOrderStatus(id);
            return Ok(orderStatus);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateOrderStatus(int id, OrderStatus orderStatus)
        {
            return await _uow.OrderStatusRepository.UpdateOrderStatus(id, orderStatus);
        }
        [HttpPut]
        [Route("UpdateStatusOrderStatus/{id}/{status}")]
        public async Task<IActionResult> UpdateStatusOrderStatus(int id, bool status)
        {
            return await _uow.OrderStatusRepository.UpdateStatusOrderStatus(id, status);
        }
    }
}
