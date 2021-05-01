using Entities;
using Entities.Models;
using System;
using System.Linq;

namespace TodoAPI.Data
{
    public class DbInitializer
    {
        public static Column[] columns =
            {
                new Column { Name="Todo"},
                new Column { Name="InProgress"},
                new Column { Name="Done"},
                new Column { Name="Test"},
            };
        public static Todo[] todos =
            {
                new Todo {Title="Karacsony",Description="Unneples",Deadline=DateTime.Now.AddDays(10),ColumnID=1,Position=0},
                new Todo {Title="Setalatas",Description="Macsak setaltatasa",Deadline=DateTime.Now.AddDays(20),ColumnID=1,Position=1},
                new Todo {Title="Vacsora",Description="Vacsora keszites",Deadline=DateTime.Now.AddDays(30),ColumnID=1,Position=2},
                new Todo {Title="Pihenes",Description="Hetvegen kotelezo pihenes",Deadline=DateTime.Now.AddDays(40),ColumnID=2,Position=0}
            };

        public static void Initialize(RepositoryContext context)
        {
            context.Database.EnsureCreated();

            if (context.Todos.Any())
            {
                return;
            }

            context.Columns.AddRange(columns);
            context.SaveChanges();

            context.Todos.AddRange(todos);
            context.SaveChanges();
        }
    }
}
