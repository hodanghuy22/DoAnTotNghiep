using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> RegisterAdmin(RegisterModel registerModel)
        {
            return await _uow.UserRepositoty.RegisterAdmin(registerModel);
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
