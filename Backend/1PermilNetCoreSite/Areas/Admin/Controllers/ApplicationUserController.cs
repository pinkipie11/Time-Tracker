using Microsoft.AspNetCore.Mvc;

namespace _1PermilNetCoreSite.Areas.Admin.Controllers
{
    public class ApplicationUserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
