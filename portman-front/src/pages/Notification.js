import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Notification() {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/notifications/${userId}`);
      setNotes(res.data);
    };

    load();
  }, []);

  return (
    <div>
      <h3>Notifications</h3>

      {notes.length === 0 && <p>No notifications</p>}

      {notes.map((n, i) => (
        <div key={i} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          {n}
        </div>
      ))}
    </div>
  );
}