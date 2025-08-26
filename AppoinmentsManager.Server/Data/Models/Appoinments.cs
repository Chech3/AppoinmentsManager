using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppoinmentsManager.Server.Data.Models
{
    public class Appoinments
    {
        [Key]
        public int ID { get; set; }


        [MaxLength(150), Column(TypeName = "nvarchar(150)")]

        public string? Title { get; set; } = "Title";

        [MaxLength(300), Column(TypeName = "nvarchar(300)")]

        public string? Description { get; set; } = "Description";

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime ModifiedDate { get; set; } = DateTime.Now;

        public DateTime Date { get; set; } = DateTime.Now;

        [MaxLength(100), Column(TypeName = "nvarchar(100)")]
        public String Address { get; set; } = "Address";

        [MaxLength(10), Column(TypeName = "nvarchar(10)")]
        public String Time { get; set; } = "12:30";

        public bool Deleted { get; set; } = false;

        public bool Done { get; set; } = false;

        public byte LevelOfImportance { get; set; } = 1;
    }
}
