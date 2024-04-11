namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepositoty UserRepositoty { get; }
        IColorRepository ColorRepository { get; }
        IBrandRepository BrandRepository { get; }
        ICapacityRepository CapacityRepository { get; }
        ISlideshowRepository SlideshowRepository { get; }

    }
}
