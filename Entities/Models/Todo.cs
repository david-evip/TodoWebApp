using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("todo")]
    public class Todo
    {
        public int TodoID { get; set; }
        [ForeignKey(nameof(Column))]
        public int ColumnID { get; set; }
        [Required(ErrorMessage = "Title is required")]
        [StringLength(20, ErrorMessage = "Title can't be longer than 20")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Description is required")]
        [StringLength(100, ErrorMessage = "Description can't be longer than 20")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Deadline is required")]
        public DateTime Deadline { get; set; }
        [Required(ErrorMessage = "Position is required")]
        public int Position { get; set; }
    }
}
