import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBNavbar,
  MDBNavbarBrand,
  MDBRow,
} from "mdb-react-ui-kit";
import logojournal from "../Images/journal-logo.svg";
import { LanguageContext } from "./LanguageContext";
import { useMediaQuery } from "react-responsive";

function FooterDesktop() {
  const location = useLocation();
  const pages = ["Home", "Publications", "Guidelines", "Journal", "About us"];

  //   Language
  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  const toggleLanguage = () => {
    handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
  };

  const navbarStyle = {
    // width: "1440px",
    height: "200px",
    flexShrink: 0,
    background: "#474747",
  };

  const menuStyle = {
    // width: "1440px",
    height: "60px",
    flexShrink: 0,
    background: "#FFF",
  };

  const logoStyle = {
    height: "124px",
  };

  const customRowStyle = {
    display: "inline-flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: "1rem",
    whiteSpace: "nowrap",
    fontFamily: "FontSemiBold",
  };

  const containerStyle = {
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
  };

  const activeLinkStyle = {
    color: "#EB562E",
  };

  const [showBasic, setShowBasic] = useState(false);

  return (
    <div>
      <MDBNavbar style={navbarStyle}>
        <MDBContainer className={`fluid p-0 px-0 ${containerStyle["6xl"]}`}>
          {/* <MDBNavbarBrand href="/">
            <img src={logojournal} style={logoStyle} alt="" loading="lazy" />
          </MDBNavbarBrand> */}
          <MDBRow className="d-flex justify-content-between fluid pt-0 pb-3">
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                KMUTT Research & Development Journal
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                {" "}
                Research, Innovation and Partnerships Office
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                King Mongkut’s University of Technology Thonburi
              </p>
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-between fluid pt-0 pb-3">
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                Thailand
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                {" "}
                Tel. +66-2470-9652 Fax. +66-2872-9083
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                ...
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default function App() {
  return (
    <>
      <FooterDesktop />
    </>
  );
}
