import React, { useState } from 'react'
import { List, ListItem, ListItemText, Button, Modal, Icon } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit'
import db from './firebase';



export default function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [modalStyle] = useState(getModalStyle);

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        // close the modal after saving update
        setOpen(false)
    }

    const classes = useStyles();

    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                PaperProps={{
                    style: {
                        background: "green"
                    }
                }}
            >
                <div className={classes.paper} style={modalStyle}>
                    <h1>Edite the task</h1>
                    <textarea value={input} placeholder={props.todo.todo} onChange={e => setInput(e.target.value)} /><br />
                    <Button variant="contained" color="primary" size="small" className={classes.button}
                        disabled={!input}
                        startIcon={<SaveIcon />}
                        onClick={updateTodo}
                    >
                        Save
                    </Button>
                </div>

            </Modal>
            <List className="todo__list">
                <ListItem>
                    <ListItemText>{props.todo.todo}</ListItemText>
                    <Button variant="contained" color="primary" size="small" className={classes.button}
                        startIcon={<EditIcon />}
                        onClick={e => setOpen(true)}                        >
                        Edit
                    </Button> &nbsp;&nbsp;
                    <Button variant="contained" color="secondary" size="small" className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={event => { db.collection('todos').doc(props.todo.id).delete() }}
                    >
                        Delete
                    </Button>
                </ListItem>
                <hr />

            </List>
        </>
    )
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}