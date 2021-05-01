using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Moq;
using Layers.IRepositories;

namespace Layers.Tests
{
    [TestClass()]
    public class TodoRepositoryTests
    {
        public readonly ITodoRepository MoqTodoRepository;

        public TodoRepositoryTests()
        {
            var todos = new List<Todo>()
            {
                new Todo() { Title="Test01",Description="TestDesc01",Deadline=DateTime.Now.AddDays(10),ColumnID=1,Position=0},
                new Todo() { Title="Test02",Description="TestDesc02",Deadline=DateTime.Now.AddDays(20),ColumnID=1,Position=1},
                new Todo() { Title="Test03",Description="TestDesc03",Deadline=DateTime.Now.AddDays(30),ColumnID=1,Position=2},
            };

            var moqTodoRepository = new Mock<ITodoRepository>();

            moqTodoRepository.Setup(t => t.FindAllAsync()).ReturnsAsync(todos);

            this.MoqTodoRepository = moqTodoRepository.Object;
        }

        [TestMethod()]
        public void FindByIdAsyncTestShouldReturnCorrectly()
        {
            Task<IEnumerable<Todo>> testTodos = this.MoqTodoRepository.FindAllAsync();
            var result = testTodos.Result.ToList();

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count);
        }

        [TestMethod()]
        public void FindByIdAsyncTestShouldReturnInCorrectly()
        {
            Task<IEnumerable<Todo>> testTodos = this.MoqTodoRepository.FindAllAsync();
            var result = testTodos.Result.ToList();

            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
        }
    }
}