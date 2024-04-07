"use client";
import SignIn from "@/components/common/login-signup-modal/SignIn";
import VerificationCodeModal from "@/components/modal/VerificationCodeModal";
import { useAppContext } from "@/custom-hooks/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// export const metadata = {
//   title: "Login  || Homez - Real Estate NextJS Template",
// };

const Login = () => {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const handleLoginModal = (inputs = {}) => {
    if (inputs?.email) {
      setOpenVerificationModal(true);
      setSelectedEmail(inputs.email);
    } else {
      router.push("/");
    }
  };
  const handleVerificationModal = () => {
    setOpenVerificationModal(false);
    setSelectedEmail("");
    router.push("/");
  };
  useEffect(() => {
    
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <></>;
  }
  return (
    <>
      <VerificationCodeModal
        openModal={openVerificationModal}
        emailAddress={selectedEmail}
        handleCloseVerificationModal={handleVerificationModal}
      />
      {/* Our Compare Area */}
      <section className="our-compare pt60 pb60">
        <Image
          width={1012}
          height={519}
          src="/images/icon/login-page-icon.svg"
          alt="logo"
          className="login-bg-icon contain"
          data-aos="fade-right"
          data-aos-delay="300"
        />
        <div className="container">
          <div className="row" data-aos="fade-left" data-aos-delay="300">
            <div className="col-lg-6">
              <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
                <div className="text-center mb40">
                  <Link href="/">
                    <Image
                      width={138}
                      height={44}
                      className="mb25"
                      src="/images/mls-assistant.png"
                      alt="logo"
                    />
                  </Link>
                  <h2>Sign in</h2>
                  <p className="text">
                    Sign in with this account across the following sites.
                  </p>
                </div>
                <SignIn handleCloseLoginModal={handleLoginModal} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
