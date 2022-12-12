
using Newtonsoft.Json;

namespace LearningPath.API.Models
{
    public class WorkItemFromJson
    {       

        [JsonProperty("id")]
        public int? Id { get; set; }

        [JsonProperty("System.Title")]
        public string SystemTitle { get; set; }

        //UserName
        [JsonProperty("displayName")]
        public string DisplayName { get; set; }       

        [JsonProperty("System.ChangedDate")]
        public DateTime SystemChangedDate { get; set; }
    }
}
