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

function AboutUs() {
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
            "http://localhost:1337/api/contacts/?populate=*"
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
            <MDBCol md="2">
              <MDBRow
                className="justify-content-center py-1"
                style={{
                  borderLeft: "0.4rem solid  #EB562E ",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "FontSemiBold",
                }}
              >
                <p className="m-0 text-2xl">Latest</p>
                <p className="m-0 text-2xl">Journal</p>
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
                <p
                  className="m-0 text-md px-1"
                  style={{ color: "#EB562E", fontFamily: "FontSemiBold" }}
                >
                  KMUTT Research and Development Journal
                </p>
                <p className="m-0 text-xs px-1 py-2">
                  Volume 46 No. 2 April - June
                </p>
              </MDBRow>
            </MDBCol>

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
                >
                  {selectedLanguage === "en"
                    ? `${aboutData?.content_en}`
                    : `${aboutData?.content_th}`}
                </p>
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
                  className="text-md px-0"
                  style={{ fontFamily: "FontRegular" }}
                >
                  {selectedLanguage === "en"
                    ? `${officeData?.content_en}`
                    : `${officeData?.content_th}`}
                </p>
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
                <ul className="list-none ps-0">
                  <li>
                    {selectedLanguage === "en"
                      ? `${locationData?.content_en}`
                      : `${locationData?.content_th}`}
                  </li>
                </ul>
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

export default AboutUs;
