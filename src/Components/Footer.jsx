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
        <MDBContainer className="fluid px-4 py-5 max-w-6xl d-flex flex-col items-baseline">
          <MDBRow className="g-1">
            {/* <MDBNavbarBrand href="/">
            <img src={logojournal} style={logoStyle} alt="" loading="lazy" />
          </MDBNavbarBrand> */}
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontLightTH" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontMediumTH" }}
              >
                {selectedLanguage === "en" ? "Service Agencies" : "หน่วยงาน"}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en" ? (
                  <>
                    Human Resource <br /> Management Office
                  </>
                ) : (
                  "สำนักงานบริหารทรัพยากรบุคคล"
                )}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en"
                  ? "  KMUTT Internationalization"
                  : "          สำนักงานกิจการต่างประเทศ"}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en"
                  ? "  KMUTT Library"
                  : "    สำนักหอสมุด"}
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontLightTH" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontMediumTH" }}
              >
                {selectedLanguage === "en"
                  ? "Service Agencies"
                  : "    หน่วยงาน"}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en" ? (
                  <>
                    Human Resource <br /> Management Office
                  </>
                ) : (
                  "สำนักงานบริหารทรัพยากรบุคคล"
                )}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en"
                  ? "  KMUTT Internationalization"
                  : "          สำนักงานกิจการต่างประเทศ"}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en"
                  ? "  KMUTT Library"
                  : "    สำนักหอสมุด"}
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontLightTH" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontMediumTH" }}
              >
                {selectedLanguage === "en"
                  ? "Service Agencies"
                  : "    หน่วยงาน"}
              </p>
              <p
                className="text-md px-0  w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en" ? (
                  <>
                    Human Resource <br /> Management Office
                  </>
                ) : (
                  "สำนักงานบริหารทรัพยากรบุคคล"
                )}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en"
                  ? "  KMUTT Internationalization"
                  : "          สำนักงานกิจการต่างประเทศ"}
              </p>
              <p
                className="text-md px-0 w-fit"
                style={{ borderBottom: "1px solid white " }}
              >
                {selectedLanguage === "en"
                  ? "  KMUTT Library"
                  : "    สำนักหอสมุด"}
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm px-0 pe-4 text-white d-flex flex-col col-4"
              style={{ fontFamily: "FontLight" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontMediumTH" }}
              >
                ติดต่อเรา
              </p>
              <div className="text-md px-0">
                KMUTT Research & Development Journal
              </div>
              <div className="text-md px-0">
                Research, Innovation and Partnerships Office
              </div>
              <div className="text-md px-0">
                King Mongkut’s University of Technology Thonburi
              </div>
              <div className="text-md px-0">
                126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                Thailand
              </div>
              <div className="text-md px-0">
                Tel. +66-2470-9652 Fax. +66-2872-9083
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="p-0 pt-5">
              <p
                className="text-md px-0 mb-0 text-white"
                style={{ fontFamily: "FontRegular" }}
              >
                Copyright 2023 RIPO, All rights reserved
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

function FooterMobile() {
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
        {/* <MDBContainer className="fluid p-2 d-flex flex-row items-baseline"> */}
        {/* <MDBRow className="g-1"> */}
        {/* <MDBCol
              className="text-sm w-fit px-0 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                หน่วยงาน
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                {" "}
                สำนักงานบริหารทรัพยากรบุคคล
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                สำนักงานกิจการต่างประเทศ
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                สำนักหอสมุด
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                หน่วยงาน
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                {" "}
                สำนักงานบริหารทรัพยากรบุคคล
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                สำนักงานกิจการต่างประเทศ
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                สำนักหอสมุด
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                หน่วยงาน
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                {" "}
                สำนักงานบริหารทรัพยากรบุคคล
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                สำนักงานกิจการต่างประเทศ
              </p>
              <p
                className="text-md px-0 underline"
                style={{ fontFamily: "FontRegular" }}
              >
                สำนักหอสมุด
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm px-0 text-white d-flex flex-col"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                ติดต่อเรา
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                KMUTT Research & Development Journal
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                Research, Innovation and Partnerships Office
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                King Mongkut’s University of Technology Thonburi
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                Thailand
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                Tel. +66-2470-9652 Fax. +66-2872-9083
              </p>
            </MDBCol>
          </MDBRow> */}
        <MDBContainer className="fluid p-2 d-flex align-items-center justify-content-center">
          <MDBRow>
            <MDBCol className="p-0">
              <p
                className="text-lg px-0 mb-0 text-white"
                style={{ fontFamily: "FontRegular" }}
              >
                Copyright 2023 RIPO, All rights reserved
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <FooterMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <FooterDesktop />}
    </>
  );
}
