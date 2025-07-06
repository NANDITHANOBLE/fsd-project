import React from 'react'
import { motion } from 'framer-motion'

const PRIORITY_EMOJIS = { High: "🔥", Medium: "⚡", Low: "🌱" };
const STATUS_EMOJIS = { "To Do": "🕒", "In Progress": "🚧", "Completed": "✅", "Overdue": "⏰" };

export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  const isOverdue = !task.completed && task.due && new Date(task.due) < new Date();
  const status = isOverdue ? "Overdue" : (task.status || (task.completed ? "Completed" : "To Do"));
  return (
    <motion.div
      className={`Todo-wide priority-${task.priority?.toLowerCase()} status-${status.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      style={{ display: 'flex', alignItems: 'center', background: '#f6faff', borderRadius: 14, margin: '0.7rem 0', padding: '1.2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', width: '100%' }}
    >
      <div style={{flex:1}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>{STATUS_EMOJIS[status]}</span>
          <span
            className={`${task.completed ? "completed" : "incompleted"}`}
            onClick={() => toggleComplete(task.id)}
            style={{fontWeight:'bold', fontSize:'1.1rem', cursor: 'pointer'}}
          >
            {task.title}
          </span>
          {task.priority && (
            <span className="priority-emoji-wide" title={task.priority} style={{ marginLeft: 8, fontSize: 18 }}>
              {PRIORITY_EMOJIS[task.priority]}
            </span>
          )}
        </div>
        {task.description && (
          <div style={{fontSize:'0.95rem', color:'#6c757d', marginTop:'0.2rem'}}>{task.description}</div>
        )}
        {task.due && (
          <div style={{fontSize:'0.85rem', color:'#90e0ef', marginTop:'0.2rem'}}>
            Due: {new Date(task.due).toLocaleString()}
          </div>
        )}
        {task.category && (
          <div style={{fontSize:'0.8rem', color:'#b2bec3', marginTop:'0.2rem'}}>Category: {task.category}</div>
        )}
        <div style={{fontSize:'0.8rem', color:'#636e72', marginTop:'0.2rem'}}>Status: {status}</div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="icon-btn-wide" title="Edit" onClick={() => editTodo(task.id)}>58a</button>
        <button className="icon-btn-wide" title="Delete" onClick={() => deleteTodo(task.id)}>5d1</button>
      </div>
    </motion.div>
  )
}