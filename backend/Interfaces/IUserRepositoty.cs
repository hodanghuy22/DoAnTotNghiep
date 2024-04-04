using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IUserRepositoty
    {
        Task<IActionResult> RegisterAdmin(RegisterModel registerModel);
        Task<IActionResult> Register(RegisterModel registerModel);
        Task<IActionResult> Login(LoginModel account);
        Task<IEnumerable<UserDto>> GetAllUser();
        Task<UserDto> GetAUser(string id);
        Task<User> GetUserDefault(string id);
        Task<IActionResult> UpdateUser(string id, UserDto userDto);
        Task<IActionResult> ChangePassword(string id, ChangePasswordModel changePasswordModel);
        Task<IActionResult> ForgetPassword(ForgetPasswordModel forgetPasswordModel);
        Task<IActionResult> ResetPassword(ResetPasswordModel model);

    }
}
