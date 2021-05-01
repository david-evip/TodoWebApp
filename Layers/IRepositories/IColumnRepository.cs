using Entities.Models;

namespace Layers.IRepositories
{
    public interface IColumnRepository : IRepositoryBase<Column>
    {
        bool ColumnExist(int id);
    }
}
