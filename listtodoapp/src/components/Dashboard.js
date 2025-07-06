import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TodoForm } from "./TodoForm";
import TaskList from "./TaskList";
import { EditTodoForm } from "./EditTodoForm";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import BeeMascot, { FlyingBee } from "./BeeMascot";
import BeeAvatar, { getBeeRole } from "./BeeAvatar";
import BeeHive from "./BeeHive";
import Flower, { AnimatedFlower } from "./Flower";
import "./Dashboard.css";

const Dashboard = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [toast, setToast] = useState("");
  const [userAge, setUserAge] = useState(() => Number(localStorage.getItem("userAge")) || null);
  const [toolAnim, setToolAnim] = useState(false);

  // Auth check: redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    // Redirect to age selection if age is not set
    if (!localStorage.getItem("userAge")) {
      navigate("/age-selection");
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      window.history.replaceState({}, document.title, "/dashboard");
    }
    if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Welcome to Taskify!", {
            body: "Let's conquer your day, one task at a time! 🐝",
          });
        }
      });
    }
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  const handleSave = async (updatedTask, id) => {
    const token = localStorage.getItem("authToken");
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedTask)
    });
    setShowEditModal(false);
    setToast("Task updated! 🎉");
    setTimeout(() => setToast(""), 2000);
    window.dispatchEvent(new Event('taskUpdated'));
  };

  const handleToolClick = () => {
    setToolAnim(true);
    setToast("Keep building, Builder Bee! 🐝✨");
    setTimeout(() => setToast(""), 2000);
    setTimeout(() => setToolAnim(false), 700);
  };

  const { greeting, role } = getBeeRole(userAge);

  return (
    <div className="dashboard-bg-bee">
      {/* Flying bee animation */}
      <FlyingBee size={54} style={{ top: 30 }} />
      {/* More animated flowers for a lively effect */}
      <div style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 1 }}>
        <AnimatedFlower size={48} />
      </div>
      <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1 }}>
        <AnimatedFlower size={54} />
      </div>
      <div style={{ position: 'fixed', right: 40, top: 40, zIndex: 1 }}>
        <AnimatedFlower size={40} />
      </div>
      {/* More flowers for extra playfulness */}
      <div style={{ position: 'fixed', left: 60, top: 80, zIndex: 1 }}>
        <AnimatedFlower size={36} />
      </div>
      <div style={{ position: 'fixed', right: 80, top: 120, zIndex: 1 }}>
        <AnimatedFlower size={32} />
      </div>
      <div style={{ position: 'fixed', left: 120, bottom: 80, zIndex: 1 }}>
        <AnimatedFlower size={28} />
      </div>
      <div style={{ position: 'fixed', right: 120, bottom: 120, zIndex: 1 }}>
        <AnimatedFlower size={38} />
      </div>
      <motion.header
        className="dashboard-header-bee"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        {/* Decorative BeeHive in top left */}
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
          <BeeHive size={54} />
        </div>
        <div className="dashboard-title-section">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
          >
            <BeeMascot size={60} />
          </motion.div>
          {/* Extra bee mascot for fun */}
          <BeeMascot size={36} style={{ marginLeft: 8, marginRight: -8, filter: 'drop-shadow(0 2px 4px #ffd60088)' }} />
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="dashboard-title-bee"
          >
            Taskify
          </motion.h1>
        </div>
        <p className="dashboard-desc-bee">
          Your Hive for Getting Things Done 🐝
        </p>
        <div className="dashboard-user-bee">
          <motion.div
            animate={{ y: [0, -8, 0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            style={{ display: 'inline-block' }}
          >
            <BeeAvatar age={userAge} size={40} />
          </motion.div>
          <span className="user-role-bee">{role}</span>
          <motion.button
            whileHover={{ scale: 1.08, backgroundColor: "#e74c3c", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            className="logout-btn-bee"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      </motion.header>
      <motion.main
        className="dashboard-main-bee"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <motion.div
          className="bee-greeting"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="greeting-text">{greeting}</h2>
        </motion.div>
        {/* Animated Flower near add task form */}
        <div style={{ position: 'absolute', left: 30, top: '38%', zIndex: 1 }}>
          <AnimatedFlower size={54} />
        </div>
        <div className="add-task-card-bee">
          <TodoForm />
        </div>
        <div className="task-list-panel-bee">
          <TaskList onEdit={handleEdit} />
        </div>
      </motion.main>
      {showEditModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px #ffd60044', position: 'relative' }}>
            <button onClick={() => setShowEditModal(false)} style={{ position: 'absolute', top: 10, right: 10, background: '#ffd600', border: 'none', borderRadius: 8, padding: '0.2rem 0.8rem', fontWeight: 700, cursor: 'pointer' }}>✕</button>
            <h3 style={{ marginBottom: 16 }}>Edit Task</h3>
            <EditTodoForm editTodo={handleSave} task={editTask} />
          </div>
        </div>
      )}
      {toast && (
        <motion.div 
          className="toast-bee"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard; 