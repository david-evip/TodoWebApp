using Entities;
using Entities.Models;
using Layers.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Layers.Repositories
{
    public class ColumnRepository : RepositoryBase<Column>, IColumnRepository
    {
        public ColumnRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public override async Task<IEnumerable<Column>> FindAllAsync()
        {
            return await base.RepositoryContext.Columns.Include(t => t.Todos).ToListAsync();
        }

        public bool ColumnExist(int id)
        {
            return base.RepositoryContext.Todos.Any(t => t.TodoID == id);
        }
    }
}
