using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace WebScrapingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebPageController : ControllerBase
    {
        private readonly ILogger<WebPageController> _logger;

        public WebPageController(ILogger<WebPageController> logger)
        {
            _logger = logger;
        }
        // Returns headline from url parameter
        // GET: api/{url}
        [HttpGet]
        public ActionResult<string> GetWebPageDetails(Uri url)
        {
            var webGet = new HtmlAgilityPack.HtmlWeb();
            string title;

            try
            {
                var document = webGet.Load(url);
                title = document.DocumentNode.SelectSingleNode("html/head/title").InnerText;
            } catch (Exception)
            {
                title = "Invalid Url: " + url;
            }
            
            title = JsonConvert.SerializeObject(title);

            return title;
        }
    }
}
