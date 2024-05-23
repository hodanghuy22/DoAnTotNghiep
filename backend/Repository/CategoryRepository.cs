using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly CSDLContext _context;

        public CategoryRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CategoryExist(int id)
        {
            return await _context.Categories.AnyAsync(c => c.Id == id);
        }

        public async Task<bool> CheckCategoryTitleExist(Category category)
        {
            var pt = await _context.Categories
                .FirstOrDefaultAsync(p => p.Id != category.Id && p.Title == category.Title);
            if (pt == null)
            {
                return false;
            }
            return true;
        }

        public async Task<IActionResult> CreateCategory(Category category, string userId)
        {
            var check = await CheckCategoryTitleExist(category);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "This category was exsist!!!"
                });
            }
            await _context.Categories.AddAsync(category);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Tạo Category",
                    Date = DateTime.Now,
                    Object = "Category",
                    ObjectId = category.Id.ToString() ?? "",
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

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategoriesShow()
        {
            return await _context.Categories.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<Category> GetCategory(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<IActionResult> UpdateCategory(int id, Category category, string userId)
        {
            if (id != category.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            var check = await CheckCategoryTitleExist(category);
            if (check == true)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "It was existed!"
                });
            }
            try
            {
                var pt = await GetCategory(id);
                if (pt == null)
                {
                    return new NotFoundObjectResult(new
                    {
                        mess = "Not Found!"
                    });
                }

                _context.Entry(pt).CurrentValues.SetValues(category);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            LogModel logModel = new LogModel()
            {
                UserId = userId,
                Action = "Sửa Category",
                Date = DateTime.Now,
                Object = "Category",
                ObjectId = category.Id.ToString() ?? "",
            };
            await _context.LogModels.AddAsync(logModel);
            await _context.SaveChangesAsync();
            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }

        public async Task<IActionResult> UpdateStatusCategory(int id, bool status, string userId)
        {
            var pt = await GetCategory(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this category!"
                });
            }

            pt.Status = status;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                LogModel logModel = new LogModel()
                {
                    UserId = userId,
                    Action = "Sửa trạng thái Category",
                    Date = DateTime.Now,
                    Object = "Category",
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
