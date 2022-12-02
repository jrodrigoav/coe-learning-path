using Microsoft.AspNetCore.Mvc;

namespace LearningPath.API.Controllers
{
    [ApiController, Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var assembly = System.Reflection.Assembly.GetExecutingAssembly();
            var fvi = System.Diagnostics.FileVersionInfo.GetVersionInfo(assembly.Location);
            return Ok(fvi.FileVersion);
        }
    }
}