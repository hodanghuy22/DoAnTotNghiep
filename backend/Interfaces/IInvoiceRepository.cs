using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<Result<Invoice>> CreateInvoice(Invoice invoice);
        Task<IEnumerable<Invoice>> GetInvoices(string userID);
        Task<IEnumerable<Invoice>> GetInvoicesForAdmin();
        Task<IEnumerable<Invoice>> GetInvoicesByStatus(string userID, int orderStatusId);
        Task<Invoice> GetInvoice(int id);
        Task<int> CountInvoicesByMonth(int month, int year);
        Task<int> CountCancelInvoicesByMonth(int month, int year);
        Task<int> GetRevenueByMonth(int month, int year);
        Task<int> GetRevenueAfterDiscountByMonth(int month, int year);
        Task<IEnumerable<RevenueOfYearModel>> GetRevenueOfYear(int year);
        Task<IEnumerable<StatisticInvoiceOfYearModel>> GetTotalInvoiceOfYear(int year);
        Task<IActionResult> UpdateStatusInvoice(int id, int orderStatusId);
        Task<Result<Invoice>> CancelInvoiceForUser(int id);
        Task<Result<Invoice>> HookPayment(Transaction transaction);

    }
}
