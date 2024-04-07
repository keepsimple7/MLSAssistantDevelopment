"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
// import ChatBot from 'react-simple-chatbot';
import 'react-chatbot-kit/build/main.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
if (typeof window !== "undefined") {
  import("bootstrap");
}
// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});
// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});
export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return (
    <html lang="en">
      <body
        className={`body  ${poppins.className} ${dmSans.className}`}
        cz-shortcut-listen="false"
      >
		<div className="wrapper ovh">{children}
		<Chatbot
          	config={config}
          	messageParser={MessageParser}
          	actionProvider={ActionProvider}
        />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
