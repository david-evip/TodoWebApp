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
    public class TodosController : ControllerBase
    {
        private ITodoRepository _todoRepository;

        public TodosController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        // GET: api/Todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return Ok(await _todoRepository.FindAllAsync());
        }

        // GET: api/Todos/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await _todoRepository.FindByIdAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // PUT: api/Todos/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, Todo todo)
        {
            if (id != todo.TodoID)
            {
                return BadRequest();
            }

            _todoRepository.Update(todo);

            try
            {
                await _todoRepository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_todoRepository.TodoExist(id))
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

        // POST: api/Todos
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            _todoRepository.Create(todo);
            await _todoRepository.SaveChangesAsync();

            return CreatedAtAction("GetTodo", new { id = todo.TodoID }, todo);
        }

        // DELETE: api/Todos/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _todoRepository.FindByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _todoRepository.Delete(todo);
            await _todoRepository.SaveChangesAsync();

            return Ok();
        }
    }
}
