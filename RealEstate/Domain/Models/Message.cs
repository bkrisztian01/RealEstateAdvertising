using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Message
    {
        public int Id { get; set; }
        public bool IsUnread { get; set; }
        public string Content { get; set; }
        public User FromUser { get; set; }
        public User ToUser { get; set; }
        public DateTime Date { get; set; }
    }
}