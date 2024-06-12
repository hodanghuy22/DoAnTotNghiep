using backend.Models;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;

namespace backend.Services
{
    public class PaypalService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _baseURL;

        public PaypalService(string clientId, string secret, string url)
        {
            _clientId = clientId;
            _clientSecret = secret;
            _baseURL = url;
        }
        private PayPalHttpClient CreatePayPalClient()
        {
            var environment = new SandboxEnvironment(_clientId, _clientSecret);
            return new PayPalHttpClient(environment);
        }
        public decimal ConvertVndToUsd(int amountInVnd)
        {
            return amountInVnd / 25000m;
        }

        public async Task<string> CreatePayment(int amount)
        {
            var payPalClient = CreatePayPalClient();

            var request = new OrdersCreateRequest();
            request.RequestBody(new OrderRequest
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = "USD",
                            Value = ConvertVndToUsd(amount).ToString("0.00")
                        }
                    }
                },
                ApplicationContext = new ApplicationContext
                {
                    BrandName = "HUBI",
                    LandingPage = "LOGIN",
                    UserAction = "PAY_NOW",
                    ReturnUrl = "http://localhost:3000/payment-success",
                    CancelUrl = "http://localhost:3000/payment-fail"
                }
            });

            var response = await payPalClient.Execute(request);
            return response.Result<Order>().Id;
        }

        public async Task<bool> CaptureOrder(CaptureOrderModel captureOrder)
        {
            var payPalClient = CreatePayPalClient();
            var request = new OrdersCaptureRequest(captureOrder.OrderId);
            request.RequestBody(new OrderActionRequest());

            try
            {
                // Execute the request
                var response = await payPalClient.Execute(request);

                // Get the result
                var result = response.Result<Order>();
                string status = result.Status;

                // Return true if the status is COMPLETED
                return status == "COMPLETED";
            }
            catch (HttpException httpEx)
            {
                // Log the exception message
                Console.WriteLine($"PayPal capture order failed: {httpEx.Message}");
                return false;
            }
            catch (Exception ex)
            {
                // Log any other exception message
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }
        public async Task<Order> GetOrderDetails(string orderId)
        {
            var payPalClient = CreatePayPalClient();
            var request = new OrdersGetRequest(orderId);
            var response = await payPalClient.Execute(request);
            return response.Result<Order>();
        }
    }
}
