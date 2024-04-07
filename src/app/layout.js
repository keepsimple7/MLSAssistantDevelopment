"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import "react-chatbot-kit/build/main.css";
import Chat from "./Chat";
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleKey } from "../../config/config";
import AppContext from "@/custom-hooks/AppContext";
import LoginModal from "@/components/modal/LoginModal";
import EmailVerificationModal from "@/components/modal/EmailVerificationModal";

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
  useEffect(() => {
    // Initialize Google Maps API script
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCbULP7ohg0MYQSZIUm4m_TdiAjHhjN3Ds&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    // Set a callback to handle script loading completion
    googleMapsScript.onload = () => {
      // Initialize any components or logic that depend on Google Maps API here
      console.log("Google Maps API script loaded successfully");
    };
    // Append the script element to the document body
    document.body.appendChild(googleMapsScript);
    // Initialize jQuery
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    jqueryScript.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
    jqueryScript.crossOrigin = "anonymous";
    jqueryScript.async = true;
    // Append jQuery script to the document body
    document.body.appendChild(jqueryScript);
  }, []);

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.className} ${dmSans.className}`}
        cz-shortcut-listen="false"
      >
        <AppContext>
          <GoogleOAuthProvider clientId={googleKey}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              maxSnack={3}
              autoHideDuration={2000}
            >
              <LoginModal />
              <EmailVerificationModal />
              <div className="wrapper ovh">
                {children}
                {/* <Chat></Chat> */}
              </div>
              <ScrollToTop />
            </SnackbarProvider>
          </GoogleOAuthProvider>
        </AppContext>
      </body>
    </html>
  );
}
