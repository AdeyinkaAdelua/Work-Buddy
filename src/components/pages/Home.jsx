import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Pomodoro } from "./Pomodoro";

export const Home = () => {
  const [groupedTasks, setGroupedTasks] = useState({});
  const [groupedNotes, setGroupedNotes] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const tasksByCategory = {};
    storedTasks.forEach((task) => {
      if (task.category) {
        if (!tasksByCategory[task.category]) tasksByCategory[task.category] = [];
        tasksByCategory[task.category].push(task);
      }
    });

    Object.keys(tasksByCategory).forEach((category) => {
      tasksByCategory[category] = tasksByCategory[category]
        .filter(task => task.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3);
    });

    const notesByColor = {};
    storedNotes.forEach((note) => {
      if (note.color) {
        if (!notesByColor[note.color]) notesByColor[note.color] = [];
        notesByColor[note.color].push(note);
      }
    });

    Object.keys(notesByColor).forEach((color) => {
      notesByColor[color] = notesByColor[color].slice(0, 3);
    });

    setGroupedTasks(tasksByCategory);
    setGroupedNotes(notesByColor);
  }, []);

  return (
    <main className="home">
      <h1>Welcome to Your Productivity Hub</h1>
      <div className="quick-pick-container">

        {/* TASKS PREVIEW */}
        <div className="quick-pick-box">
  <Link to="/task"><h2>Tasks</h2></Link>
  {Object.keys(groupedTasks).length === 0 ? (
    <p>No tasks yet.</p>
  ) : (
    Object.entries(groupedTasks).map(([category, tasks]) => (
      <div key={category} className="preview-card-group">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="preview-card"
            style={{ backgroundColor: getColorByCategory(task.category) }}
          >
            <strong>{task.content || "Untitled Task"}</strong>
            <p>Due: {new Date(task.dueDate).toLocaleDateString("en-US")}</p>
            <p>Category: {task.category}</p>
          </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* POMODORO PREVIEW */}
       

        {/* NOTES PREVIEW */}
        <div className="quick-pick-box">
          <Link to="/notes"><h2>Notes</h2></Link>
          {Object.keys(groupedNotes).length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            Object.entries(groupedNotes).map(([color, notes]) => (
              <div key={color} className="preview-card-group">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="preview-card"
                    style={{ backgroundColor: note.color }}
                  >
                    {note.text.slice(0, 60)}...
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
};

// Map category to color
const getColorByCategory = (category) => {
  const map = {
    "Primary": "#e4d2cc",
    "Xetech": "#9b84c3",
    "Basecamp": "#ea9950",
    "Emails": "#e4d2cc",
    "Personal": "#A3C9A8",
  };
  return map[category] || "#fbf8f1";
};

// (Still used for grouping notes, even if not displaying label)
const getLabelByColor = (color) => {
  const colorMap = {
    "#e4d2cc": "Primary / Emails",
    "#9b84c3": "Xetech",
    "#ea9950": "Basecamp",
    "#A3C9A8": "Personal",
    "#fbf8f1": "Default",
  };
  return colorMap[color] || "Other";
};
