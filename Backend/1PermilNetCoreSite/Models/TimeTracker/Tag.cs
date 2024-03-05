using Microsoft.CodeAnalysis.MSBuild;

namespace _1PermilNetCoreSite.Models.TimeTracker
{
    public class Tag
    {
        public int TagId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<TimeEntryTag>? TimeEntryTags { get; set; }
    }
}
