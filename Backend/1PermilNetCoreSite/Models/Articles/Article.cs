using _1PermilNetCoreSite.Models.CustomIdentity;

namespace _1PermilNetCoreSite.Models.Articles
{
    public class Article
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public DateTime CreatedDate { get; set; }

        public long ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
