import React, { useContext } from "react";
import { useState, useEffect, useRef, setIsLoaded } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useMediaQuery } from "react-responsive";
import journalimage from "../Images/journal-image.png";
import welcomecover from "../Images/welcome-cover.png";
import { text } from "@fortawesome/fontawesome-svg-core";
import { LanguageContext } from "../Components/LanguageContext";
import Container from "@mui/material/Container";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function GuidelinesDesktop() {
  const [publications2, setPublications2] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const instance = axios.create({
      baseURL: "http://10.35.29.179:1337/api/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    async function fetchData() {
      try {
        const response = await instance.get(
          "publications?populate=journal.uploadfiles.fileupload,journal.year,journal.months"
        );
        if (isMounted) {
          setPublications2(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (publications2.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [publications2]);

  // Guidelines
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const instance = axios.create({
      baseURL: "http://10.35.29.179:1337/api/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    async function fetchData() {
      try {
        const response = await instance.get("guidelines/?populate=*");
        if (isMounted) {
          setGuidelines(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (guidelines.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [guidelines]);

  // Ref
  const preparationRef = useRef(null);
  const templateRef = useRef(null);
  const submissionRef = useRef(null);
  const instructionRef = useRef(null);

  // Scroll Ref
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isFixed, setIsFixed] = useState(false);
  const contentRef = useRef(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const handleScroll = () => {
    if (contentRef.current) {
      const { top } = contentRef.current.getBoundingClientRect();
      setIsFixed(top <= 0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Styles object for custom styling
  const styles = {
    listItem: {
      marginBottom: "0.5rem",
    },
    listItemLink: {
      color: "#333",
      textDecoration: "none",
      transition: "color 0.3s",
      fontWeight: "400",
    },
    activeLink: {
      fontWeight: "bold",
      color: "#EB562E",
    },
  };

  // Publication
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.35.29.179:1337/api/publications/?populate=*")
      .then(({ data }) => setPublications(data.data))
      .catch((error) => setError(error));
  }, []);

  // Style
  const isDesktop = useMediaQuery({ minWidth: 940 });
  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
  };
  const tableRowStyle = {
    borderBottom: "1px solid black",
    padding: "0.5rem 0px 0.5rem 0px",
  };
  const cellContentStyle = {
    padding: "0.5rem 0px 0.5rem 0px",
    verticalAlign: "top",
  };

  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  return (
    <div className="App">
      <section>
        <MDBContainer className={`fluid px-3 ${containerStyle["6xl"]}`}>
          <MDBRow className="d-flex justify-content-between py-6 fluid gx-6">
            {/* Left */}
            {publications2.map((publication) => (
              <MDBCol md="2">
                {/* Journal  */}
                <MDBRow
                  className="justify-content-center"
                  style={{
                    borderLeft: "0.4rem solid  #EB562E ",
                    display: "flex",
                    alignItems: "center",
                    fontFamily:
                      selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    color: "#474747",
                    fontSize: "36px",
                  }}
                >
                  <p className="m-0 ">
                    {" "}
                    {selectedLanguage === "en"
                      ? "Latest Journal"
                      : "วารสารล่าสุด"}
                  </p>
                </MDBRow>
                <MDBRow className="pt-3 pb-2">
                  <MDBCol className="d-flex p-0" style={{ overflow: "hidden" }}>
                    {/* style={{ height: "508px", width: "412px" }} */}
                    <img
                      src={
                        "http://10.35.29.179:1337" +
                        publication.attributes.journal[0]?.uploadfiles.data[0]
                          ?.attributes.fileupload?.data[1]?.attributes.url
                      }
                      alt="Your image"
                      className="image-fluid"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow
                  className="justify-content-center py-1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* local data */}
                  <Link
                    to={publication.attributes.journal[0]?.url}
                    target="_blank"
                    style={{ color: "black", padding: "0px" }}
                  >
                    <p
                      className="m-0 text-md px-1"
                      style={{
                        color: "#EB562E",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontThaiSemiBold"
                            : "FontThaiSemiBold",
                      }}
                    >
                      {selectedLanguage === "en"
                        ? `${publication.attributes.journal[0]?.title}`
                        : `${publication.attributes.journal[0]?.title_th}`}
                      {/* {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.title}`
                      : `${publication.attributes.journal[0]?.title_th}`} */}
                    </p>
                  </Link>
                  <p
                    className="m-0 px-1 pt-2"
                    style={{
                      color: "#474747",
                      fontSize: "14px",
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontRegular"
                          : "FontThaiRegular",
                    }}
                  >
                    {/* Volumn 46 No. 2 */}
                    {selectedLanguage === "en"
                      ? `Volumn ${publication.attributes.journal[0]?.volumn} No. ${publication.attributes.journal[0]?.number}`
                      : `ปีที่ ${publication.attributes.journal[0]?.volumn} ฉบับที่ ${publication.attributes.journal[0]?.number}`}
                    {""}
                  </p>
                  <p
                    className="m-0 text-xs px-1"
                    style={{
                      color: "#474747",
                      fontSize: "14px",
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontRegular"
                          : "FontThaiRegular",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_en}`
                      : `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_th}`}{" "}
                    {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_en}`
                      : `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_th}`}
                  </p>
                </MDBRow>
              </MDBCol>
            ))}
            {/* ******************* */}

            <MDBCol md="8">
              {/* Publication Policy  */}
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-black"
                  style={{
                    fontFamily:
                      selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    fontSize: "48px",
                  }}
                >
                  {selectedLanguage === "en" ? "Guidelines" : "ข้อแนะนำ"}
                </p>
              </MDBRow>

              <MDBRow
                ref={preparationRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
                <MDBCol
                  md="2"
                  className="text-2xl w-fit ps-4 text-black"
                  style={{
                    fontFamily:
                      selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    fontSize: "1.75rem",
                  }}
                >
                  {selectedLanguage === "en"
                    ? " Manuscript Preparation Guidelines"
                    : "ข้อแนะนำในการเตรียมต้นฉบับ"}
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-center ">
                <p
                  className="text-md px-0 text-black"
                  style={{ fontFamily: "FontSemiBold" }}
                >
                  Authors of a manuscript should adhere to the following
                  Guidelines
                </p>
              </MDBRow>
              <MDBRow className="pt-0 pb-2">
                {guidelines.map((guideline) => (
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedLanguage === "en"
                          ? guideline.attributes.guideline
                          : guideline.attributes.guideline,
                    }}
                  />
                ))}
              </MDBRow>

              {/* <MDBRow className="pt-0 pb-4">
                <table style={tableStyle}>
                  <tbody>
                    <tr style={tableRowStyle}>
                      <td>
                        <div style={cellContentStyle}>Title</div>
                      </td>
                      <td>
                        Title should be concise and cover the main theme of the
                        article
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Authorship</div>
                      </td>
                      <td>
                        List all authors’ information including names, academic
                        positions and affiliations
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        <div style={cellContentStyle}>Abstract</div>
                      </td>
                      <td>
                        Abstract must be available BOTH in Thai and in English
                        (but on a separate page). Abstract should consist of the
                        research motivation and/or objectives, scope as well as
                        key results.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        <div style={cellContentStyle}>Introduction</div>
                      </td>
                      <td>
                        Introduction should give the background and literature
                        relevant to the research problem of the article. The
                        research objectives and scope should also be stated.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        <div style={cellContentStyle}>Material and method</div>
                      </td>
                      <td>
                        This section should be comprehensive enough to allow the
                        reader to repeat the work if necessary.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Results</div>
                      </td>
                      <td>
                        Results should be given via the use of appropriate
                        figures and tables along with adequate captions.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Discussion</div>
                      </td>
                      <td>
                        Emphasize on the main findings and, if applicable,
                        discuss the work in relation to the literature.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Conclusion</div>
                      </td>
                      <td>
                        Summarize the main findings that should be emphasized.
                        Recommendation and/or suggestion can also be made.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td sx={{ verticalAlign: "top" }}>
                        <div
                          style={cellContentStyle}
                          sx={{ verticalAlign: "top" }}
                        >
                          References
                        </div>
                      </td>
                      <td>
                        Use the number system by giving the reference number(s)
                        in a bracket (e.g. [1], [1,2] or [1-3]) after the
                        referenced statement or author(s).
                        <br />
                        <br />
                        <strong>
                          In the Reference section, follow the following
                          recommended formats:
                        </strong>
                        <br />
                        <br />
                        Journal
                        <br />
                        Pongmalai, P., Devahastin, S., Chiewchan, N. and
                        Soponronnarit, S., 2015, “Enhancement of
                        Microwave-Assisted Extraction of Bioactive Compounds
                        from Cabbage Outer Leaves via the Application of
                        Ultrasonic Pretreatment,” Separation and Purification
                        Technology, 144, pp. 37-45.
                        <br />
                        <br />
                        Book
                        <br />
                        Farmer, R.C., Cheng, G.C., Chen, Y-S. and Pike, R.W.,
                        2009, Computational Transport Phenomena for Engineering
                        Analysis, CRC Press, Boca Raton.
                        <br />
                        <br />
                        Book Chapter
                        <br />
                        Devahastin, S. and Mujumdar, A.S. 2014, “Superheated
                        Steam Drying of Foods and Biomaterials,” pp. 57-84, in
                        E. Tsotsas and A.S. Mujumdar (Eds.) Modern Drying
                        Technology, Vol. 5, Wiley-VCH, Weinheim.
                        <br />
                        <br />
                        Proceedings
                        <br />
                        Pongmalai, P., Devahastin, S., Chiewchan, N. and
                        Soponronnarit, S., 2013, “Effect of Ultrasonic
                        Pretreatment on Extractability of Glucosinolates from
                        Cabbage Outer Leaves,” Proceedings of the 6th TSAE
                        International Conference, Hua Hin, Thailand, pp.
                        119-122.
                        <br />
                        <br />
                        Tables and Figures
                        <br />
                        All Tables and Figures should NOT be directly inserted
                        in the text. Tables and Figures should be summarized at
                        the end of the manuscript, one table/figure per
                        manuscript page.
                        <br />
                        <br />
                        Tables
                        <br />
                        Add table number, followed by the title of the table,
                        above the table.
                        <br />
                        Figures
                        <br />
                        Add figure number, followed by the title of the figure,
                        under the figure.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </MDBRow> */}
              {/* ******************* */}

              <MDBRow className="d-flex justify-content-between fluid ">
                <MDBCol className=" w-fit px-0 pe-4">
                  <p
                    className="mb-2 text-black"
                    style={{ fontFamily: "FontSemiBold" }}
                  >
                    The authors should also ensure that the following important
                    points have been taken into account:
                  </p>
                  <ul className="list-decimal text-md mb-0">
                    <li className="text-md">
                      The submission has not been previously published, nor it
                      is under consideration by any other journal.
                    </li>
                    <li className="text-md">
                      The submission file should be in OpenOffice, Microsoft
                      Word, RTF, or WordPerfect document file format.
                    </li>
                    <li className="text-md">
                      Where applicable, URLs for the references have been
                      provided.
                    </li>
                    <li className="text-md">
                      Thai manuscript and English manuscript should be prepared
                      using TH Sarabun New size 16 pt.
                    </li>
                    <li className="text-md">
                      The text adheres to the stylistic and bibliographic
                      requirements of the Journal.
                    </li>
                  </ul>
                </MDBCol>
              </MDBRow>

              {/* Manuscript Template */}
              <MDBRow
                ref={templateRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-2xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                >
                  Manuscript Template
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                <div className="d-flex mt-1 text-red px-0">
                  <MDBBtn
                    outline
                    style={{
                      borderColor: "#EB562E",
                      color: "white",
                      backgroundColor: "#EB562E",
                    }}
                    className="me-3 text-sm px-3 capitalize font-bold rounded-0"
                    size="sm"
                  >
                    Download Word File
                  </MDBBtn>
                  <MDBBtn
                    outline
                    style={{
                      borderColor: "white",
                      color: "#EB562E",
                      backgroundColor: "white",
                    }}
                    className="text-sm py-1 px-2 py-2 capitalize font-bold rounded-0"
                    size="sm"
                  >
                    Download PDF File
                  </MDBBtn>
                </div>
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Submission */}
              <MDBRow
                ref={submissionRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-2xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                >
                  Manuscript Submission
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                <ul className="list-decimal text-md ms-2 mb-0">
                  <li className="text-md">
                    Send a manuscript file to journal@kmutt.ac.th. Please also
                    suggest 3 possible reviewers, with full names and e-mail
                    addresses, who can serve as reviewers of the manuscript.
                  </li>
                  <li className="text-md">
                    Manuscript review and publication of an accepted article are
                    free of charge. No article processing charge needs to be
                    paid. Subscription to the journal prior to manuscript
                    submission is not necessary.
                  </li>
                </ul>
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Template */}
              <MDBRow
                ref={instructionRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  className="text-2xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                >
                  Instructions on the Use of Editorial Manager
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <div className="d-flex mt-1 text-red px-0">
                  <MDBBtn
                    outline
                    style={{
                      borderColor: "#EB562E",
                      color: "white",
                      backgroundColor: "#EB562E",
                    }}
                    className="me-3 text-sm px-3 py-2 capitalize font-bold rounded-0"
                    size="sm"
                  >
                    Instructions for Authors
                  </MDBBtn>
                  <MDBBtn
                    outline
                    style={{
                      borderColor: "#EB562E",
                      color: "white",
                      backgroundColor: "#EB562E",
                    }}
                    className="me-3 text-sm px-3 py-2 capitalize font-bold rounded-0"
                    size="sm"
                  >
                    Instructions for Reviewers
                  </MDBBtn>
                </div>
              </MDBRow>

              <MDBRow
                // ref={submissionRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-2xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontMediumTH", fontSize: "1.75rem" }}
                >
                  การสมัครสมาชิกวารสาร
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                <ul className="list-none text-md mb-0 ps-0">
                  <li
                    className=""
                    style={{ fontFamily: "FontMedium", fontSize: "16px" }}
                  >
                    ขอให้ผู้ที่ประสงค์จะสมัครสมาชิกหรือต่ออายุสมาชิกโอนเงินจำนวน
                    300 บาทเข้าบัญชีธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)
                    สาขาถนนประชาอุทิศ ชื่อบัญชี “มจธ.-การวิจัย”
                    บัญชีออมทรัพย์เลขที่ 330-1-17205-8
                  </li>
                </ul>
              </MDBRow>
              <MDBRow className="py-3 ">
                <div className="d-flex text-red px-0">
                  <MDBBtn
                    outline
                    style={{
                      borderColor: "#EB562E",
                      color: "white",
                      backgroundColor: "#EB562E",
                      fontFamily: "FontMediumTH",
                    }}
                    className="me-3 text-sm px-3 py-2 capitalize font-bold rounded-0"
                    size="sm"
                  >
                    ดาวน์โหลด ใบสมัครสมาชิก
                  </MDBBtn>
                </div>
              </MDBRow>
              <MDBRow>
                <ul className="list-none text-md mb-0 ps-0">
                  <li className="text-md">
                    หลังจากโอนเงิน ให้ส่ง ใบสมัครสมาชิก และหลักฐานการโอนเงิน
                    (pay-in-slip) มาที่ e-mail: journal@kmutt.ac.th หรือ
                    โทรสารหมายเลข 0-2872-9083 ทางวารสารฯ
                    จะส่งใบเสร็จรับเงินไปตามรายละเอียดในใบสมัคร
                  </li>
                </ul>
              </MDBRow>
              {/* ******************* */}
            </MDBCol>
            {/* ******************* */}

            {/* Right (Floating) */}
            <MDBCol md="2" className="pe-0">
              <div
                className={`fixed top-0 h-full ${
                  isFixed ? "right-2" : "md:right-2"
                } transition-transform ease-in-out duration-300`}
                style={{
                  position: "sticky",
                  top: "0",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  transform: `translateY(${Math.min(
                    0,
                    window.scrollY * 0.6
                  )}px)`, // Adjust the multiplier (0.2) to control the effect
                }}
              >
                <MDBRow className="justify-content-center ">
                  <p
                    className="text-4xl px-0 text-white"
                    style={{ fontFamily: "FontBold" }}
                  >
                    ""
                  </p>
                </MDBRow>
                <MDBRow className="d-flex justify-content-between fluid py-3">
                  <ul
                    className=""
                    style={{
                      color: "#474747",
                      fontSize: "15px",
                    }}
                  >
                    <li style={styles.listItem}>
                      {/* {policy[0] && ( */}
                      <a
                        className={`${
                          activeTopic === "preparation" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          fontFamily:
                            selectedLanguage === "en"
                              ? activeTopic === "preparation"
                                ? "FontMedium"
                                : "FontRegular"
                              : activeTopic === "preparation"
                              ? "FontThaiSemiBold"
                              : "FontThaiRegular",
                          // Apply the appropriate font family
                          fontWeight:
                            activeTopic === "preparation" ? "bold" : "normal",
                          ...(activeTopic === "preparation"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(preparationRef);
                          setActiveTopic("preparation");
                        }}
                      >
                        {/*                    
                          {selectedLanguage === "en"
                            ? `${policy[0].attributes.header_en} `
                            : `${policy[0].attributes.header_th}`} */}

                        {selectedLanguage === "en"
                          ? "Manuscript Preparation Guidelines"
                          : "ข้อแนะนำในการเตรียมต้นฉบับ"}
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      {/* {policy[0] && ( */}
                      <a
                        className={`${
                          activeTopic === "template" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          fontFamily:
                            selectedLanguage === "en"
                              ? activeTopic === "template"
                                ? "FontSemiBold"
                                : "FontRegular"
                              : activeTopic === "template"
                              ? "FontThaiSemiBold"
                              : "FontThaiRegular",
                          // Apply the appropriate font family
                          fontWeight:
                            activeTopic === "template" ? "bold" : "normal",
                          ...(activeTopic === "template"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(templateRef);
                          setActiveTopic("template");
                        }}
                      >
                        {/*                    
                          {selectedLanguage === "en"
                            ? `${policy[0].attributes.header_en} `
                            : `${policy[0].attributes.header_th}`} */}

                        {selectedLanguage === "en"
                          ? "Manuscript Template"
                          : "รูปแบบการพิมพ์"}
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      {/* {policy[0] && ( */}
                      <a
                        className={`${
                          activeTopic === "submission" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          fontFamily:
                            selectedLanguage === "en"
                              ? activeTopic === "submission"
                                ? "FontSemiBold"
                                : "FontRegular"
                              : activeTopic === "submission"
                              ? "FontThaiSemiBold"
                              : "FontThaiRegular",
                          // Apply the appropriate font family
                          fontWeight:
                            activeTopic === "submission" ? "bold" : "normal",
                          ...(activeTopic === "submission"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(submissionRef);
                          setActiveTopic("submission");
                        }}
                      >
                        {/*                    
                          {selectedLanguage === "en"
                            ? `${policy[0].attributes.header_en} `
                            : `${policy[0].attributes.header_th}`} */}
                        {selectedLanguage === "en"
                          ? "Manuscript Submission"
                          : "การส่งบทความเพื่อรับการพิจารณา"}
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      {/* {policy[0] && ( */}
                      <a
                        className={`${
                          activeTopic === "instruction" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          fontFamily:
                            selectedLanguage === "en"
                              ? activeTopic === "instruction"
                                ? "FontSemiBold"
                                : "FontRegular"
                              : activeTopic === "instruction"
                              ? "FontThaiSemiBold"
                              : "FontThaiRegular",
                          // Apply the appropriate font family
                          fontWeight:
                            activeTopic === "instruction" ? "bold" : "normal",
                          ...(activeTopic === "instruction"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(instructionRef);
                          setActiveTopic("instruction");
                        }}
                      >
                        {/*                    
                          {selectedLanguage === "en"
                            ? `${policy[0].attributes.header_en} `
                            : `${policy[0].attributes.header_th}`} */}

                        {selectedLanguage === "en"
                          ? "Instructions on the Use of Editorial Manager"
                          : "คู่มือสำหรับการใช้ระบบ Editorial Manager"}
                      </a>
                    </li>
                  </ul>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      {/* <ul>
        {publications.map(({ id, attributes }) => (
          <>
            <li key={id}>{attributes.journal[0]?.title}</li>
          </>
        ))}
      </ul> */}
    </div>
  );
}

function GuidelinesMobile() {
  // Ref
  const preparationRef = useRef(null);
  const templateRef = useRef(null);
  const submissionRef = useRef(null);
  const instructionRef = useRef(null);

  // Scroll Ref
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isFixed, setIsFixed] = useState(false);
  const contentRef = useRef(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const handleScroll = () => {
    if (contentRef.current) {
      const { top } = contentRef.current.getBoundingClientRect();
      setIsFixed(top <= 0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Styles object for custom styling
  const styles = {
    listItem: {
      marginBottom: "0.5rem",
    },
    listItemLink: {
      color: "#333",
      textDecoration: "none",
      transition: "color 0.3s",
      fontWeight: "400",
    },
    activeLink: {
      fontWeight: "bold",
      color: "#EB562E",
    },
  };

  // Publication
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.35.29.179:1337/api/publications/?populate=*")
      .then(({ data }) => setPublications(data.data))
      .catch((error) => setError(error));
  }, []);

  // Style
  const isDesktop = useMediaQuery({ minWidth: 940 });
  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
  };
  const tableRowStyle = {
    borderBottom: "1px solid black",
    padding: "0.5rem 0px 0.5rem 0px",
  };
  const tableRowMobile = {
    borderBottom: "1px solid black",
  };
  const cellContentStyle = {
    padding: "0.5rem 0px 0.5rem 0px",
    verticalAlign: "top",
  };

  return (
    <div className="App pt-2">
      <section>
        <MDBContainer
          className="fluid px-5 pt-5 pb-3"
          id="cluster-container"
          style={{ backgroundColor: "#EDEDED" }}
        >
          <MDBRow
            className="justify-content-center py-1"
            style={{
              borderLeft: "0.4rem solid  #EB562E ",
              display: "flex",
              alignItems: "center",
              fontFamily: "FontBold",
              color: "#474747",
            }}
          >
            <p className="m-0 text-2xl">Latest Journal</p>
          </MDBRow>
          <MDBRow className="py-2">
            <MDBCol className=" d-flex flex-col col-4 p-0 py-2">
              <MDBCol className="d-flex p-0" style={{ overflow: "hidden" }}>
                {/* style={{ height: "508px", width: "412px" }} */}
                <img
                  src={journalimage}
                  alt="Your image"
                  className="image-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </MDBCol>
            </MDBCol>
            <MDBCol
              className="d-flex flex-col justify-content-between py-2"
              style={{}}
            >
              <p
                className="m-0 text-xl px-1"
                style={{ color: "#EB562E", fontFamily: "FontBold" }}
              >
                KMUTT Research and Development Journal
              </p>
              <span>
                <p className="m-0 text-sm px-1 ">Volume 46 No. 2</p>
                <p className="m-0 text-sm px-1 ">April - June</p>{" "}
              </span>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer className={`fluid  ${containerStyle["xl"]}`}>
          <MDBRow className="d-flex justify-content-between px-5 py-4 fluid">
            {/* Middle  */}
            <MDBCol md="8" className="px-0">
              {/* Publication Policy  */}
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Guidelines
                </p>
              </MDBRow>
              <MDBRow
                ref={preparationRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  className="col-2"
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
                <MDBCol
                  className="text-xl w-fit  text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Manuscript Preparation Guidelines
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-center ">
                <p
                  className="text-md px-0 text-black"
                  style={{ fontFamily: "FontMedium" }}
                >
                  Authors of a manuscript should adhere to the following
                  Guidelines
                </p>
              </MDBRow>

              <MDBRow className="pt-0 pb-4">
                <table style={tableStyle}>
                  {/* Style table  */}
                  <tbody className="text-sm">
                    <tr style={tableRowStyle} className="py-4">
                      <td style={{ verticalAlign: "top" }}>Title</td>
                      <td style={{ width: "60%", verticalAlign: "top" }}>
                        Title should be concise and cover the main theme of the
                        article
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Authorship</div>
                      </td>
                      <td>
                        List all authors’ information including names, academic
                        positions and affiliations
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Abstract</div>
                      </td>
                      <td>
                        Abstract must be available BOTH in Thai and in English
                        (but on a separate page). Abstract should consist of the
                        research motivation and/or objectives, scope as well as
                        key results.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Introduction</div>
                      </td>
                      <td>
                        Introduction should give the background and literature
                        relevant to the research problem of the article. The
                        research objectives and scope should also be stated.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Material and method</div>
                      </td>
                      <td>
                        This section should be comprehensive enough to allow the
                        reader to repeat the work if necessary.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Results</div>
                      </td>
                      <td>
                        Results should be given via the use of appropriate
                        figures and tables along with adequate captions.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Discussion</div>
                      </td>
                      <td>
                        Emphasize on the main findings and, if applicable,
                        discuss the work in relation to the literature.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td>
                        {" "}
                        <div style={cellContentStyle}>Conclusion</div>
                      </td>
                      <td>
                        Summarize the main findings that should be emphasized.
                        Recommendation and/or suggestion can also be made.
                      </td>
                    </tr>
                    <tr style={tableRowStyle}>
                      <td sx={{ verticalAlign: "top" }}>
                        <div
                          style={cellContentStyle}
                          sx={{ verticalAlign: "top" }}
                        >
                          References
                        </div>
                      </td>
                      <td>
                        Use the number system by giving the reference number(s)
                        in a bracket (e.g. [1], [1,2] or [1-3]) after the
                        referenced statement or author(s).
                        <br />
                        <br />
                        <strong>
                          In the Reference section, follow the following
                          recommended formats:
                        </strong>
                        <br />
                        <br />
                        Journal
                        <br />
                        Pongmalai, P., Devahastin, S., Chiewchan, N. and
                        Soponronnarit, S., 2015, “Enhancement of
                        Microwave-Assisted Extraction of Bioactive Compounds
                        from Cabbage Outer Leaves via the Application of
                        Ultrasonic Pretreatment,” Separation and Purification
                        Technology, 144, pp. 37-45.
                        <br />
                        <br />
                        Book
                        <br />
                        Farmer, R.C., Cheng, G.C., Chen, Y-S. and Pike, R.W.,
                        2009, Computational Transport Phenomena for Engineering
                        Analysis, CRC Press, Boca Raton.
                        <br />
                        <br />
                        Book Chapter
                        <br />
                        Devahastin, S. and Mujumdar, A.S. 2014, “Superheated
                        Steam Drying of Foods and Biomaterials,” pp. 57-84, in
                        E. Tsotsas and A.S. Mujumdar (Eds.) Modern Drying
                        Technology, Vol. 5, Wiley-VCH, Weinheim.
                        <br />
                        <br />
                        Proceedings
                        <br />
                        Pongmalai, P., Devahastin, S., Chiewchan, N. and
                        Soponronnarit, S., 2013, “Effect of Ultrasonic
                        Pretreatment on Extractability of Glucosinolates from
                        Cabbage Outer Leaves,” Proceedings of the 6th TSAE
                        International Conference, Hua Hin, Thailand, pp.
                        119-122.
                        <br />
                        <br />
                        Tables and Figures
                        <br />
                        All Tables and Figures should NOT be directly inserted
                        in the text. Tables and Figures should be summarized at
                        the end of the manuscript, one table/figure per
                        manuscript page.
                        <br />
                        <br />
                        Tables
                        <br />
                        Add table number, followed by the title of the table,
                        above the table.
                        <br />
                        Figures
                        <br />
                        Add figure number, followed by the title of the figure,
                        under the figure.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </MDBRow>
              {/* ******************* */}

              <MDBRow className="d-flex justify-content-between fluid ">
                <MDBCol className=" w-fit px-0 ">
                  <p
                    className="mb-2 text-black text-sm"
                    style={{ fontFamily: "FontMedium" }}
                  >
                    The authors should also ensure that the following important
                    points have been taken into account:
                  </p>
                  <ul className="list-decimal text-sm mb-0 ps-3">
                    <li className="text-sm pb-2">
                      The submission has not been previously published, nor it
                      is under consideration by any other journal.
                    </li>
                    <li className="text-sm pb-2">
                      The submission file should be in OpenOffice, Microsoft
                      Word, RTF, or WordPerfect document file format.
                    </li>
                    <li className="text-sm pb-2">
                      Where applicable, URLs for the references have been
                      provided.
                    </li>
                    <li className="text-sm pb-2">
                      Thai manuscript and English manuscript should be prepared
                      using TH Sarabun New size 16 pt.
                    </li>
                    <li className="text-sm pb-2">
                      The text adheres to the stylistic and bibliographic
                      requirements of the Journal.
                    </li>
                  </ul>
                </MDBCol>
              </MDBRow>

              {/* Manuscript Template */}
              <MDBRow
                ref={templateRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-xl w-fit px-0  text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Manuscript Template
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                <div className="d-flex flex-col justify-between gap-3 mt-1 text-red px-0">
                  <MDBCol>
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                      }}
                      className="me-3 text-sm px-3 py-2 capitalize font-bold rounded-0 w-fit"
                      size="sm"
                    >
                      Download Word File
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol>
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                      }}
                      className="text-sm px-3 py-2 capitalize font-bold rounded-0 w-fit"
                      size="sm"
                    >
                      Download PDF File
                    </MDBBtn>
                  </MDBCol>
                </div>
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Submission */}
              <MDBRow
                ref={submissionRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Manuscript Submission
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                <ul className="list-decimal text-md ms-2 mb-0">
                  <li className="text-sm pb-2">
                    Send a manuscript file to{" "}
                    <span className="underline"> journal@kmutt.ac.th.</span>{" "}
                    Please also suggest 3 possible reviewers, with full names
                    and e-mail addresses, who can serve as reviewers of the
                    manuscript.
                  </li>
                  <li className="text-sm">
                    Manuscript review and publication of an accepted article are
                    free of charge. No article processing charge needs to be
                    paid. Subscription to the journal prior to manuscript
                    submission is not necessary.
                  </li>
                </ul>
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Template */}
              <MDBRow
                ref={instructionRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  className="text-xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Instructions on the Use of Editorial Manager
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <div className="d-flex flex-col justify-between gap-3 mt-1 text-red px-0">
                  <MDBCol>
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                      }}
                      className="me-3 text-sm px-3 py-2 capitalize font-bold rounded-0 w-fit"
                      size="sm"
                    >
                      Instructions for Authors
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol>
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                      }}
                      className="text-sm px-3 py-2 capitalize font-bold rounded-0 w-fit"
                      size="sm"
                    >
                      Instructions for Reviewers
                    </MDBBtn>
                  </MDBCol>
                </div>
              </MDBRow>
            </MDBCol>
            {/* ******************* */}
          </MDBRow>
        </MDBContainer>
      </section>
      <section>
        <MDBContainer>
          <MDBRow style={{ height: "8vh" }}></MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default function Guidelines() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <GuidelinesMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <GuidelinesDesktop />}
    </>
  );
}
