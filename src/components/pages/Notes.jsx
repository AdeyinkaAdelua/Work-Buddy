import React, { useState, useEffect } from "react";
import './Notes.css';

export const Notes = () => {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [newNote, setNewNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#fbf8f1");

  const colorOptions = [
    { label: "Primary", value: "#e4d2cc" },
    { label: "Xetech", value: "#9b84c3" },
    { label: "Basecamp", value: "#ea9950" },
    { label: "Emails", value: "#e4d2cc" },
    { label: "Personal", value: "#A3C9A8" },
  ];

  // Load notes on mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes on change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      const newNoteObj = {
        text: newNote,
        color: selectedColor,
        id: Date.now() + Math.random().toString(36).substring(2),
      };
      setNotes([...notes, newNoteObj]);
      setNewNote("");
    }
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setNewNote(notes[index].text);
    setSelectedColor(notes[index].color);
  };

  const handleSaveNote = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [...notes];
      updatedNotes[editIndex].text = newNote;
      updatedNotes[editIndex].color = selectedColor;
      setNotes(updatedNotes);
      setNewNote("");
      setEditIndex(null);
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <section className="notes-section">
      <h3>Notes</h3>
      <div className="note-input">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
        />
        <div className="color-picker">
          <label>Select Category:</label>
          <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {editIndex === null ? (
          <button onClick={handleAddNote}>Add Note</button>
        ) : (
          <button onClick={handleSaveNote}>Save Note</button>
        )}
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note, index) => (
            <div key={note.id} className="note-item" style={{ backgroundColor: note.color }}>
              <p>{note.text}</p>
              <div className="note-actions">
                <button className="edit-button" onClick={() => handleEditNote(index)}>Edit</button>
                <button className="delete" onClick={() => handleDeleteNote(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
