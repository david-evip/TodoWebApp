import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DragDropContext } from 'react-beautiful-dnd';
import Category from './Category';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    title: {
      fontSize: '24px',
    },
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 0px rgba(120, 144, 156, 1)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(120, 144, 156, 1)',
          outline: 'none'
        }
      }
}));

export default function MainGrid(props) {
    const classes = useStyles();

    const handleDelete = (event, columnID) => {
      props.handleColumnDelete(columnID);
    };

    return (
        <div>
            <Grid className={classes.root}>
                <DragDropContext
                    onDragEnd={props.onDragEnd}
                >
                    {props.columns.map(column => {                      
                      
                    return (
                        <div key={column.columnID} style={{ margin: '5px'}}>
                            <p className={classes.title}>
                                {column.name}
                                <Button onClick={(event) => handleDelete(event, column.columnID)} id={column.columnID}>delete</Button>
                            </p>
                            <Category key={column.columnID} column={column} todos={column.todos} handleTodoDelete={props.handleTodoDelete} handleTodoUpdate={props.handleTodoUpdate}/>
                        </div>
                    );
                })}
              </DragDropContext>
            </Grid>
        </div>
    );
}