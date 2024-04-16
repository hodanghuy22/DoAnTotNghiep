using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICapacityRepository
    {
        Task<IActionResult> CreateCapacity(Capacity capacity);
        Task<IEnumerable<Capacity>> GetCapacities();
        //Task<IEnumerable<Capacity>> GetCapacitiesByPhoneId(int id);
        Task<IEnumerable<Capacity>> GetCapacitiesShow();
        Task<Capacity> GetCapacity(int id);
        Task<bool> CapacityExist(int id);
        Task<bool> CheckCapacityTotalExist(Capacity capacity);
        Task<IActionResult> UpdateCapacity(int id, Capacity capacity);
        Task<IActionResult> UpdateStatusCapacity(int id, bool status);
    }
}
