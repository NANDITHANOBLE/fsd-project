import React, {useState} from 'react'
import { AnimatedFlower } from './Flower';
import BeeMascot from './BeeMascot';

const PRIORITIES = ["High", "Medium", "Low"];
const CATEGORIES = ["Work", "Personal", "Health", "Other"];

export const EditTodoForm = ({editTodo, task}) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [due, setDue] = useState(task.due || '');
    const [priority, setPriority] = useState(task.priority || 'Medium');
    const [category, setCategory] = useState(task.category || 'Work');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo({ title, description, due, priority, category }, task.id);
        setSuccess('Task updated! 🐝🌸');
        window.dispatchEvent(new Event('taskUpdated'));
        setTimeout(() => setSuccess(''), 1500);
    };
  return (
    <form onSubmit={handleSubmit} className="TodoForm add-task-fields-bee" style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
      {/* Decorative bee and flower */}
      <div style={{ position: 'absolute', left: -60, top: -30 }}>
        <BeeMascot size={40} />
      </div>
      <div style={{ position: 'absolute', right: -60, top: -30 }}>
        <AnimatedFlower size={40} />
      </div>
      <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 24, boxShadow: "0 4px 24px #ffd60044", padding: "2.5rem 2rem", minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          marginBottom: 16,
          fontWeight: 800,
          fontSize: 28,
          background: 'linear-gradient(90deg, #ff9800 10%, #ffd600 50%, #ff6f00 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'bounceBee 1.8s infinite',
          textAlign: 'center',
          letterSpacing: 1.5,
        }}>Edit Task</h2>
        <style>{`
          @keyframes bounceBee {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(-8px) scale(1.05); }
            40% { transform: translateY(0); }
            60% { transform: translateY(-4px) scale(1.03); }
            80% { transform: translateY(0); }
          }
        `}</style>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
          placeholder='Task title (required)'
          style={{ flex: 1 }}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="todo-input"
          placeholder='Description (optional)'
          style={{ flex: 1 }}
        />
        <input
          type="datetime-local"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="todo-input"
          style={{ flex: 1 }}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
        <select value={priority} onChange={e => setPriority(e.target.value)} className="todo-input" style={{ flex: 1 }}>
          {PRIORITIES.map(p => <option key={p} value={p}>{p} Priority</option>)}
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)} className="todo-input" style={{ flex: 1 }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
        <button type="submit" className='add-task-btn-bee' style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 160, justifyContent: 'center' }}>
          <AnimatedFlower size={24} />
          Update Task
          <BeeMascot size={24} />
        </button>
      </div>
      {success && <div style={{color: '#27ae60', marginTop: '0.5rem', fontWeight: 600, textAlign: 'center'}}>{success}</div>}
    </form>
  )
}