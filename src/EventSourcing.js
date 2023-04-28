import React, { useEffect, useState } from "react";
import axios from "axios";
const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getMessages();
  }, []);
  const getMessages = async () => {
    const eventSourcing = new EventSource("http://localhost:3000/connect");
    eventSourcing.onmessage = function (event) {
      const message = JSON.parse(event.data);

      setMessages((prev) => [...prev, message]);
      return;
    };
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:3000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Submit</button>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id}>{message.message}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSourcing;
