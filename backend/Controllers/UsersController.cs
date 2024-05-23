using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public UsersController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpPost]
        [Route("register-admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegisterAdmin(RegisterModel registerModel)
        {
            string userId = HttpContext.Request.Headers["UserId"].FirstOrDefault();

            return await _uow.UserRepositoty.RegisterAdmin(registerModel, userId);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            return await _uow.UserRepositoty.Register(registerModel);
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel account)
        {
            return await _uow.UserRepositoty.Login(account);
        }
        [HttpGet]
        [Route("GetAllUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<UserDto>> GetAllUser()
        {
            return await _uow.UserRepositoty.GetAllUser();
        }
        [HttpGet]
        [Route("CountUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CountUser()
        {
            var count = await _uow.UserRepositoty.CountUser();
            return Ok(count);
        }
        [HttpPost]
        [Route("GetTopUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTopUser()
        {
            var count = await _uow.UserRepositoty.GetTopUser();
            return Ok(count);
        }
        [HttpGet]
        [Route("StatisticUserOfYear/{year}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> StatisticUserOfYear(int year)
        {
            var count = await _uow.UserRepositoty.StatisticUserOfYear(year);
            return Ok(count);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<UserDto> GetAUser(string id)
        {
            return await _uow.UserRepositoty.GetAUser(id);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string id, UserDto userDto)
        {
            if(id == null || id != userDto.Id)
            {
                return BadRequest();
            }
            return await _uow.UserRepositoty.UpdateUser(id, userDto);
        }
        [HttpPut]
        [Route("ChangePassword/{id}")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(string id, ChangePasswordModel changePasswordModel)
        {
            if (id == null)
            {
                return BadRequest();
            }
            return await _uow.UserRepositoty.ChangePassword(id, changePasswordModel);
        }
        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgetPasswordModel forgetPasswordModel)
        {
            if (string.IsNullOrEmpty(forgetPasswordModel.Email))
            {
                return NotFound();
            }
            return await _uow.UserRepositoty.ForgetPassword(forgetPasswordModel);
        }
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                return await _uow.UserRepositoty.ResetPassword(model);
            }
            return BadRequest(new
            {
                mess = "Some properties are not valid"
            }); 
        }
        
    }
}
