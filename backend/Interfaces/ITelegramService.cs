namespace backend.Interfaces
{
    public interface ITelegramService
    {
        Task SendMessage(string message);
    }
}
