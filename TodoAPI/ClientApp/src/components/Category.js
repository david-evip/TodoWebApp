import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
    category: {
      width: 300,
      height: 700,
      overflowY: 'scroll',
      backgroundColor: '#37474f',
      padding: 5,
    },
    title: {
        color: 'white',
    }
  }));

function Category(props){
    const classes = useStyles();

    return (
            <Droppable droppableId={'id-' + props.column.columnID}>
            {(provided) => (
                <Grid 
                    className={classes.category} 
                    innerRef={provided.innerRef} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    {props.todos.map((todo, index) => (
                        <Card key={todo.todoID} todo={todo} index={index} handleTodoDelete={props.handleTodoDelete} handleTodoUpdate={props.handleTodoUpdate}/>
                    ))}
                    {provided.placeholder}
                </Grid>
            )}
            </Droppable>
    );
}

export default Category;