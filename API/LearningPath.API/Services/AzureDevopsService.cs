using LearningPath.API.DTO;
using LearningPath.API.Models;
using Microsoft.Extensions.Options;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi;

namespace LearningPath.API.Services
{
    public class AzureDevopsService
    {     
        private readonly WorkItemTrackingHttpClient _witClient;

        public AzureDevopsService(IOptionsMonitor<AzureDevOpsSettings> optionsMonitor)
        {

            var credentials = new VssBasicCredential("", optionsMonitor.CurrentValue.PersonalAccessToken);

            var connection = new VssConnection(optionsMonitor.CurrentValue.AzureDevOpsProjectUri, credentials);
            
            _witClient = connection.GetClient<WorkItemTrackingHttpClient>();
        }


        public async Task<List<WorkItemDTO>> GetCommitedWorkItems()
        {
            List<WorkItemDTO> workItemsFromJson = new List<WorkItemDTO>();

            //"SELECT [System.Id], [System.Title], [System.CreatedDate] ,[System.ChangedDate], [System.AssignedTo],[Custom.Hours]
            //From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' AND [State] = 'Committed'
            //AND [System.CreatedDate] >= @StartOfDay('-60d') ORDER BY [System.CreatedDate] DESC"
            var wiql = new Wiql
            {
                Query = "SELECT [System.Id] From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' " +
                    "AND [State] = 'Committed' AND [System.CreatedDate] >= @StartOfDay('-60d')"
            };

            var queryResult = await _witClient.QueryByWiqlAsync(wiql);
            var workItemIds = queryResult.WorkItems.Select(s => s.Id).ToList();
            var workItems = await _witClient.GetWorkItemsAsync(workItemIds);
            workItems = workItems ?? new List<WorkItem>();

            return workItems.Select(wi => new WorkItemDTO(wi)).ToList();

        }

        public async Task<List<WorkItemDTO>> GetLegacyCommitedWorkItems()
        {
            List<WorkItemDTO> workItemsFromJson = new List<WorkItemDTO>();
          
            var wiql = new Wiql
            {
                Query = "SELECT [System.Id] From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' " +
                    "AND [State] = 'Committed' AND [System.CreatedDate] >= @StartOfDay('-360d')"
            };

            var queryResult = await _witClient.QueryByWiqlAsync(wiql);
            var workItemIds = queryResult.WorkItems.Select(s => s.Id).ToList();
            var workItems = await _witClient.GetWorkItemsAsync(workItemIds);
            workItems = workItems ?? new List<WorkItem>();

            return workItems.Select(wi => new WorkItemDTO(wi)).ToList();

        }

    }
}
