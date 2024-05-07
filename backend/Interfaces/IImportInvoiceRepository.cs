using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IImportInvoiceRepository
    {
        Task<IActionResult> CreateImportInvoice(ImportInvoice importInvoice);
        Task<IEnumerable<ImportInvoice>> GetImportInvoices();
        Task<ImportInvoice> GetImportInvoice(int id);
        Task<IActionResult> UpdateImportInvoice(int id, ImportInvoice importInvoice);
    }
}
