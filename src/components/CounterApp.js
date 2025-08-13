import React, { useEffect, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ToggleSwitch from "./ToggleSwitch";

export default function CounterApp() {
  // persistent state
  const [count, setCount] = useLocalStorage("count", 0);
  const [step, setStep] = useLocalStorage("step", 1);
  const [lower, setLower] = useLocalStorage("lower", 0);
  const [upper, setUpper] = useLocalStorage("upper", 10);
  const [allowNegative, setAllowNegative] = useLocalStorage("allowNegative", false);

  // ensure invariants when toggles/inputs change
  useEffect(() => {
    // clamp bounds if they cross
    if (lower > upper) {
      // prefer expanding upper if user raised lower too high
      setUpper(lower);
    }
  }, [lower, upper, setUpper]);

  useEffect(() => {
    // if negatives not allowed, push lower to 0
    if (!allowNegative && lower < 0) setLower(0);
  }, [allowNegative, lower, setLower]);

  // clamp count inside bounds whenever bounds change
  useEffect(() => {
    setCount((c) => Math.min(Math.max(c, lower), upper));
  }, [lower, upper, setCount]);

  const canDecrement = useMemo(() => count - step >= lower, [count, step, lower]);
  const canIncrement = useMemo(() => count + step <= upper, [count, step, upper]);

  const nearLower = useMemo(() => (upper === lower ? false : (count - lower) / (upper - lower) <= 0.15), [count, lower, upper]);
  const nearUpper = useMemo(() => (upper === lower ? false : (upper - count) / (upper - lower) <= 0.15), [count, lower, upper]);

  function onIncrement() {
    if (canIncrement) setCount((c) => c + step);
  }
  function onDecrement() {
    if (canDecrement) setCount((c) => c - step);
  }
  function onReset() {
    setCount(0);
    if (!allowNegative && lower < 0) setLower(0);
  }

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key === "+" || e.key === "=") onIncrement();
      if (e.key === "-" || e.key === "_") onDecrement();
      if (e.key.toLowerCase() === "r") onReset();
      if (e.key === "ArrowUp") setStep((s) => Math.max(1, s + 1));
      if (e.key === "ArrowDown") setStep((s) => Math.max(1, s - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canIncrement, canDecrement]); // handlers capture latest booleans

  // progress between bounds (0..100)
  const progress = useMemo(() => {
    if (upper === lower) return 100;
    const pct = ((count - lower) * 100) / (upper - lower);
    return Math.min(100, Math.max(0, pct));
  }, [count, lower, upper]);

  return (
    <main className="container">
      <header className="header">
        <h1>Counter App</h1>
        <p className="subtitle">React + localStorage • smooth UI • bounds & steps</p>
      </header>

      <section className="panel grid-2">
        <div className="card">
          <h2 className="card-title">Counter</h2>

          <div
            className={[
              "counter-display",
              nearLower ? "warn-low" : "",
              nearUpper ? "warn-high" : "",
            ].join(" ")}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {count}
          </div>

          <div className="button-row">
            <button
              className="btn"
              onClick={onDecrement}
              disabled={!canDecrement}
              aria-disabled={!canDecrement}
              title={canDecrement ? `- ${step}` : "Lower bound reached"}
            >
              −
            </button>
            <button
              className="btn"
              onClick={onReset}
              title="Reset (r)"
            >
              Reset
            </button>
            <button
              className="btn"
              onClick={onIncrement}
              disabled={!canIncrement}
              aria-disabled={!canIncrement}
              title={canIncrement ? `+ ${step}` : "Upper bound reached"}
            >
              +
            </button>
          </div>

          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="hint">
            {lower} to {upper} • step {step}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Controls</h2>

          <div className="form-row">
            <label htmlFor="step">Step size</label>
            <input
              id="step"
              type="number"
              min="1"
              step="1"
              value={step}
              onChange={(e) => {
                const v = Math.max(1, Number(e.target.value || 1));
                setStep(v);
              }}
            />
          </div>

          <div className="form-row">
            <label htmlFor="lower">Lower bound</label>
            <input
              id="lower"
              type="number"
              value={lower}
              onChange={(e) => setLower(Number(e.target.value || 0))}
            />
          </div>

          <div className="form-row">
            <label htmlFor="upper">Upper bound</label>
            <input
              id="upper"
              type="number"
              value={upper}
              onChange={(e) => setUpper(Number(e.target.value || 0))}
            />
          </div>

          <div className="form-row toggle-row">
            <span>Allow negative values</span>
            <ToggleSwitch
              checked={allowNegative}
              onChange={(v) => setAllowNegative(v)}
            />
          </div>

          {!allowNegative && lower < 0 && (
            <p className="note">Negative values disabled — lower bound set to 0.</p>
          )}

          {upper < lower && (
            <p className="error">Upper bound must be ≥ lower bound.</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>
          Tips: use <kbd>+</kbd>/<kbd>-</kbd> to change, <kbd>r</kbd> to reset, <kbd>↑</kbd>/<kbd>↓</kbd> to adjust step.
        </p>
      </footer>
    </main>
  );
}
