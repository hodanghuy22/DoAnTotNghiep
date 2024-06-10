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
        public async Task<IActionResult> CreatePayment(CreatePaymentModel createPayment)
        {
            var orderId = await _paypalService.CreatePayment(createPayment.Amount);
            return Ok(orderId);
        }

        [HttpPost("capture-order")]
        public async Task<IActionResult> CaptureOrder(CaptureOrderModel captureOrder)
        {
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
        [HttpGet]
        [Route("GetOrderDetails/{orderId}")]
        public async Task<IActionResult> GetOrderDetails(string orderId)
        {
            var order = await _paypalService.GetOrderDetails(orderId);
            return Ok(order);
        }
    }
}
