using Entities.Models;
using Layers.IRepositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnsController : Controller
    {
        private IColumnRepository _columnRepository;

        public ColumnsController(IColumnRepository columnRepository)
        {
            _columnRepository = columnRepository;
        }

        // GET: api/Columns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Column>>> GetColumns()
        {
            return Ok(await _columnRepository.FindAllAsync());
        }

        // GET: api/Columns/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Column>> GetColumn(int id)
        {
            var column = await _columnRepository.FindByIdAsync(id);

            if (column == null)
            {
                return NotFound();
            }

            return Ok(column);
        }

        // PUT: api/Columns/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColumn(int id, Column column)
        {
            if (id != column.ColumnID)
            {
                return BadRequest();
            }

            _columnRepository.Update(column);

            try
            {
                await _columnRepository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_columnRepository.ColumnExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }

        // POST: api/Columns
        [HttpPost]
        public async Task<ActionResult<Todo>> PostColumn(Column column)
        {
            _columnRepository.Create(column);
            await _columnRepository.SaveChangesAsync();

            return CreatedAtAction("GetTodo", new { id = column.ColumnID }, column);
        }

        // DELETE: api/Columns/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColumn(int id)
        {
            var todo = await _columnRepository.FindByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _columnRepository.Delete(todo);
            await _columnRepository.SaveChangesAsync();

            return Ok();
        }
    }
}
