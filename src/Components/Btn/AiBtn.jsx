import React, { useState, useContext } from "react";
import {
  ChevronRight,
  Bot,
  Brain,
  Search,
  Code,
  MessageCircle,
  Globe,
} from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function AIBtn() {
  const [open, setOpen] = useState(false);
  const { theme, themes } = useContext(ThemeContext);

  const iconStyle = {
    strokeWidth: 2.5, // Bolder icon
    color: themes[theme]?.button,
  };

  const aiTools = [
    { name: "ChatGPT", url: "https://chat.openai.com/", icon: <Bot size={22} style={iconStyle} /> },
    { name: "Gemini", url: "https://gemini.google.com/", icon: <Brain size={22} style={iconStyle} /> },
    { name: "Copilot", url: "https://copilot.microsoft.com/", icon: <Code size={22} style={iconStyle} /> },
    { name: "DeepSeek", url: "https://www.deepseek.com/", icon: <Search size={22} style={iconStyle} /> },
    { name: "Meta AI", url: "https://www.meta.ai/", icon: <MessageCircle size={22} style={iconStyle} /> },
  ];

  return (
    <div className="fixed bottom-5 left-5 z-50 w-max h-18">
      <div className="flex items-center space-x-3 p-3 rounded-2xl">
        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: themes[theme].text,
          }}
          className="flex items-center gap-3 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <Globe size={22} style={{ ...iconStyle }} />
          <span className="text-base font-medium">AI Tools</span>
          <ChevronRight
            size={22}
            className={`transform transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            style={{ color: themes[theme].button }}
          />
        </button>

        {/* Divider Line */}
        {open && (
          <div
            className="h-8 w-[2px] rounded-full"
            style={{ backgroundColor: themes[theme]?.accent }}
          ></div>
        )}

        {/* Tools Panel */}
        {open && (
          <div className="flex flex-wrap gap-3">
            {aiTools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => window.open(tool.url, "_blank")}
                style={{
                  backgroundColor: "#FFF1F1",
                  color: themes[theme]?.text,
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-base shadow hover:brightness-110 transition"
              >
                {tool.icon}
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
