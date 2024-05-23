using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public CouponsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCoupons()
        {
            var coupons = await _uow.CouponRepository.GetCoupons();
            return Ok(coupons);
        }
        [HttpGet]
        [Route("GetCouponsActive")]
        public async Task<IActionResult> GetCouponsActive()
        {
            var coupons = await _uow.CouponRepository.GetCouponsActive();
            return Ok(coupons);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCoupon(int id)
        {
            var coupon = await _uow.CouponRepository.GetCoupon(id);
            return Ok(coupon);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCoupon(Coupon coupon)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.CouponRepository.CreateCoupon(coupon, userId);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCoupon(int id, Coupon coupon)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.CouponRepository.UpdateCoupon(id, coupon, userId);
        }
        [HttpPut]
        [Route("UpdateStatusCoupon/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusCoupon(int id, bool status)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.CouponRepository.UpdateStatusCoupon(id, status, userId);
        }
        [HttpPost]
        [Route("CheckCoupon")]
        [Authorize]
        public async Task<IActionResult> CheckCoupon(CheckCouponModel checkCoupon)
        {
            var coupon = await _uow.CouponRepository.CheckCoupon(checkCoupon);
            return Ok(coupon);
        }
    }
}
