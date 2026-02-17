import { useState } from "react";

export default function Timings({ timings }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="timings">
      <div className="timings-header" onClick={() => setOpen(!open)}>
        <span>Hours</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="timings-list">
          {Object.entries(timings).map(([day, time]) => (
            <div key={day} className="timing-row">
              <span>{day}</span>
              <span>{time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
