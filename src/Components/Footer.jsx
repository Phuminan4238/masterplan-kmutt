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
        <MDBContainer className="fluid p-5 d-flex flex-col items-baseline">
          <MDBRow className="g-1">
            {/* <MDBNavbarBrand href="/">
            <img src={logojournal} style={logoStyle} alt="" loading="lazy" />
          </MDBNavbarBrand> */}
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                หน่วยงาน
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                {" "}
                สำนักงานบริหารทรัพยากรบุคคล
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                สำนักงานกิจการต่างประเทศ
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                สำนักหอสมุด
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                หน่วยงาน
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                {" "}
                สำนักงานบริหารทรัพยากรบุคคล
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                สำนักงานกิจการต่างประเทศ
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                สำนักหอสมุด
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                หน่วยงาน
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                {" "}
                สำนักงานบริหารทรัพยากรบุคคล
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                สำนักงานกิจการต่างประเทศ
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                สำนักหอสมุด
              </p>
            </MDBCol>
            <MDBCol
              className="text-sm w-fit px-0 pe-4 text-white"
              style={{ fontFamily: "FontSemiBold" }}
            >
              <p
                className="text-xl px-0"
                style={{ fontFamily: "FontSemiBold" }}
              >
                ติดต่อเรา
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                {" "}
                KMUTT Research & Development Journal
              </p>
              <p className="text-md px-0" style={{ fontFamily: "FontRegular" }}>
                Research, Innovation and Partnerships Office
              </p>
            </MDBCol>{" "}
          </MDBRow>
          <MDBRow>
            <MDBCol className="p-0 pt-4">
              <p
                className="text-md px-0 text-white"
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
  return (
    <>
      <FooterDesktop />
    </>
  );
}
