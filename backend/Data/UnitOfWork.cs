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
        public IProductRepository ProductRepository =>
           new ProductRepository(_context);
        public IProductDetailRepository ProductDetailRepository => 
           new ProductDetailRepository(_context);

        public IWishlistRepository WishlistRepository => 
           new WishlistRepository(_context);

        public ICartRepository CartRepository =>
           new CartRepository(_context);

        public ICouponRepository CouponRepository =>
           new CouponRepository(_context);

        public IInvoiceRepository InvoiceRepository =>
           new InvoiceRepository(_context, _emailService);

        public IOrderStatusRepository OrderStatusRepository =>
           new OrderStatusRepository(_context);

        public ICommentRepository CommentRepository => 
           new CommentRepository(_context);

        public IRatingRepository RatingRepository => 
           new RatingRepository(_context);

        public ICategoryRepository CategoryRepository => 
           new CategoryRepository(_context);

        public ILogRepository LogRepository => 
           new LogRepository(_context);

        public INotificationRepository NotificationRepository => 
           new NotificationRepository(_context);
    }
}
