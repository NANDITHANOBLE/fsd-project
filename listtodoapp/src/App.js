import './App.css';
import React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import { EditTodoForm } from "./components/EditTodoForm";
import AgeSelection from "./components/AgeSelection";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Task not found");
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError("Task not found or you do not have access.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleEdit = async (updated, taskId) => {
    setEditLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
      if (!response.ok) throw new Error("Failed to update task");
      const data = await response.json();
      setTask(data);
      setShowEdit(false);
    } catch (err) {
      alert("Failed to update task");
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 40, fontSize: 24 }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, fontSize: 24, color: '#e74c3c' }}>{error}</div>;
  if (!task) return null;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: 'rgba(255,255,255,0.97)', borderRadius: 20, boxShadow: '0 4px 24px #ffd60044', padding: '2.5rem', position: 'relative' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: 20, background: '#ffd600', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>← Back to Dashboard</button>
      <button onClick={() => setShowEdit(true)} style={{ position: 'absolute', top: 30, right: 30, background: '#ff9800', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Edit</button>
      <h2 style={{ fontSize: '2rem', marginBottom: 10 }}>{task.title}</h2>
      <div style={{ marginBottom: 10, color: '#666' }}>{task.description}</div>
      <div style={{ marginBottom: 10 }}><b>Due:</b> {task.due ? new Date(task.due).toLocaleString() : 'N/A'}</div>
      <div style={{ marginBottom: 10 }}><b>Priority:</b> {task.priority || 'Medium'}</div>
      <div style={{ marginBottom: 10 }}><b>Status:</b> {task.status || 'To Do'}</div>
      <div style={{ marginBottom: 10 }}><b>Category:</b> {task.category || 'Work'}</div>
      {showEdit && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px #ffd60044', position: 'relative' }}>
            <button onClick={() => setShowEdit(false)} style={{ position: 'absolute', top: 10, right: 10, background: '#ffd600', border: 'none', borderRadius: 8, padding: '0.2rem 0.8rem', fontWeight: 700, cursor: 'pointer' }}>✕</button>
            <h3 style={{ marginBottom: 16 }}>Edit Task</h3>
            <EditTodoForm editTodo={handleEdit} task={{ ...task, id: task._id }} />
            {editLoading && <div style={{ color: '#888', marginTop: 10 }}>Saving...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/age-selection" element={<AgeSelection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task/:id" element={<TaskDetail />} />
      <Route path="*" element={<Login />} /> {/* Default to login */}
    </Routes>
  );
}

export default App;
