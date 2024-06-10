using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProxyController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> ProxyToPayment(ProxyModel proxyModel)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(proxyModel.Url);

                if (response.StatusCode == HttpStatusCode.Redirect)
                {
                    var redirectUrl = response.Headers.Location.ToString();
                    return Redirect(redirectUrl);
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Content(content, "text/html");
                }
            }
        }
    }
}
