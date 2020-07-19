import React, { useState } from 'react'
import { List, ListItem, ListItemText, Button, Modal,TextField } from '@material-ui/core';
import './todo.css'
import db from './firebase';

export default function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
      todo:input
        }, {merge: true})
    }
    const handleOpen = () => {
        setOpen(true)
    }
    console.log(props.todo.id)
    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div style={{ backgroundColor: '#733302', padding:'10px' }}>
                    <h1>Edite the task</h1>
                    <textarea value={input} placeholder={props.todo.todo}  onChange={e => setInput(e.target.value)}/>
                    <Button onClick={updateTodo} className="btn-primay">Update</Button>
                </div> 

            </Modal>
            <List className="todo__list">
                <ListItem>
                    <ListItemText>{props.todo.todo}</ListItemText>
                    <Button onClick={e => setOpen(true)}>Edit</Button>
                    <Button onClick={event => { db.collection('todos').doc(props.todo.id).delete() }}>Delete</Button>
                </ListItem>

            </List>
        </>
    )
}
