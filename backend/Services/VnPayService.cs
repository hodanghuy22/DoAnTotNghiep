using backend.Models;

namespace backend.Services
{
    public class VnPayService
    {
        private readonly string _vnp_TmnCode;
        private readonly string _vnp_HashSecret;
        private readonly string _vnp_Url;
        private readonly string _vnp_Returnurl;

        public VnPayService(
            string vnp_TmnCode, 
            string vnp_HashSecret, 
            string vnp_Url,
            string vnp_Returnurl
        )
        {
            _vnp_TmnCode = vnp_TmnCode;
            _vnp_HashSecret = vnp_HashSecret;
            _vnp_Url = vnp_Url;
            _vnp_Returnurl = vnp_Returnurl;
        }

        public string CreatePayment(CreatePaymentModel createPayment, string ipAdress)
        {
            VnPayLibrary vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", _vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (createPayment.Amount * 100).ToString());

            vnpay.AddRequestData("vnp_BankCode", "VNBANK");

            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", ipAdress);
            Random random = new Random();

            int randomNumber = random.Next(1, 1000);
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang: "+ createPayment.MaHD);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other

            vnpay.AddRequestData("vnp_ReturnUrl", _vnp_Returnurl);
            
            vnpay.AddRequestData("vnp_TxnRef", createPayment.MaHD); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            //Add Params of 2.1.0 Version
            //Billing

            string paymentUrl = vnpay.CreateRequestUrl(_vnp_Url, _vnp_HashSecret);
            return paymentUrl;
        }
    }
}
