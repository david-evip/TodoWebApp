using Entities;
using Entities.Models;
using Layers.IRepositories;
using System.Linq;

namespace Layers.Repositories
{
    public class TodoRepository : RepositoryBase<Todo>, ITodoRepository
    {
        public TodoRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public bool TodoExist(int id)
        {
            return base.RepositoryContext.Todos.Any(t => t.TodoID == id);
        }
    }
}
