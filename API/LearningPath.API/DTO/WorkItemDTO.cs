using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.WebApi;

namespace LearningPath.API.DTO
{
    public class WorkItemDTO
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? AssignedTo { get; set; }

        public DateTime ChangedDate { get; set; }

        public WorkItemDTO(WorkItem workItem)
        {
            Id = workItem.Id ?? 0;

            if (workItem.Fields.ContainsKey("System.Title"))
            {
                Title = (string)workItem.Fields["System.Title"];
            }

            if (workItem.Fields.ContainsKey("System.AssignedTo"))
            {
                var person = (IdentityRef)workItem.Fields["System.AssignedTo"];

                AssignedTo = person.DisplayName;
            }

            if (workItem.Fields.ContainsKey("System.ChangedDate"))
            {
                ChangedDate = (DateTime)workItem.Fields["System.ChangedDate"];
            }
        }
    }
}
