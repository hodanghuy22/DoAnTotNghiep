using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class SlideshowRepository : ISlideshowRepository
    {
        private readonly CSDLContext _context;

        public SlideshowRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> SlideshowExist(int id)
        {
            return await _context.Slideshows.AnyAsync(c => c.Id == id);
        }

        public async Task<IActionResult> CreateSlideshow(Slideshow slideshow, string userId)
        {
            await _context.Slideshows.AddAsync(slideshow);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo Slideshow",
                    Date = DateTime.Now,
                    Object = "Slideshow",
                    ObjectId = slideshow.Id.ToString() ?? "",
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
                mess  = "Something went wrong!!!"
            });
        }

        public async Task<IActionResult> DeleteSlideshow(int id, string userId)
        {
            var pt = await GetSlideshow(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this slideshow!"
                });
            }
            _context.Slideshows.Remove(pt);
            var result =  await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Xóa Slideshow",
                    Date = DateTime.Now,
                    Object = "Slideshow",
                    ObjectId = id.ToString() ?? "",
                };
                await _context.LogModels.AddAsync(logModel);
                await _context.SaveChangesAsync();
                return new OkObjectResult(new
                {
                    mess = "Successfully deleted!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IEnumerable<Slideshow>> GetSlideshows()
        {
            return await _context.Slideshows.ToListAsync();
        }
        public async Task<Slideshow> GetSlideshow(int id)
        {
            return await _context.Slideshows.FindAsync(id);
        }

        public async Task<IEnumerable<Slideshow>> GetSlideshowsForPresent()
        {
            return await _context.Slideshows.Where(s => s.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateSlideshow(int id, Slideshow slideshow, string userId)
        {
            if(id != slideshow.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            _context.Entry(slideshow).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await SlideshowExist(slideshow.Id))
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }
                else
                {
                    throw;
                }
            }
            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa Slideshow",
                Date = DateTime.Now,
                Object = "Slideshow",
                ObjectId = id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();
            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }

        public async Task<IActionResult> UpdateStatusSlideshow(int id, bool status, string userId)
        {
            var pt = await GetSlideshow(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this slideshow!"
                });
            }

            pt.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Sửa trạng thái Slideshow",
                    Date = DateTime.Now,
                    Object = "Slideshow",
                    ObjectId = id.ToString() ?? "",
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
    }
}

