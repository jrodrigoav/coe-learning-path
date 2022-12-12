using AutoMapper;
using LearningPath.API.Models;
using LearningPath.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.TeamFoundation.Work.WebApi;

namespace LearningPath.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CenterOfExcellenceController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAzureDevopsService _azureDevopsService;
        private readonly IMapper _mapper;

        public CenterOfExcellenceController(IConfiguration config, IAzureDevopsService azureDevopsService, IMapper mapper)
        {
            _config = config;
            _azureDevopsService = azureDevopsService;
            _mapper = mapper;
        }

        [HttpGet("GetCommitedWorkItems")]
        public async Task<IActionResult> GetCommitedWorkItems()
        {
            var workItems = await _azureDevopsService.GetCommitedWorkItems();            

            return Ok(workItems);
        }
    }
}
