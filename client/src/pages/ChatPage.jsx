/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { BASE_URL } from "../Base";
import ReactMarkdown from "react-markdown";

const ChatPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { chatId } = useParams();
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data: userChats } = await axios.get(`${BASE_URL}/api/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(Array.isArray(userChats) ? userChats : []);
    } catch (err) {
      console.error("Error fetching chats", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const createNewChat = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data: newChat } = await axios.post(
        `${BASE_URL}/api/chat`,
        { title: "New Chat" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchChats();
      navigate(`/chat/${newChat._id}`);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${BASE_URL}/api/message/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = data.map((msg) => ({
        id: msg._id,
        message: msg.content,
        isUser: msg.sender === "student",
      }));
      setMessages(formatted);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    if (chatId) fetchMessages();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${BASE_URL}/api/message`,
        { chatId, content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const formattedMessages = data.map((msg) => ({
        id: msg._id,
        message: msg.content,
        isUser: msg.sender === "student",
      }));
      setMessages((prev) => [...prev, ...formattedMessages]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 pt-16">
        {/* Sidebar for large screens */}
        <aside className="hidden lg:flex flex-col w-72 bg-white p-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Chat History</h2>
          <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <Link to={`/chat/${chat._id}`} key={chat._id}>
                  <div className="px-4 py-2 rounded text-sm bg-gray-50 hover:bg-gray-200 transition">
                    {chat.title}
                  </div>
                </Link>
              ))
            ) : (
              <p>No chats found.</p>
            )}
          </div>
          <button
            onClick={createNewChat}
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            + New Chat
          </button>
        </aside>

        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 z-20 flex lg:hidden transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <aside className="bg-white w-64 p-4 h-full z-30 flex flex-col">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Chat History
            </h2>
            <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <Link to={`/chat/${chat._id}`} key={chat._id}>
                    <div className="px-4 py-2 rounded text-sm bg-gray-50 hover:bg-gray-200 transition">
                      {chat.title}
                    </div>
                  </Link>
                ))
              ) : (
                <p>No chats found.</p>
              )}
            </div>
            <button
              onClick={createNewChat}
              className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              + New Chat
            </button>
          </aside>
          <div
            className="flex-1 bg-black/10"
            onClick={() => setShowSidebar(false)}
          ></div>
        </div>

        {/* Main chat area */}
        <main className="relative flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.length > 0 ? (
              messages.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg max-w-[80%] text-sm ${
                    item.isUser
                      ? "bg-blue-100 text-blue-800 ml-auto"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <ReactMarkdown>{item.message}</ReactMarkdown>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">
                Start the conversation...
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input box */}
          <div className="bg-white px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <textarea
                className="w-full h-16 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 text-sm resize-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), sendMessage())
                }
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
