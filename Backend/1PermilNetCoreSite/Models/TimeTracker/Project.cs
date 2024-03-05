using _1PermilNetCoreSite.Models.CustomIdentity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _1PermilNetCoreSite.Models.TimeTracker 
{
    public class Project
    {
        public long Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        [Unicode(false)]
        [MaxLength(7)]
        public string? Color { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public bool Billable { get; set; }

        public virtual Client? Client { get; set; }

        public long? ClientId { get; set; }

        public long ApplicationUserId { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }
        
    }
}
