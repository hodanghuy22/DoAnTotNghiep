using backend.Interfaces;
using backend.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmail(EmailModel emailModel)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration["EmailService:Username"]));
            email.To.Add(MailboxAddress.Parse(emailModel.To));
            email.Subject = emailModel.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = emailModel.Body
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_configuration["EmailService:Host"], 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_configuration["EmailService:Username"], _configuration["EmailService:Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);

        }
    }
}
