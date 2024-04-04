using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IUserRepositoty
    {
        Task<IActionResult> RegisterAdmin(RegisterModel registerModel);
        Task<IActionResult> Register(RegisterModel registerModel);
        Task<IActionResult> Login(LoginModel account);
    }
}
