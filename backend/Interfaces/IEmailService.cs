using backend.Models;

namespace backend.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(EmailModel emailModel);

    }
}
