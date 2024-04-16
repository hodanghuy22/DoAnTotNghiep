using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<IActionResult> CreateInvoice(Invoice invoice);
        Task<IEnumerable<Invoice>> GetInvoices(string userID);
        Task<IEnumerable<Invoice>> GetInvoicesForAdmin();
        Task<IEnumerable<Invoice>> GetInvoicesByStatus(string userID, int orderStatusId);
        Task<Invoice> GetInvoice(int id);
        Task<IActionResult> UpdateStatusInvoice(int id, int orderStatusId);
    }
}
