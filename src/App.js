import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app run we need to listen top the database and fetch the new todos as they added/removes
  useEffect(() => {
    // when the appjs load this fun will be fired
    db.collection("todos").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        todo: doc.data().todo
      })))
    })
  }, [])



  const addTodo = (event) => {
    // this fire off when we click the submite button
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input]);
    setInput('')
  }
  const classes = useStyles();
  return (
    <div className="App">
      <h1>A todo app using reactHook and firebase</h1>
      <form>
        <input id="standard-basic" label="Add todo task"
          value={input}
          onChange={event => setInput(event.target.value)}
          required
        />
        <Button disabled={!input} onClick={addTodo}  type='submit'variant="contained" color="primary" disableElevation>
          Add new task </Button>

      </form>
      {todos.map(todo => (
        // <li>{todo}</li>
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default App;





const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));