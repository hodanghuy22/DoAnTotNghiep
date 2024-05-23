namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepositoty UserRepositoty { get; }
        IColorRepository ColorRepository { get; }
        IBrandRepository BrandRepository { get; }
        ICapacityRepository CapacityRepository { get; }
        ISlideshowRepository SlideshowRepository { get; }
        IProductRepository ProductRepository { get; }
        IProductDetailRepository ProductDetailRepository { get; }
        IWishlistRepository WishlistRepository { get; }
        ICartRepository CartRepository { get; }
        ICouponRepository CouponRepository { get; }
        IInvoiceRepository InvoiceRepository { get; }
        IOrderStatusRepository OrderStatusRepository { get; }
        ICommentRepository CommentRepository { get; }
        IRatingRepository RatingRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        ILogRepository LogRepository { get; }

    }
}
