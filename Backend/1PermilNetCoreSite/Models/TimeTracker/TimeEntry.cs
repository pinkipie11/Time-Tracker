using _1PermilNetCoreSite.Models.CustomIdentity;

namespace _1PermilNetCoreSite.Models.TimeTracker
{
    public class TimeEntry
    {
        public long Id { get; set; }

        public string? Description { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public Project Project { get; set; }

		public long? ProjectId { get; set; }

		public long ApplicationUserId { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }

		// Veza s Tag entitetima
		public virtual ICollection<TimeEntryTag> TimeEntryTags { get; set; }

		// Konstruktor koji inicijalizira TimeEntryTags
		public TimeEntry()
		{
			TimeEntryTags = new HashSet<TimeEntryTag>();
		}
	}
}
 