namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepositoty UserRepositoty { get; }
        IColorRepository ColorRepository { get; }

    }
}
