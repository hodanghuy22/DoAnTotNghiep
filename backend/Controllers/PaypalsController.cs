using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaypalsController : ControllerBase
    {
        private readonly PaypalService _paypalService;

        public PaypalsController(PaypalService paypalService)
        {
            _paypalService = paypalService;
        }

        [HttpPost("create-payment")]
        public async Task<IActionResult> CreatePayment()
        {
            var orderId = await _paypalService.CreatePayment(50000);
            return Ok(orderId);
        }

        [HttpPost("capture-order")]
        public async Task<IActionResult> CaptureOrder(CaptureOrderModel captureOrder)
        {
            Console.WriteLine($">>> check orderId: {captureOrder.OrderId}");
            var success = await _paypalService.CaptureOrder(captureOrder);
            if (success)
            {
                return Ok("Thanh toán thành công");
            }
            else
            {
                return BadRequest("Thanh toán thất bại");
            }
        }
    }
}
