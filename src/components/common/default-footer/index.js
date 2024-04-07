import Image from "next/image";
import Link from "next/link";
import ContactMeta from "./ContactMeta";
import AppWidget from "./AppWidget";
import Social from "./Social";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
			<div className="col-lg-2">
				<div className="footer-widget mb-4 mb-lg-5">
				<Link className="footer-logo" href="/">
					<Image
					width={138}
					height={80}
					src="/images/mls-assistant-white.png"
					alt="MLS Assistant"
					/>
				</Link>
				</div>
			</div>
			<div className="col-lg-5 text-white">
				<div className="footer-widget mb-4 mb-lg-5">
					<ContactMeta />
				</div>	  
			</div>
			<div className="col-lg-5">
				<AppWidget />
			</div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default Footer;
