using backend.Models;
using Microsoft.AspNetCore.Mvc;
namespace backend.Interfaces
{
    public interface ILogRepository
    {
        Task<IActionResult> CreateLog(LogModel logModel);
        Task<IEnumerable<LogModel>> GetLogs();
    }
}
