using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CouponRepository : ICouponRepository
    {
        private readonly CSDLContext _context;

        public CouponRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<Coupon> CheckCoupon(CheckCouponModel checkCoupon)
        {
            var coupon = await _context.Coupons
                .FirstOrDefaultAsync(c => c.Code == checkCoupon.Code);
            if (coupon == null ||
                coupon.Quantity <= 0 ||
                coupon.EndDate < checkCoupon.Date ||
                coupon.RequiredTotal > checkCoupon.Money)
            {
                return null;
            }
            return coupon;
        }

        public async Task<bool> CouponExist(Coupon coupon)
        {
            var check1 = await _context.Coupons
                .FirstOrDefaultAsync(c => c.Id != coupon.Id && (c.Code == coupon.Code || c.Title == coupon.Title));
            if(check1 != null)
            {
                return true;
            }
            return false;
        }

        public async Task<IActionResult> CreateCoupon(Coupon coupon, string userId)
        {
            var check = await CouponExist(coupon);
            if(check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This coupon was exsist!!!"
                });
            }
            await _context.Coupons.AddAsync(coupon);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo Coupon",
                    Date = DateTime.Now,
                    Object = "Coupon",
                    ObjectId = coupon.Id.ToString() ?? "",
                };
                await _context.LogModels.AddAsync(logModel);
                await _context.SaveChangesAsync();
                return new OkObjectResult(new
                {
                    mess = "Successfully created!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IActionResult> UpdateStatusCoupon(int id, bool status, string userId)
        {
            var coupon = await GetCoupon(id);
            if (coupon == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this coupon!"
                });
            }
            coupon.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Sửa trạng thái Coupon",
                    Date = DateTime.Now,
                    Object = "Coupon",
                    ObjectId = coupon.Id.ToString() ?? "",
                };
                await _context.LogModels.AddAsync(logModel);
                await _context.SaveChangesAsync();
                return new OkObjectResult(new
                {
                    mess = "Successfully updated!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<Coupon> GetCoupon(int id)
        {
            return await _context.Coupons.FindAsync(id);
        }

        public async Task<IEnumerable<Coupon>> GetCoupons()
        {
            return await _context.Coupons
                .OrderByDescending(c => c.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Coupon>> GetCouponsActive()
        {
            return await _context.Coupons
                .OrderByDescending(c => c.Id)
                .Where(c => c.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateCoupon(int id, Coupon coupon, string userId)
        {
            if (id != coupon.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CouponExist(coupon);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This coupon was exsist!!!"
                });
            }

            try
            {
                var pt = await GetCoupon(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(coupon);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa Coupon",
                Date = DateTime.Now,
                Object = "Coupon",
                ObjectId = coupon.Id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();
            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }
    }
}
