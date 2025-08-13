import React from "react";

export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={["toggle", checked ? "on" : "off"].join(" ")}
      onClick={() => onChange(!checked)}
    >
      <span className="knob" />
      <span className="toggle-label">{checked ? "On" : "Off"}</span>
    </button>
  );
}
