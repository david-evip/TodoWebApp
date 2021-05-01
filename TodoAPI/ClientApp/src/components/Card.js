import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    card: {
      minWidth: 275,
      backgroundColor: '#546e7a',
      color: 'white',
      marginTop: 5,
    },
    title: {
      fontSize: 14,
      color: 'inherit',
    },
    content: {
        fontSize: 12,
        colo: 'inherit',
    },
    pos: {
      marginBottom: 12,
      color: 'inherit',
    },
    dialog: {
        backgroundColor: '#cfd8dc',
    },
  }));

function Todo(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [textTitle, setTextTitle] = React.useState(props.todo.title);
    const [textDescription, setTextDescription] = React.useState(props.todo.description);
    const [dateDeadline, setDateDeadline] = React.useState(new Date(props.todo.deadline).toISOString().substr(0, 16));

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        props.handleTodoDelete(props.todo);
        handleClose();
    };

    const handleUpdate = () => {
        let newTodo = props.todo;
        newTodo.title = textTitle; newTodo.description = textDescription; newTodo.deadline = dateDeadline;
        props.handleTodoUpdate(props.todo);
        handleClose();
    };

    return (
        <Draggable draggableId={'id-' + props.todo.todoID} index={props.index}>
            {(provided) => (
                <Card 
                className={classes.card}
                variant="outlined"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
                ref={provided.innerRef}
                >
                    <CardContent>
                        <Typography className={classes.title} gutterBottom>
                            {props.todo.title}
                        </Typography>
                        <Typography className={classes.content}>
                            {props.todo.description}
                            <br/>
                            {dateDeadline.substr(0, 10)}
                            <br/>
                            {dateDeadline.substr(11, 16)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" className={classes.button} onClick={handleClickOpen}>Edit</Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <Paper className={classes.dialog}>
                                <DialogTitle id="form-dialog-title">Task</DialogTitle>
                                <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Title"
                                    type="text"
                                    value={textTitle}
                                    onChange={(event) => setTextTitle(event.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Description"
                                    type="text"
                                    value={textDescription}
                                    onChange={(event) => setTextDescription(event.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="deadline"
                                    type="datetime-local"
                                    defaultValue={dateDeadline}
                                    onChange={(event) => setDateDeadline(event.target.value)}
                                    fullWidth
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdate} color="primary">
                                    Save
                                </Button>
                                <Button onClick={handleDelete} color="primary">
                                    Remove
                                </Button>
                                </DialogActions>
                            </Paper>
                        </Dialog>
                        <Typography className={classes.id} variant="caption">
                            id: {props.todo.todoID}
                        </Typography>
                    </CardActions>
                </Card>
            )}
        </Draggable>
    );
}

export default Todo;