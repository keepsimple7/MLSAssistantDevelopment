import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "./components/Options";
const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage(`Hi there! I'm Lorreta, your AI Real Estate Agent. I'm here to assist you with all of your real estate needs. Here's How i can help you`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;