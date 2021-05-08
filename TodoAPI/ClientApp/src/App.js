import React, { Component } from 'react';
import Nav from './components/Nav';

import MainGrid from './components/Grid';
import './styles/index.css';

export default class App extends Component {
  static displayName = App.name;

  state = {
    columnsURL: 'https://localhost:44387/api/columns',
    columns: [],
    columnsTemp: [],
    columnsLoaded: false,

    todoURL: 'https://localhost:44387/api/todos',
    todos: [],
    todosLoaded: false,
  }

  onDragEnd = result => {
    
    const { destination, source} = result;

    if (!destination){
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const start = this.state.columns.find(column => column.columnID === parseInt(source.droppableId.split("-")[1]));
    const finish = this.state.columns.find(column => column.columnID === parseInt(destination.droppableId.split("-")[1]));
    const startIndex= this.state.columns.findIndex((column) => column.columnID === start.columnID);

    if (start === finish) {
      const tempTodos = Array.from(start.todos);
      tempTodos.splice(source.index, 1);
      tempTodos.splice(destination.index, 0, start.todos[source.index]);
      const finalTodos = this.handleTodoUpdateMultiple(tempTodos);

      const newColumn = {
        ...start,
        todos: finalTodos,
      };
      
      const newState = {
        ...this.state,
      };
      newState.columns[startIndex] = newColumn;
      this.setState(newState);
      return;
    }
    
    finish.todos.splice(destination.index, 0, start.todos[source.index]);
    start.todos[source.index].position = destination.index;
    start.todos[source.index].columnID = finish.columnID;
    this.handleTodoUpdateMultiple(finish.todos);
    const todo = start.todos[source.index];
    start.todos.splice(source.index, 1);
    this.handleTodoUpdate(todo);
  };

  loadColumns = () => {
    fetch(this.state.columnsURL)
      .then(res => res.json())
      .then(json => {
          this.setState({
              columnsLoaded: true,
              columnsTemp: json,
          })
      })
      .then(() => {
        this.handleSortTodos();
      });
  };

  loadTodos = () => {
    fetch(this.state.todoURL)
      .then(res => res.json())
      .then(json => {
          this.setState({
            todosLoaded: true,
            todos: json,
        })
      });
  };

  handleTodoCreate = (title, description, deadline, proirity) => {
    if (title === null | description === null | deadline === null | proirity === null){
      return;
    }
    let newTodo = {
      "columnID": proirity,
      "title": title,
      "description": description,
      "deadline": deadline
    }
    fetch(this.state.todoURL, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
    .then(response => {
      if (!response.ok) {
        console.error('Network response was NOT ok');
      }
      else if (response.ok) {
        this.loadTodos();
        this.loadColumns();
        console.log('Todo is created.');
      }
    });
  };

  handleTodoUpdateMultiple = (todos) => {
    todos.map((todo, index) => {
      todo.position = index;
      fetch(`${this.state.todoURL}/${todo.todoID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
      });
    });
    return todos;
  }

  handleSortTodos = () => {
    let newColumns = this.state.columnsTemp;
    newColumns.map(column =>{
      column.todos = column.todos.sort((a, b) => a.position > b.position ? 1 : -1)
    });
    this.setState({
      ...this.state,
      columnsTemp: [],
      columns: newColumns,
    });
  };

  handleTodoUpdate = (todo) => {
    fetch(`${this.state.todoURL}/${todo.todoID}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
    })
    .then(response => {
      if (!response.ok) {
        console.error('Network response was NOT ok');
      }
      else if (response.ok) {
        console.log(`Todo ${todo.todoID} is updated.`);
        this.loadColumns();
        this.loadTodos();
      }
    })
  };

  handleTodoDelete = (todoIn) => {
    fetch(`${this.state.todoURL}/${todoIn.todoID}`, {
            method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
            console.error('Network response was NOT ok');
        }
        else if (response.ok) {
          const newState = {
            ...this.state,
          }
          const newTodos = this.state.todos.filter((todo) => todo.todoID !== todoIn.todoID);
          const newColumn = this.state.columns[todoIn.columnID - 1];
          const newColumnTodos = newColumn.todos.filter((todo) => todo.todoID !== todoIn.todoID);
          newColumn.todos = newColumnTodos;
          newState.columns[todoIn.columnID - 1] = newColumn;
          newState.todos = newTodos;
          this.setState(newState);
  
          console.log(`Todo ${todoIn.todoID} deleted.`);
        }
      });
  };

  handleColumnCreate = (name) => {
    if (name === null | name === '') {
      return;
    }
    let newColumn = {
      "name": name,
    }
    fetch(this.state.columnsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newColumn),
    })
    .then(response => {
      if (!response.ok) {
        console.error('Network response was NOT ok');
      }
      else if (response.ok) {
        this.loadColumns();
        console.log('Column is created.');
      }
    });
  };

  handleColumnDelete = (columnID) => {
    fetch(`${this.state.columnsURL}/${columnID}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        console.error('Network response was NOT ok');
      }
      else if (response.ok) {
        const newState = {
          ...this.state,
        }
        columnID = parseInt(columnID);
        const newColumns = this.state.columns.filter((column) => column.columnID !== columnID);
        newState.columns = newColumns;
        this.setState(newState);
  
        console.log(`Column ${columnID} deleted.`);
      }
    });
  };

  componentDidMount() {
    this.loadColumns();
    this.loadTodos();
  };

  render () {
    if (!this.state.todosLoaded & !this.state.columnsLoaded) {
      return <div>Loading ... </div>;
    }
    
    return (
      <div>
        <Nav columns={this.state.columns} handleTodoCreate={this.handleTodoCreate} handleColumnCreate={this.handleColumnCreate}/>
        <MainGrid onDragEnd={this.onDragEnd} columns={this.state.columns} todos={this.state.todos} handleTodoDelete={this.handleTodoDelete} handleColumnDelete={this.handleColumnDelete} handleTodoUpdate={this.handleTodoUpdate}/>
      </div>
    );
  }
}
