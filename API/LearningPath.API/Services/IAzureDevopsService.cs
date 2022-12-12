using LearningPath.API.Models;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;

namespace LearningPath.API.Services
{
    public interface IAzureDevopsService
    {        
        Task<string> GetCommitedWorkItems();       

    }
}
