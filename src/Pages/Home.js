import React, { useContext } from "react";
import { useState, useEffect, setIsLoaded } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useMediaQuery } from "react-responsive";
import journalimage from "../Images/journal-image.png";
import welcomecover from "../Images/welcome-cover.png";
import { text } from "@fortawesome/fontawesome-svg-core";
import { LanguageContext } from "../Components/LanguageContext";
import Container from "@mui/material/Container";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EastIcon from "@mui/icons-material/East";
import plan from "../Images/plan.png";

// Component
import PublicationComponent from "../Components/Publication";

function HomeDesktop() {
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);
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
          setPublications(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (publications.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [publications]);
  console.log(publications);

  const [uploadfiles, setUploadfiles] = useState([]);
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
          "uploadfiles/?populate=*&filters[filetype][$eq]=image"
        );
        if (isMounted) {
          setUploadfiles(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (uploadfiles.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [uploadfiles]);

  // About
  const [aboutData, setAboutData] = useState(null);
  const [officeData, setOfficeData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [hasDataFetched, setHasDataFetched] = useState(false);
  useEffect(() => {
    if (!hasDataFetched) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://10.35.29.179:1337/api/contacts/?populate=*"
          );
          const data = response.data.data;
          if (data && data.length > 0) {
            // Filter data for each type based on the ID
            const aboutInfo = data.find((item) => item.id === 1);
            const officeInfo = data.find((item) => item.id === 2);
            const locationInfo = data.find((item) => item.id === 3);

            setAboutData(aboutInfo ? aboutInfo.attributes : null);
            setOfficeData(officeInfo ? officeInfo.attributes : null);
            setLocationData(locationInfo ? locationInfo.attributes : null);
          }
          setHasDataFetched(true);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [hasDataFetched]);

  const isDesktop = useMediaQuery({ minWidth: 940 });

  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };

  const textStyle = {
    color: "#AE023E",
  };

  const btnStyle = {
    borderColor: "#EB562E !important",
  };

  const secondContainerStyle = {
    zIndex: 1,
    padding: "5rem",
    paddingTop: "4rem",
  };

  const rowStyle = {
    display: "inline-flex",
    alignItems: "center",
  };

  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  return (
    <div className="App">
      <section>
        <MDBContainer>
          <MDBContainer style={secondContainerStyle}>
            <MDBRow>
              <MDBCol md="3">1</MDBCol>
              <MDBCol md="3">2</MDBCol>
              <MDBCol md="3">3</MDBCol>
              <MDBCol md="3">4</MDBCol>
            </MDBRow>
            <MDBRow>
              <img
                src={plan}
                alt="Your image"
                className="image-fluid"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
        <MDBContainer
          id="cluster-container"
          style={{
            background: "#474747",
            height: "460px",
          }}
        >
          <MDBContainer
            style={secondContainerStyle}
            // className={`max-w-${containerStyle.maxWidth}`}
            // className={`max-w-${containerStyle["6xl"]}`}
          >
            <MDBRow
              // className="justify-content-center"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {publications.map((publication) => (
                <MDBCol md="4" className="ms-4 me-4 px-0" key={publication.id}>
                  <img
                    // src={journalimage}
                    src={
                      "http://10.35.29.179:1337" +
                      publication.attributes.journal[0]?.uploadfiles.data[0]
                        ?.attributes.fileupload?.data[1]?.attributes.url
                    }
                    style={{
                      width: "100%",
                      height: "",
                      maxHeight: "528px",
                    }}
                  />
                  {/* <h2>{pu blication.attributes.journal[0]?.title}</h2> */}
                </MDBCol>
              ))}
              {publications.map((publication) => (
                <MDBCol md="7" className="md:ms-4 pb-5" key={publication.id}>
                  <div className="d-flex flex-column w-100">
                    <p
                      className="font-bold mb-0 px-2 py-1 xs:text-sm md:text-sm w-fit uppercase"
                      style={{
                        fontFamily: "FontMediumTH",
                        backgroundColor: "#fce2db",
                        color: "#EB562E",
                      }}
                    >
                      {selectedLanguage === "en"
                        ? "Latest Journal"
                        : "วารสารล่าสุด"}
                    </p>
                    <div className="d-flex flex-column mt-auto">
                      {/* <p
                        className="pb-2 text-white"
                        style={{
                          fontSize: "0.5rem",
                          fontFamily: "FontMediumTH",
                        }}
                      >
                        KMUTT Research
                      </p> */}
                      <p
                        className="m-0 pt-3 pb-2 text-white"
                        style={{
                          fontSize: "2rem",
                          fontFamily: "FontMediumTH",
                          maxWidth: "80%", // Set a maximum width for the title
                          overflowWrap: "break-word", // Allow word wrapping within the title
                        }}
                      >
                        {selectedLanguage === "en"
                          ? `${publication.attributes.journal[0]?.title}`
                          : `${publication.attributes.journal[0]?.title_th}`}
                      </p>
                      {/* <p
                        className="pb-2 text-white"
                        style={{ fontSize: "2rem", fontFamily: "FontMediumTH" }}
                      >
                        and Development Journal
                      </p> */}
                      <p
                        className="text-white mb-0"
                        style={{
                          fontSize: "1.5rem",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontMedium"
                              : "FontThaiMedium",
                        }}
                      >
                        {/* Volumn 46 No. 2 */}
                        {selectedLanguage === "en"
                          ? `Volumn ${publication.attributes.journal[0]?.volumn} No. ${publication.attributes.journal[0]?.number}`
                          : `ปีที่ ${publication.attributes.journal[0]?.volumn} ฉบับที่ ${publication.attributes.journal[0]?.number}`}{" "}
                        {""}
                        {selectedLanguage === "en"
                          ? `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_en}`
                          : `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_th}`}{" "}
                        {selectedLanguage === "en"
                          ? `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_en}`
                          : `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_th}`}
                      </p>
                      {/* <p
                        className="text-white mb-0"
                        style={{
                          fontSize: "1.5rem",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontMedium"
                              : "FontThaiMedium",
                        }}
                      >
                        <p>
                          {selectedLanguage === "en"
                            ? `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_en}`
                            : `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_th}`}{" "}
                          {selectedLanguage === "en"
                            ? `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_en}`
                            : `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_th}`}
                        </p>
                      </p> */}
                    </div>
                    <div className="d-flex pt-4">
                      <Link
                        to={publication.attributes.journal[0]?.url}
                        target="_blank"
                        style={{ color: "black" }}
                      >
                        <MDBBtn
                          outline
                          style={{
                            borderColor: "#EB562E",
                            color: "white",
                            backgroundColor: "#EB562E",
                            fontFamily:
                              selectedLanguage === "en"
                                ? "FontMedium"
                                : "FontThaiMedium",
                          }}
                          className="me-3 text-sm px-3 capitalize font-bold rounded-0"
                          size="sm"
                        >
                          {selectedLanguage === "en"
                            ? "Read more"
                            : "อ่านเพิ่มเติม"}
                        </MDBBtn>
                      </Link>
                      <a
                        href="https://ripo.kmutt.ac.th/publication/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white"
                      >
                        <MDBBtn
                          outline
                          style={{
                            borderColor: "white",
                            color: "#EB562E",
                            backgroundColor: "white",
                            fontFamily:
                              selectedLanguage === "en"
                                ? "FontMedium"
                                : "FontThaiMedium",
                          }}
                          className="text-sm py-1 px-2 capitalize font-bold rounded-0"
                          size="sm"
                        >
                          {selectedLanguage === "en"
                            ? "Explore All"
                            : "ค้นหาทั้งหมด"}
                        </MDBBtn>
                      </a>
                    </div>
                  </div>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </section>

      {/* Middle  */}
      <section>
        <MDBContainer>
          <MDBRow style={{ height: "20vh" }}></MDBRow>
          <MDBRow
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {uploadfiles.map((uploadfile) => (
              <MDBCol md="4" className="ms-4 me-4 px-0" key={uploadfile.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center", // Horizontally center the image
                    alignItems: "center", // Vertically center the image
                  }}
                >
                  {uploadfile.attributes.image_square?.data?.attributes
                    ?.url && (
                    <img
                      src={`http://10.35.29.179:1337${uploadfile.attributes.image_square.data.attributes.url}`}
                      style={{
                        width: "80%",
                        height: "auto",
                        // maxHeight: "528px",
                      }}
                    />
                  )}
                </div>
              </MDBCol>
            ))}
          </MDBRow>
          <MDBRow style={{ height: "20vh" }}></MDBRow>
        </MDBContainer>
      </section>
      <section>
        <MDBContainer className={`fluid px-3  ${containerStyle["6xl"]}`}>
          <MDBRow className="d-flex justify-content-between pt-2 pb-6 fluid gx-6">
            <MDBCol
              className="text-3xl w-fit ps-0 text-center"
              style={{
                color: "#EB562E",
                fontFamily:
                  selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
              }}
            >
              {selectedLanguage === "en"
                ? `${aboutData?.header_en}`
                : `${aboutData?.header_th}`}
            </MDBCol>
          </MDBRow>
          <MDBRow className="justify-content-center ">
            <p
              className="text-md px-0 "
              style={{
                fontFamily:
                  selectedLanguage === "en" ? "FontRegular" : "FontThaiRegular",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  selectedLanguage === "en"
                    ? aboutData?.content_markdown
                    : aboutData?.content_markdown_th,
              }}
            />
          </MDBRow>
        </MDBContainer>
        {/* 
        <MDBContainer
          className="fluid p-0 px-0"
          style={{
            display: "flex",
            alignItems: "center",
            height: "828px",
            width: "-webkit-fill-available",
            justifyContent: "center",
          }}
        >
          <MDBContainer className={`fluid px-2 ${containerStyle["6xl"]}`}>
            <MDBRow
              className="justify-content-center"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#EB562E",
                width: "inherit",
                margin: "0", // Add this to remove default margin
                overflow: "hidden",
              }}
              id="cluster-gutter"
            >
              <MDBCol
                md="8"
                className="d-flex p-6"
                style={{
                  display: "flex",
                  padding: "48px 250px 48px 48px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div className="d-flex flex-column w-100">
                  <p
                    className="font-bold mb-3 xs:pt-0 md:pt-0 xs:text-md md:text-lg"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontMedium"
                          : "FontThaiMedium",
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Welcome to"
                      : "ยินดีต้อนรับสู่"}
                  </p>
                  <div
                    className="d-flex justify-content-between flex-col mt-auto xs:text-base text-sm py-4 text-white"
                    id="news-underline"
                  >
                    <p
                      className="pb-2"
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      KMUTT Research
                    </p>
                    <p
                      className="pb-2"
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      and Development
                    </p>
                    <p
                      className=""
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      Journal
                    </p>
                  </div>
                  <div className="d-flex  mt-1 text-red">
                    <Link
                      to={`/about-us`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.replace(`about-us`);
                      }}
                      className="flex items-center text-white"
                    >
                      <MDBBtn
                        outline
                        style={{
                          borderColor: "white",
                          color: "#EB562E",
                          backgroundColor: "white",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontMedium"
                              : "FontThaiMedium",
                        }}
                        className=" text-sm px-btn capitalize font-extrabold rounded-0"
                        size="lg"
                      >
                        {selectedLanguage === "en" ? "Contact us" : "ติดต่อเรา"}
                      </MDBBtn>
                    </Link>
                  </div>
                </div>
              </MDBCol>
              <MDBCol
                md="4"
                className="d-flex p-0"
                style={{ overflow: "hidden" }}
              >
                <img
                  src={welcomecover}
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
          </MDBContainer> */}
        {/* </MDBContainer> */}
      </section>
      <PublicationComponent></PublicationComponent>
      <section>
        <MDBContainer className={`fluid px-2 pb-5 ${containerStyle["6xl"]}`}>
          <MDBRow className="d-flex justify-content-between fluid pt-0 pb-3">
            <MDBCol
              md="6"
              className="text-2xl w-fit px-0 pe-4"
              style={{
                color: "#EB562E",
                fontSize: "1.75rem",
                fontFamily:
                  selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
              }}
            >
              {selectedLanguage === "en"
                ? `${officeData?.header_en}`
                : `${officeData?.header_th}`}
            </MDBCol>
            <MDBCol
              className=""
              style={{
                borderTop: "1px solid black ",
                marginTop: "1rem",
              }}
            ></MDBCol>
          </MDBRow>
          <MDBRow className="justify-content-center">
            <p
              className="text-md px-0"
              style={{
                fontFamily:
                  selectedLanguage === "en" ? "FontRegular" : "FontThaiRegular",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  selectedLanguage === "en"
                    ? officeData?.content_markdown
                    : officeData?.content_markdown_th,
              }}
            />
          </MDBRow>
          <MDBRow>
            <p
              className="text-lg px-0 mb-0  text-black"
              style={{
                fontFamily:
                  selectedLanguage === "en" ? "FontBold" : "FontThaiBold",
              }}
            >
              {selectedLanguage === "en"
                ? `${locationData?.header_en}`
                : `${locationData?.header_th}`}
            </p>
            <p
              className="text-md px-0 "
              style={{
                fontFamily:
                  selectedLanguage === "en" ? "FontRegular" : "FontThaiRegular",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  selectedLanguage === "en"
                    ? locationData?.content_markdown
                    : locationData?.content_markdown_th,
              }}
            />
          </MDBRow>
        </MDBContainer>
      </section>
      <section>
        <MDBContainer
          className="fluid p-0 px-0"
          id="cluster-container"
          style={{ height: "60vh" }}
        >
          {" "}
          <MDBRow
            className="p-0"
            id="cluster-gutter"
            style={{ height: "inherit" }}
          >
            {/* <MDBCol
              md="6"
              order="1"
              className="d-flex flex-col justify-content-center"
              style={{ height: "inherit" }}
            >
              <div
                className="d-flex flex-col  w-100 gap-4 p-6"
                style={{ backgroundColor: "#EB562E", height: "100%" }}
              >
                <div
                  className="d-flex justify-content-between flex-col mt-auto xs:text-base text-sm py-4 text-white"
                  id="news-underline"
                  style={{ backgroundColor: "#EB562E" }}
                >
                  <p
                    className="font-bold mb-3 xs:pt-0 md:pt-0 xs:text-md md:text-lg"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontMedium"
                          : "FontThaiMedium",
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Welcome to"
                      : "ยินดีต้อนรับสู่"}
                  </p>
                  <p
                    className="pb-2"
                    style={{
                      fontSize: "2.8rem",
                      fontFamily: "FontMediumTH",
                    }}
                  >
                    KMUTT Research
                  </p>
                  <p
                    className="pb-2"
                    style={{
                      fontSize: "2.8rem",
                      fontFamily: "FontMediumTH",
                    }}
                  >
                    and Development
                  </p>
                  <p
                    className=""
                    style={{
                      fontSize: "2.8rem",
                      fontFamily: "FontMediumTH",
                    }}
                  >
                    Journal
                  </p>
                </div>
                <div className="d-flex  mt-1 text-red">
                  <Link
                    to={`/about-us`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.replace(`about-us`);
                    }}
                    className="flex items-center text-white"
                  >
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "white",
                        color: "#EB562E",
                        backgroundColor: "white",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontMedium"
                            : "FontThaiMedium",
                      }}
                      className=" text-sm px-btn capitalize font-extrabold rounded-0"
                      size="lg"
                    >
                      {selectedLanguage === "en" ? "Contact us" : "ติดต่อเรา"}
                    </MDBBtn>
                  </Link>
                </div>
              </div>
            </MDBCol> */}
            <MDBCol
              md="6"
              order="1"
              className="d-flex flex-col"
              style={{ height: "inherit" }}
            >
              <div
                className="d-flex flex-row justify-content-between align-items-center w-100 gap-4 p-6"
                style={{ backgroundColor: "#EB562E", height: "100%" }}
              >
                <div
                  className="d-flex flex-col xs:text-base text-sm py-4 text-white"
                  id="news-underline"
                  style={{ backgroundColor: "#EB562E" }}
                >
                  <p
                    className="font-bold xs:pt-0 md:pt-0 xs:text-md md:text-lg"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontMedium"
                          : "FontThaiMedium",
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Welcome to"
                      : "ยินดีต้อนรับสู่"}
                  </p>
                  <div className="py-3">
                    <p
                      className="pb-2"
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      KMUTT Research
                    </p>
                    <p
                      className="pb-2"
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      and Development
                    </p>
                    <p
                      className=""
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      Journal
                    </p>
                  </div>
                  <Link
                    to={`/about-us`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.replace(`about-us`);
                    }}
                    className="flex items-center text-white "
                  >
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "white",
                        color: "#EB562E",
                        backgroundColor: "white",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontMedium"
                            : "FontThaiMedium",
                      }}
                      className=" text-sm px-btn capitalize font-extrabold rounded-0"
                      size="lg"
                    >
                      {selectedLanguage === "en" ? "Contact us" : "ติดต่อเรา"}
                    </MDBBtn>
                  </Link>
                </div>
                {/* <div className="d-flex mt-1 text-red">
                  <Link
                    to={`/about-us`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.replace(`about-us`);
                    }}
                    className="flex items-center text-white"
                  >
                    <MDBBtn
                      outline
                      style={{
                        borderColor: "white",
                        color: "#EB562E",
                        backgroundColor: "white",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontMedium"
                            : "FontThaiMedium",
                      }}
                      className=" text-sm px-btn capitalize font-extrabold rounded-0"
                      size="lg"
                    >
                      {selectedLanguage === "en" ? "Contact us" : "ติดต่อเรา"}
                    </MDBBtn>
                  </Link>
                </div> */}
              </div>
            </MDBCol>
            <MDBCol
              md="6"
              order="1"
              className="d-flex flex-col"
              style={{ height: "inherit" }}
            >
              <div
                className="d-flex flex-row justify-content-between align-items-end w-100 gap-4 p-6"
                style={{ backgroundColor: "#000", height: "100%" }}
              >
                <Link
                  to={`/guidelines`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`guidelines`);
                  }}
                  className="flex items-center text-white"
                >
                  <p
                    className="text-white mb-0 xs:text-xl md:text-5xl"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontSemiBold"
                          : "FontThaiSemiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Our Guidelines"
                      : "คู่มือการใช้งาน"}
                  </p>
                </Link>
                <Link
                  to={`/guidelines`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`guidelines`);
                  }}
                  className="flex items-center text-white"
                >
                  <span>
                    <ArrowForwardIcon
                      style={{ color: "white", fontSize: "4rem" }}
                    ></ArrowForwardIcon>
                  </span>
                </Link>
              </div>
              <div
                className="d-flex flex-row flex-wrap justify-content-between align-items-center w-100 gap-4 p-6 py-4"
                style={{ backgroundColor: "#474747" }}
                // minHeight: "10vh"
              >
                <Link
                  to={`/journal`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`journal`);
                  }}
                  className="flex items-center text-white"
                  style={{ flex: "1" }}
                >
                  <p
                    className="text-white mb-0 xs:text-xl md:text-2xl"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontSemiBold"
                          : "FontThaiSemiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Read KMUTT R&D Journal Online"
                      : "วารสารเพิ่มเติม"}
                  </p>
                </Link>
                <Link
                  to={`/journal`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`journal`);
                  }}
                  className=" items-center text-white"
                >
                  <span>
                    <ArrowForwardIcon
                      style={{ color: "white", fontSize: "4rem" }}
                    ></ArrowForwardIcon>
                  </span>
                </Link>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section>
        <MDBContainer>
          <MDBRow style={{ height: "1vh" }}></MDBRow>
        </MDBContainer>
      </section>
      {/* <ul>
        {publications.map(({ id, attributes }) => (
          <>
            <li key={id}>{attributes.createdAt}</li>
            <li key={id}>{attributes.journal[0]?.title}</li>
          </>
        ))}
      </ul> */}
      {/* </Container> */}
    </div>
  );
}

function HomeMobile() {
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);

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
          setPublications(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (publications.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [publications]);

  console.log(publications);
  const isDesktop = useMediaQuery({ minWidth: 940 });

  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };

  const textStyle = {
    color: "#AE023E",
  };

  const btnStyle = {
    borderColor: "#EB562E !important",
  };

  const rowStyle = {
    display: "inline-flex",
    alignItems: "center",
  };

  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  return (
    <div className="App pt-2">
      {/* <Container
        maxWidth="xl"
        disableGutters={true}
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px" }}
      > */}
      <section>
        <MDBContainer
          id="cluster-container"
          className="p-5"
          style={{
            background: "#474747",
          }}
        >
          <MDBContainer
            // className={`max-w-${containerStyle.maxWidth}`}
            // className={`max-w-${containerStyle["6xl"]}`}
            className="p-0"
          >
            <MDBRow
              // className="justify-content-center"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <MDBCol className="p-0">
                <div>
                  <p
                    className="font-bold mb-2 px-2 py-1 xs:text-lg w-fit uppercase"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontMedium"
                          : "FontThaiMedium",
                      backgroundColor: "white",
                      color: "#EB562E",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Latest Journal"
                      : "วารสารล่าสุด"}
                  </p>
                </div>
              </MDBCol>
              {publications.map((publication) => (
                <MDBCol md="4" key={publication.id} className="p-0">
                  <img
                    // src={journalimage}
                    src={
                      "http://10.35.29.179:1337" +
                      publication.attributes.journal[0]?.uploadfiles.data[0]
                        ?.attributes.fileupload?.data[1]?.attributes.url
                    }
                    style={{ width: "100%" }}
                  />
                  {/* <h2>{publication.attributes.journal[0]?.title}</h2> */}
                </MDBCol>
              ))}
              {publications.map((publication) => (
                <MDBCol md="7" key={publication.id} className="p-0">
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex flex-column mt-auto">
                      <p
                        className=" text-white mb-2"
                        style={{
                          fontSize: "1.6rem",
                          fontFamily: "FontMediumTH",
                          maxWidth: "80%", // Set a maximum width for the title
                          overflowWrap: "break-word", // Allow word wrapping within the title
                        }}
                      >
                        {selectedLanguage === "en"
                          ? `${publication.attributes.journal[0]?.title}`
                          : `${publication.attributes.journal[0]?.title_th}`}
                      </p>
                      {/* <p
                        className="pb-2 text-white"
                        style={{ fontSize: "2rem", fontFamily: "FontMediumTH" }}
                      >
                        and Development Journal
                      </p> */}
                      <p
                        className="text-white mb-0"
                        style={{
                          fontSize: "1.1rem",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontMedium"
                              : "FontThaiMedium",
                        }}
                      >
                        {/* Volumn 46 No. 2 */}
                        {selectedLanguage === "en"
                          ? `Volumn ${publication.attributes.journal[0]?.volumn} Number ${publication.attributes.journal[0]?.number}`
                          : `ปีที่ ${publication.attributes.journal[0]?.volumn} ฉบับที่ ${publication.attributes.journal[0]?.number}`}
                      </p>
                      <p
                        className="text-white mb-3"
                        style={{
                          fontSize: "1.1rem",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontMedium"
                              : "FontThaiMedium",
                        }}
                      >
                        {selectedLanguage === "en"
                          ? `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_en}`
                          : `${publication.attributes.journal[0]?.months?.data[0]?.attributes.name_th}`}{" "}
                        {selectedLanguage === "en"
                          ? `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_en}`
                          : `${publication.attributes.journal[0]?.year?.data[0]?.attributes.name_th}`}
                        {/* 
                        {publication.attributes.journal.map((journalEntry) => (
                          <div key={journalEntry.id}>
                            {journalEntry.months?.data.map((tag) => (
                              <p key={tag.id}>{tag.attributes.name_en}</p>
                            ))}
                          </div>
                        ))} */}
                        {/* {publication.attributes.journal.map((journalEntry) => (
                          <div key={journalEntry.id}>
                            {journalEntry.months?.data.map((tag) => (
                              <p key={tag.id}>{tag.attributes.name_en}</p>
                            ))}
                          </div>
                        ))} */}
                      </p>
                    </div>

                    <div
                      className="d-flex flex-col align-items-center justify-content-center mb-2 py-2"
                      style={{
                        borderColor: "#EB562E",
                        color: "white",
                        backgroundColor: "#EB562E",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontSemiBold"
                            : "FontThaiSemiBold",
                      }}
                    >
                      <Link
                        to={publication.attributes.journal[0]?.url}
                        target="_blank"
                        style={{ color: "white" }}
                      >
                        {selectedLanguage === "en"
                          ? "Read more"
                          : "อ่านเพิ่มเติม"}
                      </Link>
                    </div>

                    <div
                      className="d-flex flex-col align-items-center justify-content-center"
                      style={{
                        borderColor: "white",
                        color: "#EB562E",
                        backgroundColor: "white",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontMedium"
                            : "FontThaiMedium",
                      }}
                    >
                      <a
                        href="https://ripo.kmutt.ac.th/publication/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          color: "#EB562E",
                          fontFamily:
                            selectedLanguage === "en"
                              ? "FontSemiBold"
                              : "FontThaiSemiBold",
                        }} // Set the width to 100%
                        className=" text-center py-2"
                      >
                        {selectedLanguage === "en"
                          ? "Explore All"
                          : "ค้นหาทั้งหมด"}
                      </a>
                    </div>
                  </div>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </section>

      <section>
        <MDBContainer>
          <MDBRow style={{ height: "14vh" }}></MDBRow>
        </MDBContainer>
        <MDBContainer
          className="fluid p-0 px-0"
          style={{
            display: "flex",
            alignItems: "center",
            width: "-webkit-fill-available",
            justifyContent: "center",
          }}
        >
          <MDBContainer className={`fluid pb-5 px-3 ${containerStyle["6xl"]}`}>
            <MDBRow
              className="justify-content-center"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#EB562E",
                width: "inherit",
                margin: "0", // Add this to remove default margin
                overflow: "hidden",
              }}
              id="cluster-gutter"
            >
              <MDBCol
                md="4"
                className="d-flex p-0"
                style={{ overflow: "hidden", height: "280px" }}
              >
                <img
                  src={welcomecover}
                  alt="Your image"
                  className="image-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </MDBCol>
              <MDBCol
                md="8"
                className="d-flex p-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div className="d-flex flex-column w-100">
                  <p
                    className="font-bold mb-0 xs:pt-0 md:pt-0 xs:text-md md:text-lg"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontMedium"
                          : "FontThaiMedium",
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "    Welcome to"
                      : "ยินดีต้อนรับสู่"}
                  </p>
                  <div
                    className="d-flex justify-content-between flex-col mt-auto xs:text-base text-sm py-4 text-white"
                    id="news-underline"
                  >
                    <p
                      className="pb-1"
                      style={{
                        fontSize: "2rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      KMUTT Research
                    </p>
                    <p
                      className="pb-1"
                      style={{
                        fontSize: "2rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      & Development
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "2rem",
                        fontFamily: "FontMediumTH",
                      }}
                    >
                      Journal
                    </p>
                  </div>
                  <div
                    className="d-flex flex-col align-items-center justify-content-center mt-2"
                    style={{
                      borderColor: "white",
                      color: "#EB562E",
                      backgroundColor: "white",
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontMedium"
                          : "FontThaiMedium",
                    }}
                  >
                    <Link
                      to={`/about-us`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.replace(`about-us`);
                      }}
                      style={{ width: "100%", color: "#EB562E" }} // Set the width to 100%
                      className=" font-semibold text-center py-2"
                    >
                      {" "}
                      {selectedLanguage === "en"
                        ? "      Contact Us"
                        : "ติดต่อเรา"}
                    </Link>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </section>

      <section>
        <MDBContainer
          className="fluid p-0 px-0"
          id="cluster-container"
          style={{ height: "60vh" }}
        >
          {" "}
          <MDBRow
            className="p-0"
            id="cluster-gutter"
            // style={{ height: "inherit" }}
          >
            <MDBCol
              md="6"
              order="1"
              className={"d-flex p-5"}
              style={{ backgroundColor: "#474747", height: "inherit" }}
            >
              <div className="d-flex flex-col justify-content-between align-items-end w-100 gap-5">
                <span>
                  <EastIcon
                    style={{ color: "white", fontSize: "4rem" }}
                  ></EastIcon>
                </span>
                <Link
                  to={`/publications`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`publications`);
                  }}
                  className="flex items-center text-white"
                >
                  <p
                    className="text-white mb-0 xs:text-3xl"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontSemiBold"
                          : "FontThaiSemiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "Our Publication"
                      : "งานตีพิมพ์ของเรา"}
                  </p>
                </Link>
              </div>
            </MDBCol>
            <MDBCol
              md="6"
              order="1"
              className={"d-flex p-5"}
              style={{ backgroundColor: "#000", height: "inherit" }}
            >
              <div className="d-flex flex-col justify-content-between align-items-end w-100 gap-5">
                <span>
                  <EastIcon
                    style={{ color: "white", fontSize: "4rem" }}
                  ></EastIcon>
                </span>
                <Link
                  to={`/guidelines`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`publications`);
                  }}
                  className="flex items-center text-white"
                >
                  <p
                    className="text-white mb-0 xs:text-3xl"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontSemiBold"
                          : "FontThaiSemiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? " Our Guidelines"
                      : "คู่มือการใช้งาน"}
                  </p>
                </Link>
              </div>
            </MDBCol>
            <MDBCol
              md="6"
              order="1"
              className={"d-flex p-5"}
              style={{ backgroundColor: "#EB562E", height: "inherit" }}
            >
              <div className="d-flex flex-col justify-content-between align-items-end w-100 gap-5">
                <span>
                  <EastIcon
                    style={{ color: "white", fontSize: "4rem" }}
                  ></EastIcon>
                </span>
                <Link
                  to={`/journal`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.replace(`publications`);
                  }}
                  className="flex items-center text-white"
                >
                  <p
                    className="text-white mb-0 xs:text-3xl"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontSemiBold"
                          : "FontThaiSemiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? "           Explore Our Journal"
                      : "วารสารเพิ่มเติม"}
                  </p>
                </Link>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section>
        <MDBContainer>
          <MDBRow style={{ height: "40vh" }}></MDBRow>
        </MDBContainer>
      </section>
      {/* <ul>
        {publications.map(({ id, attributes }) => (
          <>
            <li key={id}>{attributes.createdAt}</li>
            <li key={id}>{attributes.journal[0]?.title}</li>
          </>
        ))}
      </ul> */}
      {/* </Container> */}
    </div>
  );
}

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <HomeMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <HomeDesktop />}
    </>
  );
}
