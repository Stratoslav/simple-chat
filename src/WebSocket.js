import React, { useEffect, useRef, useState } from "react";

const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");
  const socket = useRef();
  useEffect(() => {}, []);

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        userName,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("connection has been successes");
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {};
    socket.current.onerror = () => {};
  };
  const sendMessage = async () => {
    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: "message",
    };

    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div>
        Your Name
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        ></input>
        <button onClick={connect}>Enter</button>
      </div>
    );
  }

  return (
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
          <div key={message.id}>
            {message.event === "connection" ? (
              <div>{`User with name ${message.userName} plugged in`}</div>
            ) : (
              <div>{`${message.userName}: ${message.message}`}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebSock;
