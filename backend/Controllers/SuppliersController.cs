using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class SuppliersController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public SuppliersController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            var suppliers = await _uow.SupplierRepository.GetSuppliers();
            return Ok(suppliers);
        }
        [HttpGet]
        [Route("Active")]
        public async Task<IActionResult> GetSupplierActive()
        {
            var suppliers = await _uow.SupplierRepository.GetSupplierActive();
            return Ok(suppliers);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetSupplier(int id)
        {
            var supplier = await _uow.SupplierRepository.GetSupplier(id);
            return Ok(supplier);
        }
        [HttpPost]
        public async Task<IActionResult> CreateSupplier(Supplier supplier)
        {
            return await _uow.SupplierRepository.CreateSupplier(supplier);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateSupplier(int id, Supplier supplier)
        {
            return await _uow.SupplierRepository.UpdateSupplier(id, supplier);
        }
        [HttpPut]
        [Route("UpdateStatusSupplier/{id}/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatusSupplier(int id, bool status)
        {
            return await _uow.SupplierRepository.UpdateStatusSupplier(id, status);
        }
    }
}
