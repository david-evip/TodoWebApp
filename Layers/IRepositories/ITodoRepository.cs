using Entities.Models;

namespace Layers.IRepositories
{
    public interface ITodoRepository : IRepositoryBase<Todo>
    {
        bool TodoExist(int id);
    }
}
