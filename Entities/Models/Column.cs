using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("column")]
    public class Column
    {
        public int ColumnID { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(20, ErrorMessage = "Name can't be longer than 20")]
        public string Name { get; set; }
        public ICollection<Todo> Todos { get; set; }
    }
}
