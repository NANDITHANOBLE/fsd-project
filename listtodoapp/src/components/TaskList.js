import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PRIORITY_EMOJIS = { High: "🔥", Medium: "⚡", Low: "🌱" };
const STATUS_EMOJIS = { "To Do": "🕒", "In Progress": "🚧", "Completed": "✅", "Overdue": "⏰" };

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("authToken");
    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const handleStatusToggle = async (task) => {
    const token = localStorage.getItem("authToken");
    let updatedStatus = "Completed";
    if (task.status === "Completed") updatedStatus = "To Do";
    else if (task.status === "To Do") updatedStatus = "In Progress";
    else if (task.status === "In Progress") updatedStatus = "Completed";
    await fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: updatedStatus })
    });
    fetchTasks();
  };

  useEffect(() => { 
    fetchTasks(); 
    // Listen for the custom event and re-fetch tasks
    const handleTaskAdded = () => fetchTasks();
    window.addEventListener('taskAdded', handleTaskAdded);
    return () => window.removeEventListener('taskAdded', handleTaskAdded);
  }, []);

  useEffect(() => {
    const notifyDueTasks = () => {
      const today = new Date().toISOString().split("T")[0];
      tasks.forEach(task => {
        const taskDate = new Date(task.due).toISOString().split("T")[0];
        if (taskDate === today && task.status !== "Completed") {
          if (Notification.permission === "granted") {
            new Notification(`Reminder: ${task.title}`, { body: `Due today (${task.priority})` });
          }
        }
      });
    };
    if (Notification.permission !== "granted") { Notification.requestPermission(); }
    notifyDueTasks();
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const priorityMatch = priorityFilter === "All" || task.priority === priorityFilter;
    const searchMatch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  });

  const priorities = ["High", "Medium", "Low"];
  return (
    <div className="task-list-container-bee">
      <div className="task-list-controls-bee">
        <h2
          className="task-list-title-bee"
          style={{
            fontWeight: 800,
            fontSize: 28,
            background: 'linear-gradient(90deg, #ff9800 10%, #ffd600 50%, #ff6f00 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'bounceBee 1.8s infinite',
            textAlign: 'center',
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >🐝 Bee Busy Board</h2>
        <style>{`
          @keyframes bounceBee {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(-8px) scale(1.05); }
            40% { transform: translateY(0); }
            60% { transform: translateY(-4px) scale(1.03); }
            80% { transform: translateY(0); }
          }
        `}</style>
        <div className="filters-bee">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select-bee">
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="filter-select-bee">
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <form className="task-search-bee" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} onSubmit={e => { e.preventDefault(); }}>
            <FaSearch className="search-icon-bee" style={{ color: '#ffb300', fontSize: '1.3rem' }} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="task-search-input-bee"
              style={{ border: '2px solid #ffd600', borderRadius: 8, background: '#fffbe6', color: '#222', fontWeight: 600 }}
            />
            <button type="submit" style={{ background: 'linear-gradient(90deg, #ffd600 0%, #ff9800 100%)', border: 'none', borderRadius: 8, padding: '0.4rem 1rem', color: '#222', fontWeight: 700, cursor: 'pointer', marginLeft: 2 }} title="Search">🔍</button>
          </form>
        </div>
      </div>
      {filteredTasks.length === 0 ? (
        <p className="no-tasks-bee">No tasks found. Start by creating one!</p>
      ) : (
        <div>
          {priorities.map(priority => {
            const group = filteredTasks.filter(task => task.priority === priority);
            if (group.length === 0) return null;
            return (
              <div key={priority} style={{ marginBottom: 24 }}>
                <h3 style={{
                  color: '#d84315',
                  fontWeight: 700,
                  fontSize: 22,
                  margin: '18px 0 10px 0',
                  letterSpacing: 1.2,
                  textShadow: '1px 1px 2px #ffd60055',
                  display: 'flex', alignItems: 'center', gap: 8
                }}>
                  {priority} Priority
                  <span style={{ fontSize: 20 }}>{PRIORITY_EMOJIS[priority]}</span>
                </h3>
                <ul className="task-list-bee">
                  <AnimatePresence>
                    {group.map((task) => {
                      const isOverdue = task.status !== "Completed" && new Date(task.due) < new Date();
                      const status = isOverdue ? "Overdue" : (task.status || "To Do");
                      return (
                        <motion.li
                          key={task._id}
                          className={`task-card-bee priority-${priority.toLowerCase()} status-${status.toLowerCase()}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          layout
                          onClick={(e) => {
                            if (e.target.closest(".icon-btn-bee")) return;
                            navigate(`/task/${task._id}`);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="task-header-bee">
                            <span className="status-emoji-bee">{STATUS_EMOJIS[status] || "🕒"}</span>
                            <div className="task-title-bee">
                              <strong style={{ textDecoration: status === "Completed" ? "line-through" : "none" }}>
                                {task.title}
                              </strong>
                              <span className="priority-emoji-bee" title={priority}>
                                {PRIORITY_EMOJIS[priority] || "⚡"}
                              </span>
                            </div>
                          </div>
                          <p className="task-desc-bee">{task.description}</p>
                          <div className="task-meta-bee">
                            <span>Status: {status}</span>
                            <span>Due: {task.due ? new Date(task.due).toLocaleDateString() : "N/A"}</span>
                          </div>
                          <div className="task-actions-bee">
                            <button className="icon-btn-bee" title="Edit" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>✏️</button>
                            <button className="icon-btn-bee" title="Delete" onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }}>🗑️</button>
                            <button className="icon-btn-bee" title="Toggle Status" onClick={(e) => { e.stopPropagation(); handleStatusToggle(task); }}>{STATUS_EMOJIS[status] || "🕒"}</button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList; 