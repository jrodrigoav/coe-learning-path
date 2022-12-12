using LearningPath.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearningPath.API.Controllers
{
    [Route("api/centerofexcellence"), ApiController]
    public class CenterOfExcellenceController : ControllerBase
    {
        private readonly AzureDevopsService _azureDevopsService;

        public CenterOfExcellenceController(AzureDevopsService azureDevopsService)
        {
            _azureDevopsService = azureDevopsService;
        }

        [HttpGet("getcommitedworkitems")]
        public async Task<IActionResult> GetCommitedWorkItems()
        {
            var workItems = await _azureDevopsService.GetCommitedWorkItems();

            return Ok(workItems);
        }
    }
}
