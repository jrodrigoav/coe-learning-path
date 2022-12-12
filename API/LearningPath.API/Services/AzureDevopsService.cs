using Microsoft.TeamFoundation.SourceControl.WebApi;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi;

using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using LearningPath.API.Models;
using System.Collections.Generic;
using AutoMapper;
using System.Text.Json;


namespace LearningPath.API.Services
{
    public class AzureDevopsService : IAzureDevopsService
    {
        private readonly IConfiguration _config;

        public AzureDevopsService(IConfiguration config)
        {
            _config = config;
        }


        public async Task<string> GetCommitedWorkItems()
        {
            List<WorkItemFromJson> workItemsFromJson= new List<WorkItemFromJson>();

            string token = _config["AzureDevOpsTkn"];

            var azureDevOpsUri = new Uri("https://dev.azure.com/UnoquareCSharpCoE");
            var credentials = new VssBasicCredential(token, string.Empty);

            var connection = new VssConnection(azureDevOpsUri, credentials);
            // Get an instance of the work item tracking client
            WorkItemTrackingHttpClient witClient = connection.GetClient<WorkItemTrackingHttpClient>();


            //"SELECT [System.Id], [System.Title], [System.CreatedDate] ,[System.ChangedDate], [System.AssignedTo],[Custom.Hours]
            //From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' AND [State] = 'Committed'
            //AND [System.CreatedDate] >= @StartOfDay('-60d') ORDER BY [System.CreatedDate] DESC"
            var wiql = new Wiql
            {
                Query = "SELECT [System.Id] From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' " +
                    "AND [State] = 'Committed' AND [System.CreatedDate] >= @StartOfDay('-60d')"
            };

            var queryResult = await witClient.QueryByWiqlAsync(wiql);
            var workItemIds = queryResult.WorkItems.Select(s => s.Id).ToList();
            var workItems = await witClient.GetWorkItemsAsync(workItemIds);
            workItems = workItems ?? new List<WorkItem>();

            workItemsFromJson = MapWorkItems(workItems);

            return JsonSerializer.Serialize(workItemsFromJson);

            //return workItems?.ToArray() ?? Array.Empty<WorkItem>();

        }

        private List<WorkItemFromJson> MapWorkItems(List<WorkItem> workItems)
        {

            List<WorkItemFromJson> workItemsFromJson = new List<WorkItemFromJson>();

            foreach (var workItem in workItems)
            {
                WorkItemFromJson wiFromJson = new WorkItemFromJson();


                wiFromJson.Id = workItem.Id;

                if (workItem.Fields.ContainsKey("System.Title"))
                {
                    wiFromJson.SystemTitle = (string)workItem.Fields["System.Title"];
                }

                if (workItem.Fields.ContainsKey("System.AssignedTo"))
                {
                    var person = (IdentityRef)workItem.Fields["System.AssignedTo"];
                   
                    wiFromJson.DisplayName = person.DisplayName;
                }

                if (workItem.Fields.ContainsKey("System.ChangedDate"))
                {
                    wiFromJson.SystemChangedDate = (DateTime)workItem.Fields["System.ChangedDate"];
                }

                workItemsFromJson.Add(wiFromJson);
            }

            return workItemsFromJson;
        }

  


    }
}
