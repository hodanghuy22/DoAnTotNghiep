using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ISupplierRepository
    {
        Task<IActionResult> CreateSupplier(Supplier supplier);
        Task<IEnumerable<Supplier>> GetSuppliers();
        Task<IEnumerable<Supplier>> GetSupplierActive();
        Task<Supplier> GetSupplier(int id);
        Task<bool> CheckSupplierExist(Supplier supplier);
        Task<IActionResult> UpdateSupplier(int id, Supplier supplier);
        Task<IActionResult> UpdateStatusSupplier(int id, bool status);
    }
}
