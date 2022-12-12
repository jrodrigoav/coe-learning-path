using AutoMapper;
using LearningPath.API.DTO;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;

namespace LearningPath.API.Configurations
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer() 
        { 
           
            CreateMap<WorkItem, WorkItemDTO>().ReverseMap();
        }
    }
}
