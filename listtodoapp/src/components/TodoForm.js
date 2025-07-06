import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const PRIORITIES = ["High", "Medium", "Low"];
const CATEGORIES = ["Work", "Personal", "Health", "Other"];

export const TodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Work');
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    React.useEffect(() => {
      inputRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
          setWarning('Please enter a title!');
          return;
        }
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, due, priority, category })
          });
          if (!response.ok) throw new Error("Failed to add task");
          setTitle('');
          setDescription('');
          setDue('');
          setPriority('Medium');
          setCategory('Work');
          setWarning('');
          setSuccess('Task added!');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
          window.dispatchEvent(new Event('taskAdded'));
        } catch (err) {
          setWarning('Failed to add task. Please try again.');
        }
    };
  return (
    <form onSubmit={handleSubmit} className="TodoForm add-task-fields-bee">
      <input
        type="text"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setWarning(''); }}
        className="todo-input"
        placeholder="What's the Buzz?"
        ref={inputRef}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
        placeholder="Bee Brief"
        style={{marginTop: '0.5rem'}}
      />
      <input
        type="datetime-local"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="todo-input"
        style={{marginTop: '0.5rem'}}
      />
      <select value={priority} onChange={e => setPriority(e.target.value)} className="todo-input">
        {PRIORITIES.map(p => <option key={p} value={p}>{p} Priority</option>)}
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)} className="todo-input">
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button type="submit" className='add-task-btn-bee' style={{marginTop: '0.5rem'}}>Add Buzz</button>
      {warning && <div style={{color: '#ffb3b3', marginTop: '0.5rem'}}>{warning}</div>}
      {success && <div style={{color: '#27ae60', marginTop: '0.5rem'}}>{success}</div>}
    </form>
  )
}