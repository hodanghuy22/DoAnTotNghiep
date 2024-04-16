using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoicesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public InvoicesController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetInvoices(string userId)
        {
            var invoices = await _uow.InvoiceRepository.GetInvoices(userId);
            return Ok(invoices);
        }

        [HttpGet]
        [Route("GetInvoice/{id}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            var invoices = await _uow.InvoiceRepository.GetInvoice(id);
            return Ok(invoices);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetInvoicesForAdmin()
        {
            var invoices = await _uow.InvoiceRepository.GetInvoicesForAdmin();
            return Ok(invoices);
        }
        [HttpGet]
        [Route("GetInvoicesByStatus/{userId}/{orderStatusId}")]
        public async Task<IActionResult> GetInvoicesByStatus(string userId, int orderStatusId)
        {
            var invoices = await _uow.InvoiceRepository.GetInvoicesByStatus(userId, orderStatusId);
            return Ok(invoices);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice(Invoice invoice)
        {

            return await _uow.InvoiceRepository.CreateInvoice(invoice);
        }

        [HttpPut]
        [Route("UpdateStatusInvoice/{id}/{orderStatusId}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusInvoice(int id, int orderStatusId)
        {
            return await _uow.InvoiceRepository.UpdateStatusInvoice(id, orderStatusId);
        }

    }
}