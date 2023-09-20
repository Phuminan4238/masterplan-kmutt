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
        const response = await instance.get(
          "guidelines/?populate=*&filters[topic][$eq]=guidelines"
        );
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

  const [templates, setTemplate] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=template"
      )
      .then(({ data }) => setTemplate(data.data))
      .catch((error) => setError(error));
  }, []);

  const [submissions, setSubmission] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=submission"
      )
      .then(({ data }) => setSubmission(data.data))
      .catch((error) => setError(error));
  }, []);

  const [instructions, setInstruction] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=instructions"
      )
      .then(({ data }) => setInstruction(data.data))
      .catch((error) => setError(error));
  }, []);

  const [subscriptions, setSubscription] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=subscription"
      )
      .then(({ data }) => setSubscription(data.data))
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
          <MDBRow className="d-flex justify-content-between py-6 fluid gx-6 w-fit">
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
                {guidelines.map((guideline) => (
                  <MDBCol
                    md="2"
                    className="text-2xl w-fit ps-4"
                    style={{
                      color: "#EB562E",
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                      fontSize: "1.75rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${guideline.attributes.header_en} `
                      : `${guideline.attributes.header_th}`}
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBRow className="justify-content-center ">
                <p
                  className="text-md px-0 text-black"
                  style={{ fontFamily: "FontSemiBold" }}
                >
                  Authors of a manuscript should adhere to the following
                  Guidelines.
                </p>
              </MDBRow>
              <MDBRow className="pt-0 pb-2">
                {guidelines.map((guideline) => (
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedLanguage === "en"
                          ? guideline.attributes.guideline
                          : guideline.attributes.guideline_th,
                    }}
                  />
                ))}
              </MDBRow>
              {/* ******************* */}

              <MDBRow className="d-flex justify-content-between fluid ">
                <MDBCol className=" w-fit px-0 pe-4">
                  {/* <p
                    className="mb-2 text-black"
                    style={{ fontFamily: "FontSemiBold" }}
                  ><strong> 
                    The authors should also ensure that the following important
                    points have been taken into account:
                    </strong>
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
                  </ul> */}
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
                className="d-flex justify-content-between fluid pb-3 pt-4"
              >
                {templates.map((template) => (
                  <MDBCol
                    md="6"
                    className="text-2xl w-fit px-0 pe-4 "
                    style={{
                      color: "#EB562E",
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                      fontSize: "1.75rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${template.attributes.header_en} `
                      : `${template.attributes.header_th}`}
                  </MDBCol>
                ))}
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
                  <a
                    href="https://journal.kmutt.ac.th/document/รูปแบบการพิมพ์.doc"
                    target="_blank"
                  >
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontBold"
                            : "FontThaiBold",
                      }}
                      className="me-3 text-sm px-3 py-2 capitalize rounded-0"
                      size="sm"
                    >
                      {selectedLanguage === "en"
                        ? "         Download Word File"
                        : "ดาวน์โหลด ไฟล์ Word "}
                    </MDBBtn>
                  </a>{" "}
                  <a
                    href="https://journal.kmutt.ac.th/document/รูปแบบการพิมพ์.pdf"
                    target="_blank"
                  >
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontBold"
                            : "FontThaiBold",
                      }}
                      className="text-sm px-3 py-2 capitalize font-bold rounded-0"
                      size="sm"
                    >
                      {selectedLanguage === "en"
                        ? "         Download PDF File"
                        : "ดาวน์โหลด ไฟล์ PDF "}
                    </MDBBtn>
                  </a>
                </div>
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Submission */}
              <MDBRow
                ref={submissionRef}
                className="d-flex justify-content-between fluid pb-3 pt-4"
              >
                {submissions.map((submission) => (
                  <MDBCol
                    md="6"
                    className="text-2xl w-fit px-0 pe-4"
                    style={{
                      color: "#EB562E",
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                      fontSize: "1.75rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${submission.attributes.header_en} `
                      : `${submission.attributes.header_th}`}
                  </MDBCol>
                ))}
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                {submissions.map((submission) => (
                  <ul
                    className="list-decimal text-md ms-2 mb-0"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiRegular"
                          : "FontThaiRegular",
                    }}
                  >
                    {selectedLanguage === "en" ||
                    !submission.attributes.content_th
                      ? submission.attributes.content_en
                          .split("\n")
                          .map((item, index) => (
                            <li key={index} className="text-md">
                              {item.trim()}
                            </li>
                          ))
                      : submission.attributes.content_th
                          .split("\n")
                          .map((item, index) => (
                            <li key={index} className="text-md">
                              {item.trim()}
                            </li>
                          ))}
                  </ul>
                ))}
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Template */}
              {selectedLanguage === "th" && (
                <MDBRow
                  ref={instructionRef}
                  className="d-flex justify-content-between fluid pb-3 pt-4"
                >
                  {instructions.map((instruction) => (
                    <MDBCol
                      className="text-2xl w-fit px-0 pe-4"
                      style={{
                        color: "#EB562E",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontBold"
                            : "FontThaiBold",
                        fontSize: "1.75rem",
                      }}
                    >
                      {selectedLanguage === "en"
                        ? `${instruction.attributes.header_en} `
                        : `${instruction.attributes.header_th}`}
                    </MDBCol>
                  ))}
                </MDBRow>
              )}

              {selectedLanguage === "th" && (
                <MDBRow>
                  <div className="d-flex mt-1 text-red px-0">
                    <a
                      href="https://journal.kmutt.ac.th/document/Instructions for Authors.doc"
                      className="flex items-center text-white ps-0"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontBold"
                              : "FontThaiBold",
                        }}
                        className="me-3 px-3 py-2 capitalize rounded-0"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "  Instructions for Authors"
                          : "คู่มือสำหรับผู้เขียน"}
                      </MDBBtn>
                    </a>
                    <a
                      href="https://journal.kmutt.ac.th/document/Instructions for Reviewers.doc"
                      className="flex items-center text-white ps-0"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontBold"
                              : "FontThaiBold",
                        }}
                        className="me-3  px-3 py-2 capitalize  rounded-0"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "    Instructions for Reviewers"
                          : "คู่มือสำหรับผู้ประเมิน"}
                      </MDBBtn>
                    </a>
                  </div>
                </MDBRow>
              )}

              {selectedLanguage === "th" && (
                <MDBRow
                  // ref={submissionRef}
                  className="d-flex justify-content-between fluid pb-3 pt-4"
                >
                  {subscriptions.map((subscription) => (
                    <MDBCol
                      md="6"
                      className="text-2xl w-fit px-0 pe-4 "
                      style={{
                        color: "#EB562E",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontThaiBold"
                            : "FontThaiBold",
                        fontSize: "1.75rem",
                      }}
                    >
                      {selectedLanguage === "en"
                        ? `${subscription.attributes.header_en} `
                        : `${subscription.attributes.header_th}`}
                    </MDBCol>
                  ))}
                  <MDBCol
                    className=""
                    style={{
                      borderTop: "1px solid black ",
                      marginTop: "1rem",
                    }}
                  ></MDBCol>
                </MDBRow>
              )}

              {selectedLanguage === "th" && (
                <MDBRow>
                  {subscriptions.map((subscription) => (
                    <ul className="list-none text-md mb-0 ps-0">
                      <li
                        className=""
                        style={{
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontThaiRegular"
                              : "FontThaiRegular",
                          fontSize: "16px",
                        }}
                      >
                        {selectedLanguage === "en"
                          ? `${subscription.attributes.content_en} `
                          : `${subscription.attributes.content_th}`}
                      </li>
                    </ul>
                  ))}
                </MDBRow>
              )}

              {selectedLanguage === "th" && (
                <MDBRow className="py-3 ">
                  <div className="d-flex text-red px-0">
                    <a
                      href="https://journal.kmutt.ac.th/th/membership-application-form.jpg"
                      className="flex items-center text-white ps-0"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontThaiBold"
                              : "FontThaiBold",
                        }}
                        className="me-3 text-sm px-3 py-2 capitalize  rounded-0"
                        size="sm"
                      >
                        ดาวน์โหลด ใบสมัครสมาชิก
                      </MDBBtn>
                    </a>
                  </div>
                </MDBRow>
              )}

              {selectedLanguage === "th" && (
                <MDBRow>
                  {/* Local  */}
                  <ul className="list-none text-md mb-0 ps-0">
                    <li
                      className="text-md"
                      style={{
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontThaiRegular"
                            : "FontThaiRegular",
                      }}
                    >
                      หลังจากโอนเงิน ให้ส่ง ใบสมัครสมาชิก และหลักฐานการโอนเงิน
                      (pay-in-slip) มาที่ e-mail: <u>journal@kmutt.ac.th</u>{" "}
                      หรือ โทรสารหมายเลข 0-2872-9083 ทางวารสารฯ
                      จะส่งใบเสร็จรับเงินไปตามรายละเอียดในใบสมัคร
                    </li>
                  </ul>
                </MDBRow>
              )}
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
        const response = await instance.get(
          "guidelines/?populate=*&filters[topic][$eq]=guidelines"
        );
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

  const [templates, setTemplate] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=template"
      )
      .then(({ data }) => setTemplate(data.data))
      .catch((error) => setError(error));
  }, []);

  const [submissions, setSubmission] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=submission"
      )
      .then(({ data }) => setSubmission(data.data))
      .catch((error) => setError(error));
  }, []);

  const [instructions, setInstruction] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=instructions"
      )
      .then(({ data }) => setInstruction(data.data))
      .catch((error) => setError(error));
  }, []);

  const [subscriptions, setSubscription] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/guidelines?populate=*&filters[topic][$eq]=subscription"
      )
      .then(({ data }) => setSubscription(data.data))
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
              fontFamily:
                selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
              color: "#474747",
            }}
          >
            <p className="m-0 text-2xl">
              {selectedLanguage === "en" ? "Latest Journal" : "วารสารล่าสุด"}
            </p>
          </MDBRow>
          {publications2.map((publication) => (
            <MDBRow className="py-2">
              <MDBCol className=" d-flex flex-col col-4 p-0 py-2">
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
              </MDBCol>
              <MDBCol
                className="d-flex flex-col justify-content-between py-2"
                style={{}}
              >
                {" "}
                <Link
                  to={publication.attributes.journal[0]?.url}
                  target="_blank"
                  style={{ color: "black", padding: "0px" }}
                >
                  <p
                    className="m-0 text-md px-1 text-xl"
                    style={{
                      color: "#EB562E",
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiBold"
                          : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.title}`
                      : `${publication.attributes.journal[0]?.title_th}`}
                  </p>
                </Link>
                <span
                  style={{
                    color: "#474747",
                    fontFamily:
                      selectedLanguage === "en"
                        ? "FontRegular"
                        : "FontThaiRegular",
                  }}
                >
                  <p className="m-0 text-sm px-1 ">
                    {" "}
                    {selectedLanguage === "en"
                      ? `Volumn ${publication.attributes.journal[0]?.volumn} No. ${publication.attributes.journal[0]?.number}`
                      : `ปีที่ ${publication.attributes.journal[0]?.volumn} ฉบับที่ ${publication.attributes.journal[0]?.number}`}
                  </p>
                  <p className="m-0 text-sm px-1 ">
                    {" "}
                    {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_en}`
                      : `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_th}`}{" "}
                    {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_en}`
                      : `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_th}`}
                  </p>{" "}
                </span>
              </MDBCol>
            </MDBRow>
          ))}
        </MDBContainer>
        {/* ******************* */}

        <MDBContainer className={`fluid  ${containerStyle["xl"]}`}>
          {/* Publication Policy  */}
          <MDBRow className="d-flex justify-content-between px-5 py-4 fluid">
            <MDBCol md="8" className="px-0">
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-black"
                  style={{
                    fontFamily:
                      selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
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
                  className="col-2"
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
                {guidelines.map((guideline) => (
                  <MDBCol
                    className="text-xl w-fit  text-black"
                    style={{
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${guideline.attributes.header_en} `
                      : `${guideline.attributes.header_th}`}
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBRow className="justify-content-center ">
                <p
                  className="text-md px-0 text-black"
                  style={{ fontFamily: "FontMedium" }}
                >
                  Authors of a manuscript should <br></br> adhere to the
                  following Guidelines
                </p>
              </MDBRow>
              <MDBRow className="pt-0 pb-2">
                {guidelines.map((guideline) => (
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedLanguage === "en"
                          ? guideline.attributes.guideline
                          : guideline.attributes.guideline_th,
                    }}
                  />
                ))}
              </MDBRow>
              {/* ******************* */}

              <MDBRow className="d-flex justify-content-between fluid ">
                <MDBCol className=" w-fit px-0 ">
                  <p
                    className="mb-2 text-black text-sm"
                    style={{ fontFamily: "FontMedium", fontSize: "16px" }}
                  >
                    The authors should also ensure that the following important
                    points have been taken into account:
                  </p>
                  <ul className="list-decimal text-md mb-0 ps-3">
                    <li className="text-md pb-2">
                      The submission has not been previously published, nor it
                      is under consideration by any other journal.
                    </li>
                    <li className="text-md pb-2">
                      The submission file should be in OpenOffice, Microsoft
                      Word, RTF, or WordPerfect document file format.
                    </li>
                    <li className="text-md pb-2">
                      Where applicable, URLs for the references have been
                      provided.
                    </li>
                    <li className="text-md pb-2">
                      Thai manuscript and English manuscript should be prepared
                      using TH Sarabun New size 16 pt.
                    </li>
                    <li className="text-md pb-2">
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
                {templates.map((template) => (
                  <MDBCol
                    md=""
                    className="text-xl w-fit px-0  text-black"
                    style={{
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${template.attributes.header_en} `
                      : `${template.attributes.header_th}`}
                  </MDBCol>
                ))}
                <MDBCol
                  className="col-2"
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                <div className="d-flex flex-col justify-between gap-3 mt-1 text-red px-0">
                  <MDBCol>
                    <a
                      href="https://journal.kmutt.ac.th/document/รูปแบบการพิมพ์.doc"
                      target="_blank"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                        }}
                        className="me-3  px-3 py-2 capitalize font-bold rounded-0 w-fit"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "         Download Word File"
                          : "ดาวน์โหลด ไฟล์ Word "}
                      </MDBBtn>
                    </a>
                  </MDBCol>
                  <MDBCol>
                    <a
                      href="https://journal.kmutt.ac.th/document/รูปแบบการพิมพ์.pdf"
                      target="_blank"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                        }}
                        className=" px-3 py-2 capitalize font-bold rounded-0 w-fit"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "         Download PDF File"
                          : "ดาวน์โหลด ไฟล์ PDF "}
                      </MDBBtn>
                    </a>
                  </MDBCol>
                </div>
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Submission */}
              <MDBRow
                ref={submissionRef}
                className="d-flex justify-content-between fluid py-3"
              >
                {submissions.map((submission) => (
                  <MDBCol
                    md="6"
                    className="text-xl w-fit px-0 pe-4 text-black"
                    style={{
                      // fontSize: "20px",
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${submission.attributes.header_en} `
                      : `${submission.attributes.header_th}`}
                  </MDBCol>
                ))}
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                {submissions.map((submission) => (
                  <ul
                    className="list-decimal text-md ms-2 mb-0"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiRegular"
                          : "FontThaiRegular",
                    }}
                  >
                    {selectedLanguage === "en" ||
                    !submission.attributes.content_th
                      ? submission.attributes.content_en
                          .split("\n")
                          .map((item, index) => (
                            <li key={index} className="text-md">
                              {item.trim()}
                            </li>
                          ))
                      : submission.attributes.content_th
                          .split("\n")
                          .map((item, index) => (
                            <li key={index} className="text-md">
                              {item.trim()}
                            </li>
                          ))}
                  </ul>
                ))}
              </MDBRow>
              {/* ******************* */}

              {/* Manuscript Template */}
              <MDBRow
                ref={instructionRef}
                className="d-flex justify-content-between fluid py-3 pt-4"
              >
                {instructions.map((instruction) => (
                  <MDBCol
                    className="text-xl w-fit px-0 pe-4 text-black"
                    style={{
                      fontFamily:
                        selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${instruction.attributes.header_en} `
                      : `${instruction.attributes.header_th}`}
                  </MDBCol>
                ))}
              </MDBRow>
              <MDBRow>
                <div className="d-flex flex-col justify-between gap-3 mt-1 text-red px-0">
                  <MDBCol>
                    <a
                      href="https://journal.kmutt.ac.th/document/Instructions for Authors.doc"
                      className="flex items-center text-white ps-0"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontBold"
                              : "FontThaiBold",
                        }}
                        className="me-3 px-3 py-2 capitalize font-bold rounded-0 w-fit"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "  Instructions for Authors"
                          : "คู่มือสำหรับผู้เขียน"}
                      </MDBBtn>
                    </a>
                  </MDBCol>
                  <MDBCol>
                    <a
                      href="https://journal.kmutt.ac.th/document/Instructions for Reviewers.doc"
                      className="flex items-center text-white ps-0"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "#EB562E",
                          color: "white",
                          backgroundColor: "#EB562E",
                          fontSize: "16px",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontBold"
                              : "FontThaiBold",
                        }}
                        className="px-3 py-2 capitalize font-bold rounded-0 w-fit"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "    Instructions for Reviewers"
                          : "คู่มือสำหรับผู้ประเมิน"}
                      </MDBBtn>
                    </a>
                  </MDBCol>
                </div>
              </MDBRow>

              <MDBRow
                // ref={submissionRef}
                className="d-flex justify-content-between fluid pb-3 pt-4"
              >
                {subscriptions.map((subscription) => (
                  <MDBCol
                    md="6"
                    className="text-xl w-fit px-0 pe-4 text-black"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiBold"
                          : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${subscription.attributes.header_en} `
                      : `${subscription.attributes.header_th}`}
                  </MDBCol>
                ))}
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              <MDBRow>
                {subscriptions.map((subscription) => (
                  <ul className="list-none text-md mb-0 ps-0">
                    <li
                      className=""
                      style={{
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontThaiRegular"
                            : "FontThaiRegular",
                        fontSize: "16px",
                      }}
                    >
                      {selectedLanguage === "en"
                        ? `${subscription.attributes.content_en} `
                        : `${subscription.attributes.content_th}`}
                    </li>
                  </ul>
                ))}
              </MDBRow>
              <MDBRow className="py-3 ">
                <div className="d-flex text-red px-0">
                  <a
                    href="https://journal.kmutt.ac.th/th/membership-application-form.jpg"
                    className="flex items-center text-white ps-0"
                  >
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                        fontSize: "16px",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontThaiBold"
                            : "FontThaiBold",
                      }}
                      className="me-3 text-sm px-3 py-2 capitalize  rounded-0"
                      size="sm"
                    >
                      ดาวน์โหลด ใบสมัครสมาชิก
                    </MDBBtn>
                  </a>
                </div>
              </MDBRow>
              <MDBRow>
                {/* Local  */}
                <ul className="list-none text-md mb-0 ps-0">
                  <li
                    className="text-md"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiRegular"
                          : "FontThaiRegular",
                    }}
                  >
                    หลังจากโอนเงิน ให้ส่ง ใบสมัครสมาชิก และหลักฐานการโอนเงิน
                    (pay-in-slip) มาที่ e-mail: <u>journal@kmutt.ac.th</u> หรือ
                    โทรสารหมายเลข 0-2872-9083 ทางวารสารฯ
                    จะส่งใบเสร็จรับเงินไปตามรายละเอียดในใบสมัคร
                  </li>
                </ul>
              </MDBRow>
              {/* ******************* */}
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
