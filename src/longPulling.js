import React, { useEffect, useState } from "react";
import axios from "axios";
const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/get-messages");
      console.log(data);
      setMessages((prev) => [data, ...prev]);
      await getMessages();
    } catch (e) {
      return e;
    }
  };

  const sendMessage = async () => {
    console.log(value);
    await axios.post("http://localhost:3000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };
  console.log(messages);
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

export default LongPulling;
