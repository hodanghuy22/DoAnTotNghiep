using backend.Interfaces;
using Telegram.Bot;

namespace backend.Services
{
    public class TelegramService : ITelegramService
    {
        private readonly ITelegramBotClient _botClient;
        private readonly string _chatId;
        private readonly IConfiguration _configuration;

        public TelegramService(IConfiguration configuration)
        {
            _configuration = configuration;
            _botClient = new TelegramBotClient(_configuration["Telegram:Token"]);
            _chatId = _configuration["Telegram:Chat_Id"];
        }

        public async Task SendMessage(string message)
        {
           await _botClient.SendTextMessageAsync(_chatId, message);
        }
    }
}
