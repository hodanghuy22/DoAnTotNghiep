using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Repository
{
    public class UserRepository : IUserRepositoty
    {
        private readonly CSDLContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UserRepository
        (
            CSDLContext context,
            UserManager<User> userManager, 
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
        )
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public Task<IActionResult> Login(LoginModel account)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            if (registerModel.Password != registerModel.Repassword)
            {
                return new BadRequestObjectResult("Password must be matched with Repassword!");
            }
            var userExist = await _userManager.FindByNameAsync(registerModel.Username);
            if (userExist != null)
            {
                var errorResponse = new { Message = "User already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            var checkEmail = await _userManager.FindByEmailAsync(registerModel.Email);
            if (checkEmail != null)
            {
                var errorResponse = new { Message = "Email already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            User user = new User()
            {
                UserName = registerModel.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = registerModel.Email
            };
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
            {
                var errorResponse = new { Message = "Something went wrong!" };
                return new BadRequestObjectResult(errorResponse);
            }
            if (await _roleManager.RoleExistsAsync("User"))
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            return new OkResult();
        }

        public async Task<IActionResult> RegisterAdmin(RegisterModel registerModel)
        {
            if (registerModel.Password != registerModel.Repassword)
            {
                return new BadRequestObjectResult("Password must be matched with Repassword!");
            }
            var userExist = await _userManager.FindByNameAsync(registerModel.Username);
            if (userExist != null)
            {
                var errorResponse = new { Message = "User already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            var checkEmail = await _userManager.FindByEmailAsync(registerModel.Email);
            if (checkEmail != null)
            {
                var errorResponse = new { Message = "Email already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            User user = new User()
            {
                Email = registerModel.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerModel.Username
            };
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
            {
                var errorResponse = new { Message = "Something went wrong!" };
                return new BadRequestObjectResult(errorResponse);
            }

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            return new OkResult();
        }
    }
}
