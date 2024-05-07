using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ImportInvoicesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ImportInvoicesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetImportInvoice(int id)
        {
            var invoices = await _uow.ImportInvoiceRepository.GetImportInvoice(id);
            return Ok(invoices);
        }

        [HttpGet]
        public async Task<IActionResult> GetImportInvoices()
        {
            var invoices = await _uow.ImportInvoiceRepository.GetImportInvoices();
            return Ok(invoices);
        }
        [HttpPut]
        [Route("UpdateImportInvoice/{id}")]
        public async Task<IActionResult> UpdateImportInvoice(int id, ImportInvoice importInvoice)
        {
            var invoices = await _uow.ImportInvoiceRepository.UpdateImportInvoice(id, importInvoice);
            return Ok(invoices);
        }

        [HttpPost]
        public async Task<IActionResult> CreateImportInvoice(ImportInvoice importInvoice)
        {

            return await _uow.ImportInvoiceRepository.CreateImportInvoice(importInvoice);
        }
    }
}
