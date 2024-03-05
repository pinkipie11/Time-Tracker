namespace _1PermilNetCoreSite.Models.TimeTracker
{
    public class TimeEntryTag
    {
		public long TimeEntryId { get; set; }
		public virtual TimeEntry TimeEntry { get; set; }

		public int TagId { get; set; }
		public virtual Tag Tag { get; set; }
	}
}
