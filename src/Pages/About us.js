import React, { useContext } from "react";
import { useState, useEffect, setIsLoaded } from "react";
import axios from "axios";
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

function AboutUsDesktop() {
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

  const [error, setError] = useState(null);
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

  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="App">
      <section>
        <MDBContainer className={`fluid px-3 ${containerStyle["6xl"]}`}>
          <MDBRow className="d-flex justify-content-between py-6 fluid gx-6">
            {/* Left */}
            {publications.map((publication) => (
              <MDBCol md="2">
                {/* Journal  */}
                <MDBRow
                  className="justify-content-center"
                  style={{
                    borderLeft: "0.4rem solid  #EB562E ",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "FontSemiBold",
                    color: "#474747",
                    fontSize: "36px",
                  }}
                >
                  <p className="m-0 ">Latest</p>
                  <p className="m-0 ">Journal</p>
                </MDBRow>
                <MDBRow className="pt-3 pb-2">
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
                </MDBRow>
                <MDBRow
                  className="justify-content-center py-1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* local data */}
                  <p
                    className="m-0 text-md px-1"
                    style={{ color: "#EB562E", fontFamily: "FontSemiBold" }}
                  >
                    KMUTT Research and Development Journal
                    {/* {selectedLanguage === "en"
                      ? `${publication.attributes.journal[0]?.title}`
                      : `${publication.attributes.journal[0]?.title_th}`} */}
                  </p>

                  <p
                    className="m-0 px-1 pt-2"
                    style={{ color: "#474747", fontSize: "14px" }}
                  >
                    {/* Volumn 46 No. 2 */}
                    {selectedLanguage === "en"
                      ? `Volumn ${publication.attributes.journal[0]?.volumn} No. ${publication.attributes.journal[0]?.number}`
                      : `ปีที่ ${publication.attributes.journal[0]?.volumn} ฉบับที่ ${publication.attributes.journal[0]?.number}`}
                    {""}
                  </p>
                  <p
                    className="m-0 text-xs px-1"
                    style={{ color: "#474747", fontSize: "14px" }}
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

            <MDBCol md="8">
              {/* Publication Policy  */}
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  {selectedLanguage === "en"
                    ? `${aboutData?.topic}`
                    : `${aboutData?.topic}`}
                </p>
              </MDBRow>
              <MDBRow className="d-flex justify-content-between fluid py-3">
                <MDBCol
                  className="text-2xl w-fit ps-0 text-black"
                  style={{ fontFamily: "FontSemiBold" }}
                >
                  {selectedLanguage === "en"
                    ? `${aboutData?.header_en}`
                    : `${aboutData?.header_th}`}
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-center ">
                <p
                  className="text-md px-0 "
                  style={{ fontFamily: "FontRegular" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedLanguage === "en"
                        ? aboutData?.content_markdown
                        : aboutData?.content_markdown,
                  }}
                />
              </MDBRow>
              {/* ******************* */}
              {/* Publication Ethics  */}
              <MDBRow className="d-flex justify-content-between fluid pt-0 pb-3">
                <MDBCol
                  md="6"
                  className="text-2xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontSemiBold" }}
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
                  className="text-md px-0 mb-0"
                  style={{ fontFamily: "FontRegular" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedLanguage === "en"
                        ? officeData?.content_markdown
                        : officeData?.content_markdown,
                  }}
                />
              </MDBRow>
              <MDBRow>
                <p
                  className="text-lg px-0 mb-0  text-black"
                  style={{ fontFamily: "FontSemiBold" }}
                >
                  {selectedLanguage === "en"
                    ? `${locationData?.header_en}`
                    : `${locationData?.header_th}`}
                </p>
                <p
                  className="text-md px-0 "
                  style={{ fontFamily: "FontRegular" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedLanguage === "en"
                        ? locationData?.content_markdown
                        : locationData?.content_markdown,
                  }}
                />
              </MDBRow>
            </MDBCol>

            <MDBCol md="2">
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-white"
                  style={{ fontFamily: "FontBold" }}
                >
                  {""}
                </p>
              </MDBRow>
              <MDBRow className="d-flex justify-content-between fluid py-3">
                <ul className="ps-0 text-sm text-white">
                  <li>
                    <a style={{ fontFamily: "FontSemiBold" }}> </a>
                  </li>
                </ul>
              </MDBRow>
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

function AboutUsMobile() {
  const [error, setError] = useState(null);
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

  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

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
                className="m-0 text-md px-1 text-xl"
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
                  {selectedLanguage === "en"
                    ? `${aboutData?.topic}`
                    : `${aboutData?.topic}`}
                </p>
              </MDBRow>
              <MDBRow className="d-flex justify-content-between fluid py-3">
                <MDBCol
                  className="col-3"
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
                <MDBCol
                  className="text-xl w-fit  text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  {selectedLanguage === "en"
                    ? `${aboutData?.header_en}`
                    : `${aboutData?.header_th}`}
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-center ">
                <p
                  className="text-sm px-0 "
                  style={{ fontFamily: "FontRegular" }}
                >
                  {selectedLanguage === "en"
                    ? `${aboutData?.content_en}`
                    : `${aboutData?.content_th}`}
                </p>
              </MDBRow>
              {/* ******************* */}
              {/* Editorial Office */}
              <MDBRow className="d-flex justify-content-between fluid pt-0 pb-3">
                <MDBCol
                  md="6"
                  className="text-xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontSemiBold" }}
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
                  className="text-sm px-0 mb-2"
                  style={{ fontFamily: "FontRegular" }}
                >
                  {selectedLanguage === "en"
                    ? `${officeData?.content_en}`
                    : `${officeData?.content_th}`}
                </p>
              </MDBRow>
              <MDBRow>
                <p
                  className="text-md px-0 mb-0  text-black"
                  style={{ fontFamily: "FontSemiBold" }}
                >
                  {selectedLanguage === "en"
                    ? `${locationData?.header_en}`
                    : `${locationData?.header_th}`}
                </p>
                <ul className="text-sm list-none ps-0">
                  <li>
                    {selectedLanguage === "en"
                      ? `${locationData?.content_en}`
                      : `${locationData?.content_th}`}
                  </li>
                </ul>
              </MDBRow>
            </MDBCol>
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

export default function AboutUs() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <AboutUsMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <AboutUsDesktop />}
    </>
  );
}
