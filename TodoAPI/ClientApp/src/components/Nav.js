import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialog: {
        color: '#263238',
        backgroundColor: '#cfd8dc',
     },
  }));

export default function Nav(props){
    const classes = useStyles();
    const [todo, setTodoOpen] = React.useState(false);
    const [column, setColumnOpen] = React.useState(false);

    const [titleField, setTitleField] = React.useState('')
    const [descriptionField, setDescriptionField] = React.useState('');
    const [dateField, setDateField] = React.useState('');
    const [columnField, setColumnField] = React.useState('1');
    const [columnNameField, setColumnName] = React.useState('');

    const handleTodoClickOpen = () => {
        setTodoOpen(true);
    };
    
    const handleTodoClose = () => {
        setTodoOpen(false);
    };

    const handleTodoSave = () => {
        props.handleTodoCreate(titleField, descriptionField, dateField, columnField);
        setTodoOpen(false);
    };

    const handleColumnClickOpen = () => {
        setColumnOpen(true);
    };

    const handleColumnClose = () => {
        setColumnOpen(false);
    };

    const handleColumnSave = () => {
        props.handleColumnCreate(columnNameField);
        setColumnOpen(false);
    };

    return(
        <div>
            <ul>
                <li><Button onClick={handleTodoClickOpen}>Create Todo</Button></li>
                <li><Button onClick={handleColumnClickOpen}>Create State</Button></li>
            </ul>
            <Dialog open={todo} onClose={handleTodoClose}>
                <Paper className={classes.dialog}>
                    <DialogTitle id="form-dialog-title">Create a Todo</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="standard-textarea"
                        className={classes.title}
                        label="Title"
                        type="text"
                        fullWidth
                        value={titleField}
                        onChange={(event) => setTitleField(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="textarea"
                        className={classes.description}
                        label="Description"
                        type="text"
                        fullWidth
                        value={descriptionField}
                        onChange={(event) => setDescriptionField(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date-picker-dialog"
                        type="datetime-local"
                        fullWidth
                        value={dateField}
                        onChange={(event) => setDateField(event.target.value)}
                    />
                    <TextField
                        id="state"
                        select
                        label="State"
                        helperText="Please select the state"
                        value={columnField}
                        onChange={(event) => setColumnField(event.target.value)}
                    >
                    {props.columns.map(column => (
                        <MenuItem key={column.columnID} value={column.columnID}>
                        {column.name}
                        </MenuItem>
                    ))}
                    </TextField>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleTodoClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleTodoSave}>
                        Save
                    </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
            <Dialog open={column} onClose={handleColumnClose}>
                <Paper className={classes.dialog}>
                    <DialogTitle id="form-dialog-title">Create a Column</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="textarea"
                            label="Column name"
                            type="text"
                            fullWidth
                            value={columnNameField}
                            onChange={(event) => setColumnName(event.target.value)}
                        />
                        <Button onClick={handleColumnClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleColumnSave}>
                            Save
                        </Button>
                    </DialogContent>
                </Paper>
            </Dialog>
        </div>
    );
}