using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnPaysController : ControllerBase
    {
        private readonly VnPayService _vnPayService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VnPaysController(VnPayService vnPayService, IHttpContextAccessor httpContextAccessor)
        {
            _vnPayService = vnPayService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        [Route("create-payment")]
        public async Task<IActionResult> CreatePayment(int amount)
        {
            Utils utils = new Utils(_httpContextAccessor);
            var url = _vnPayService.CreatePayment(amount, utils.GetIpAddress());
            return Ok(url);
        }

        [HttpGet]
        [Route("ReturnPage")]
        public async Task<IActionResult> ReturnPage()
        {
            Console.WriteLine("AAAAA");
            return Ok();
        }
    }
}
