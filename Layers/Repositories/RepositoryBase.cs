using Entities;
using Layers.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Layers
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext RepositoryContext { get; set; }

        public RepositoryBase(RepositoryContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }

        public virtual async Task<IEnumerable<T>> FindAllAsync()
        {
            return await RepositoryContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> FindByIdAsync(int id)
        {
            return await RepositoryContext.Set<T>().FindAsync(id);
        }

        public virtual void Create(T entity)
        {
            RepositoryContext.Set<T>().Add(entity);
        }

        public virtual void Update(T entity)
        {
            RepositoryContext.Set<T>().Update(entity);
        }

        public virtual void Delete(T entity)
        {
            RepositoryContext.Set<T>().Remove(entity);
        }

        public virtual Task SaveChangesAsync()
        {
            return RepositoryContext.SaveChangesAsync();
        }
    }
}
