using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IUserRepositoty
    {
        Task<IActionResult> RegisterAdmin(RegisterModel registerMode, string userId);
        Task<IActionResult> Register(RegisterModel registerModel);
        Task<IActionResult> Login(LoginModel account);
        Task<IEnumerable<UserDto>> GetAllUser();
        Task<UserDto> GetAUser(string id);
        Task<UserDto> GetAUserByToken(string token);
        Task<User> GetUserDefault(string id);
        Task<IActionResult> UpdateUser(string id, UserDto userDto);
        Task<IActionResult> ChangePassword(string id, ChangePasswordModel changePasswordModel);
        Task<IActionResult> ForgetPassword(ForgetPasswordModel forgetPasswordModel);
        Task<IActionResult> ResetPassword(ResetPasswordModel model);
        Task<int> CountUser(int month, int year);
        Task<IEnumerable<StatisticUserModel>> StatisticUserOfYear(int year);
        Task<IEnumerable<TopUserModel>> GetTopUser(FillterModel fillterModel);

    }
}
