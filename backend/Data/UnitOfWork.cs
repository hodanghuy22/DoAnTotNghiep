using backend.Interfaces;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CSDLContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UnitOfWork
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

        public IUserRepositoty UserRepositoty => 
            new UserRepository(_context, _userManager,
                    _roleManager, _configuration);
    }
}
