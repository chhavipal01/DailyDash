import React, { useState, useContext } from "react";
import { ChevronRight, Bot, Brain, Search, Code,MessageCircle, Globe } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function AIBtn() {
  const [open, setOpen] = useState(false);
  const { theme, themes } = useContext(ThemeContext); // Get theme & colors

  const aiTools = [
    { name: "ChatGPT", url: "https://chat.openai.com/", icon: <Bot size={20} /> },
    { name: "Gemini", url: "https://gemini.google.com/", icon: <Brain size={20} /> },
    { name: "Copilot", url: "https://copilot.microsoft.com/", icon: <Code size={20} /> },
    {name: "DeepSeek",url: "https://www.deepseek.com/",icon: <Search size={20} />},
    {name: "Meta AI",url: "https://www.meta.ai/",icon: <MessageCircle size={20} /> },
  ];

  return (
    <div className="fixed  bottom-5 left-5 p-3 flex items-center space-x-2 z-50">
      {/* Main AI Tools Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: themes[theme]?.button,
          color: themes[theme]?.text,
        }}
        className="flex items-center space-x-2 rounded-full px-4 py-2 shadow-lg hover:brightness-110 transition-all"
      >
        <Globe size={20} />
        <span>AI Tools</span>
        <ChevronRight
          size={20}
          className={`${open ? "rotate-90" : ""} transition-transform`}
        />
      </button>

      {/* Divider */}
      {open && <div className="h-6 w-[2px]" style={{ backgroundColor: themes[theme]?.accent }}></div>}

      {/* Horizontal AI Buttons */}
      {open && (
        <div className="flex space-x-2">
          {aiTools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => window.open(tool.url, "_blank")}
              style={{
                backgroundColor: themes[theme]?.button,
                color: themes[theme]?.text,
              }}
              className="flex items-center space-x-2 rounded-full px-4 py-2 shadow-md hover:brightness-110 transition"
            >
              {tool.icon}
              <span>{tool.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
