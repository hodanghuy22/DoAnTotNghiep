using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class LogRepository : ILogRepository
    {
        private readonly CSDLContext _context;

        public LogRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> CreateLog(LogModel logModel)
        {
            await _context.LogModels.AddAsync(logModel);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
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

        public async Task<IEnumerable<LogModel>> GetLogs()
        {
            return await _context.LogModels
                .Include(l => l.User)
                .OrderByDescending(l => l.Id)
                .ToListAsync();
        }
    }
}
