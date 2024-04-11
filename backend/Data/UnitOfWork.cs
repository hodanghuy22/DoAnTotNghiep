using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public UnitOfWork
        (
            CSDLContext context,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IMapper mapper,
            IEmailService emailService
        )
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            _emailService = emailService;
        }

        public IUserRepositoty UserRepositoty => 
            new UserRepository(_context, _userManager,
                    _roleManager, _configuration, _mapper, _emailService);
        public IColorRepository ColorRepository =>
            new ColorRepository(_context);
        public IBrandRepository BrandRepository =>
           new BrandRepository(_context);
        public ICapacityRepository CapacityRepository =>
           new CapacityRepository(_context);
        public ISlideshowRepository SlideshowRepository =>
           new SlideshowRepository(_context);
        public IProductTypeRepository ProductTypeRepository =>
           new ProductTypeRepository(_context);
        public IProductRepository ProductRepository =>
           new ProductRepository(_context);
    }
}
