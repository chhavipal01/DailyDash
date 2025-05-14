import { FaYoutube, FaEnvelope, FaTelegramPlane, FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const defaultIcons = [
  { id: 1, icon: <FaYoutube />, link: "https://youtube.com" },
  { id: 2, icon: <FaEnvelope />, link: "mailto:someone@example.com" },
  { id: 3, icon: <FaTelegramPlane />, link: "https://telegram.org" },
  { id: 4, icon: <FaWhatsapp />, link: "https://wa.me/your-number" },
  { id: 5, icon: <FaTwitter />, link: "https://twitter.com" },
  { id: 6, icon: <FaLinkedin />, link: "https://linkedin.com" },
];

const SocialButtons = ({ customIcons = [] }) => {
  const { theme, themes } = useContext(ThemeContext); // Theme context se theme fetch kar rahe hain

  // Agar user ne custom buttons diye hain to wo use honge, warna default
  const icons = customIcons.length > 0 ? customIcons : defaultIcons;

  return (
    <div 
      className="flex fixed bottom-4 justify-center space-x-4 p-4 rounded-lg transition-colour duration-500 hover:scale-105" 
      style={{ backgroundColor: themes[theme].bg }}
    >
      {icons.map(({ id, icon, link }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full text-2xl transition-transform transform hover:scale-110 shadow-md"
          style={{
            backgroundColor: themes[theme].button, // Theme-based button color
            color: "white", // Theme-based text color
          }}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialButtons;
