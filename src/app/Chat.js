import React, { useState } from 'react';
import { Chat } from 'react-chat-module';
import 'react-chat-module/dist/index.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

function Example() {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async (message) => {
        const messageId = messages.length + 1; // Generate a unique messageId
        const newMessage = {
            messageId: messageId,
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            type: message.type,
            text: message.text,
            createdAt: message.createdAt,
            read: false
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        try {
            const geminiResponse = await generateContent(message.text);
            console.log(geminiResponse);
            if (geminiResponse) {
                const response = JSON.parse(geminiResponse);
                const geminiMessage = {
                    messageId: messageId + 1,
                    senderId: "Gemini",
                    profilePicture: "https://via.placeholder.com/150",
                    type: "text",
                    text: response.message,
                    createdAt: new Date(),
                    read: false
                };
                setMessages(prevMessages => [...prevMessages, geminiMessage]);
            } else {
                // Handle the case when geminiResponse is null or empty
                // Display a message to the user indicating temporary unavailability
                const errorMessage = "Sorry, we're currently experiencing high traffic. Please try again later.";
                const errorNotification = {
                    messageId: messageId + 1,
                    senderId: "System",
                    type: "notification",
                    text: errorMessage,
                    createdAt: new Date(),
                    read: false
                };
                setMessages(prevMessages => [...prevMessages, errorNotification]);
            }
        } catch (error) {
            console.error("An error occurred while generating content:", error);
            // Handle the error, display an error message to the user, etc.
        }
    }

const generateContent = async (message) => {
    const API_KEY = 'AIzaSyC7jMMsKoJSSOM_lt7v88VZzBDX7wlqikE'; // Replace with your API key
    const MODEL_NAME = 'gemini-1.0-pro'; // Replace with your model name

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [
        {
            text: `Please remember:
                - Your name is Loretta
                - You are a registered AI Real Estate Agent working with the MLS assistant in Boston
                - Keep the conversation focused on real estate matters.
                - You need to understand the intent if the user asks for finding you a property
                - You have to send me the response as a JSON object, for example: { "message": "message" }
                - Ask the user their name first
                - 2nd Ask them what they are looking for
                - Ask them where they are moving and what their purpose is
                - Ask for the price they have in mind
                User Message: ${message}
                `
        }
    ];

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response.text();
        return response;
    } catch (error) {
        console.error("An error occurred while generating content:", error);
        return ''; // Return an empty string or handle the error appropriately
    }
};


    return (
        <div>
            <div className={`chatbox ${isOpen ? "open" : ""}`}>
                <button className='chatClose-btn' onClick={toggleChatBox}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <Chat userId={"1"} messages={messages} onSend={handleSend} />
            </div>
            {!isOpen && (
                <button className='chatbox-initialize' onClick={toggleChatBox}>
                    <span className="icon flaticon-chat-1 fs-4" />
                </button>
            )}
        </div>
    )
}

export default Example;
