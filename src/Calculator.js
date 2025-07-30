import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [showSci, setShowSci] = useState(false);

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => { setInput(""); setResult(""); };
  const handleDelete = () => setInput((prev) => prev.slice(0, -1));
  const toggleDark = () => setDarkMode(!darkMode);
  const toggleSci = () => setShowSci(!showSci);

  const handleEquals = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
      setHistory([`${input} = ${evalResult}`, ...history.slice(0, 4)]);
    } catch {
      setResult("Error");
    }
  };

  const handleSci = (func) => {
    try {
      let val = eval(input);
      let sciResult = 0;
      if (func === "sin") sciResult = Math.sin(val);
      else if (func === "cos") sciResult = Math.cos(val);
      else if (func === "tan") sciResult = Math.tan(val);
      else if (func === "log") sciResult = Math.log10(val);
      else if (func === "√") sciResult = Math.sqrt(val);
      else if (func === "x²") sciResult = Math.pow(val, 2);
      setResult(sciResult.toFixed(6));
      setHistory([`${func}(${val}) = ${sciResult}`, ...history.slice(0, 4)]);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <div className="bg-blobs" />

      <div className="calc-wrapper">
        {/* Calculator Section */}
        <div className="calculator glass">
          <div className="top-bar">
            <h2>🧮 iCalc</h2>
            <div>
              <button onClick={toggleSci}>📐</button>
              <button onClick={toggleDark}>{darkMode ? "☀️" : "🌙"}</button>
            </div>
          </div>

          <div className="display terminal-style">
            <div>{input || "0"}</div>
            <div className="result">= {result || "0"}</div>
          </div>

          {showSci && (
            <div className="sci-buttons">
              {["sin", "cos", "tan", "log", "√", "x²"].map((btn) => (
                <button key={btn} onClick={() => handleSci(btn)}>{btn}</button>
              ))}
            </div>
          )}

          <div className="buttons">
            {["7", "8", "9", "/", "C",
              "4", "5", "6", "*", "⌫",
              "1", "2", "3", "-", "+",
              "0", ".", "=", ""].map((btn, idx) => {
              if (btn === "C") return <button key={idx} onClick={handleClear}>C</button>;
              if (btn === "⌫") return <button key={idx} onClick={handleDelete}>⌫</button>;
              if (btn === "=") return <button key={idx} onClick={handleEquals}>=</button>;
              if (btn === "") return <div key={idx}></div>;
              return <button key={idx} onClick={() => handleClick(btn)}>{btn}</button>;
            })}
          </div>
        </div>

        {/* History Section */}
        <div className="glass history-glass">
          <h4>🕒 History</h4>
          <ul>
            {history.map((h, i) => (
              <li key={i} onClick={() => setInput(h.split(" = ")[0])}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
