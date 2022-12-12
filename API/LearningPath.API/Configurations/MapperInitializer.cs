using AutoMapper;
using LearningPath.API.Models;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;

namespace LearningPath.API.Configurations
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer() 
        { 
           
            CreateMap<WorkItem, WorkItemFromJson>().ReverseMap();
        }
    }
}
