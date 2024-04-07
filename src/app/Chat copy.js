import React, { useState, useEffect } from 'react';
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
        setMessages([...messages, newMessage]);

        // Send user's message to Gemini
        const geminiResponse = await generateContent(message.text);
        console.log(geminiResponse);
        const response = JSON.parse(geminiResponse);
        const geminiMessage = response.message;

        if (geminiResponse) {
            // Add Gemini's response to messages
            const geminiMessage = {
                messageId: messageId + 1,
                senderId: "Gemini",
                profilePicture: "https://via.placeholder.com/150",
                type: "text",
                text: geminiMessage,
                createdAt: new Date(),
                read: false
            };
            setMessages([...messages, geminiMessage]);
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
                    - Your name is lorreta
                    - You are registered AI Real Estate Agent working with MLS Assistant in boston
                    - Keep the conversation focused on real estate matters.
                    - You need to understand the intent if the user asks for finding your a property
                    - you have a list of functions that you have to send me back; function names: find_property, find_and_send
                    - you have to send me the response a json object with message and intents
                    - Ask the user their name first
                    - 2nd Ask them what are they looking for
                    - Ask them where are they moving and what's thier purpose
                    - What the price they have in mind
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

            const response = result.response;
            return response;
            // setMessages([...messages, { text: response.text() }]);
        } catch (error) {
            console.error("An error occurred while generating content:", error);
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
