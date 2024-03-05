using _1PermilNetCoreSite.Models.CustomIdentity;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using System.ComponentModel.DataAnnotations.Schema;

namespace _1PermilNetCoreSite.Models.TimeTracker
{
    public class Client
    {
        public long Id { get; set; }

        public string? Name { get; set; }

        public long ApplicationUserId { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }

        // Navigacijsko svojstvo za povezane projekte
        public virtual ICollection<Project> Projects { get; set; } = new HashSet<Project>();

    }
}
