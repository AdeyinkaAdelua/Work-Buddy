import React, { useState, useEffect } from "react";
import "./Task.css";
import "./Pomodoro.css";

export const Pomodoro = () => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            alert("Time's up!");
            switchMode(mode === "pomodoro" ? "short-break" : "pomodoro");
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    switch (newMode) {
      case "pomodoro":
        setTimeRemaining(25 * 60);
        break;
      case "short-break":
        setTimeRemaining(5 * 60);
        break;
      case "long-break":
        setTimeRemaining(15 * 60);
        break;
      default:
        break;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-wrapper">
      <section className="pomodoro-timer">
        <h3>Pomodoro Timer</h3>
        <div className="timer-display">
          <span id="timer">{formatTime(timeRemaining)}</span>
        </div>
        <div className="timer-controls">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={() => switchMode(mode)}>Reset</button>
        </div>
        <div className="timer-mode">
          <label>
            <input
              type="radio"
              name="mode"
              value="pomodoro"
              checked={mode === "pomodoro"}
              onChange={() => switchMode("pomodoro")}
            />
            Pomodoro (25 min)
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="short-break"
              checked={mode === "short-break"}
              onChange={() => switchMode("short-break")}
            />
            Short Break (5 min)
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="long-break"
              checked={mode === "long-break"}
              onChange={() => switchMode("long-break")}
            />
            Long Break (15 min)
          </label>
        </div>
  
        <div className="spotify-embed">
          <iframe
            id="spotify"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            src="https://open.spotify.com/embed/playlist/4Zjli1P13J5mmSCD5iKAXK?theme=0"
            title="Spotify Lofi Playlist"
          ></iframe>
        </div>
      </section>
    </div>
  );
  
};
