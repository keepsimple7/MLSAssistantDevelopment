"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import ChatBot from 'react-simple-chatbot';
import 'react-chatbot-kit/build/main.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";



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
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyC7jMMsKoJSSOM_lt7v88VZzBDX7wlqikE";
  
  async function run() {
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
      {text: "Please remember:\n- Your name is lorreta\n- You are registered AI Real Estate Agent working with MLS Assistant in boston\n- Keep the conversation focused on real estate matters.\n- Feel free to ask any questions you have about properties, neighborhoods, market trends, or anything else related to real estate.\n- I'm here to assist you every step of the way!\n- You need to understand the intent if the user asks for finding your a property you need to build this query url like this https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=23c8729a55e9986ae45ca71d18a3742c&near=43.4442,71.6473\n- you have a list of functions that you have to send me back; function names: find_property, find_and_send\n- you have to send me the response a json object with message and intents"},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    console.log(response.text());
  }
  const [buyingInfo, setBuyingInfo] = useState({
    city: "",
    state: "",
    zipCode: ""
  });
  const [price, setPrice] = useState('');
  const [chat, setChat] = useState();
  useEffect(() => {
    // run();
  }, [chat]);
  const steps = [
    {
      id: 'Lorreta',
      message: "Hello, my name is Lorretta. I am an AI Real Estate Agent. I'm here to assist you every step of the way! I can do things like:",
      trigger: 'options',
    },
    {
      id: 'options',
      options: [
        { value: 1, label: 'Find you a home', trigger: 'find_home'},
      ],
    },
    {
      id: 'find_home',
      message: "Are you buying or renting?",
      trigger: 'buy_rent_options'
    },
    {
      id: 'buy_rent_options',
      options: [
        { value: "buy", label: "Buying", trigger: "buying_home" },
        { value: "rent", label: "Renting", trigger: "renting_home" }
      ]
    },
    {
      id: 'buying_home',
      message: "Where are you looking to buy? You can add the city, state, and Zip Code.",
      trigger: 'buying_home_input',
    },
    {
      id: 'buying_home_input',
      user: true,
      trigger: 'buying_home_price',
      validator: (value) => {
        const cityStateZipRegex = /^[a-zA-Z\s]*,\s*[a-zA-Z\s]*,\s*\d{5}$/;
        if (cityStateZipRegex.test(value)) {
          const [city, state, zipCode] = value.split(',').map(part => part.trim());
          setBuyingInfo({
            city,
            state,
            zipCode
          });
          return true;
        } else {
          return 'Please enter a valid input in the format "City, State, Zip Code".';
        }
      }
    },
    {
      id: 'buying_home_price',
      message: "What is your budget for buying a home?",
      trigger: 'buying_home_price_input'
    },
    {
		id: 'buying_home_price_input',
		user: true,
		trigger: 'buying_home_done',
		validator: (value) => { 
			setPrice(value);
			return true;
		}
    },
	{
		id: 'buying_home_done',
		message: "Thank you! We will find you a home based on your preferences.",
		end: true,
	},

    {
      id: 'renting_home',
      message: "Where are you looking to rent? You can add the city, state, and Zip Code.",
      user: true,
      trigger: 'renting_home_input',
    },
    {
      id: 'renting_home_input',
      user: true,
      trigger: 'renting_home_price',
      validator: (value) => {
        const cityStateZipRegex = /^[a-zA-Z\s]*,\s*[a-zA-Z\s]*,\s*\d{5}$/;
        if (cityStateZipRegex.test(value)) {
          return true;
        } else {
          return 'Please enter a valid input in the format "City, State, Zip Code".';
        }
      }
    },
    {
      id: 'renting_home_price',
      message: "What is your budget for renting a home?",
      user: true,
      trigger: 'renting_home_done'
    },
    {
      id: 'renting_home_done',
      message: "Thank you! We will find you a rental property based on your preferences.",
      end: true
    }
  ];

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
        
        {/* <ChatBot
            steps={steps}
            floating={true}
        /> */}
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
