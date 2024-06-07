using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICouponRepository
    {
        Task<IActionResult> CreateCoupon(Coupon coupon, string userId);
        Task<IEnumerable<Coupon>> GetCoupons();
        Task<IEnumerable<Coupon>> GetCouponsActive();
        Task<Coupon> GetCoupon(int id);
        Task<bool> CouponExist(Coupon coupon);
        Task<Result<Coupon>> CheckCoupon(CheckCouponModel checkCoupon);
        Task<IActionResult> UpdateCoupon(int id, Coupon coupon, string userId);
        Task<IActionResult> UpdateStatusCoupon(int id, bool status, string userId);
    }
}
