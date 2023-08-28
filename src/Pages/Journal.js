import React, { useContext } from "react";
import { useState, useEffect, setIsLoaded } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import { useMediaQuery } from "react-responsive";
import journalimage from "../Images/journal-image.png";
import welcomecover from "../Images/welcome-cover.png";
import { text } from "@fortawesome/fontawesome-svg-core";

function JournalDesktop() {
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/publications/?populate=*")
      .then(({ data }) => setPublications(data.data))
      .catch((error) => setError(error));
  }, []);

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

            <MDBCol md="10">
              {/* Publication Policy  */}
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Journal
                </p>
              </MDBRow>
              <MDBRow className="justify-content-start py-3">
                <MDBCol
                  md="5"
                  style={{
                    backgroundColor: "#EB562E",
                    display: "inline-flex",
                    padding: "24px 36px 24px 36px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="text-lg px-0 mb-0 text-white"
                    style={{ fontFamily: "FontSemiBold" }}
                  >
                    Search KMUTT Digital Library
                  </p>
                  <span>
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-start py-3">
                <MDBCol
                  md="5"
                  style={{
                    backgroundColor: "#EB562E",
                    display: "inline-flex",
                    padding: "24px 36px 24px 36px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="text-lg px-0 mb-0 text-white"
                    style={{ fontFamily: "FontSemiBold" }}
                  >
                    Read KMUTT RIPO
                  </p>
                  <span>
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </span>
                </MDBCol>
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

function JournalMobile() {
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/publications/?populate=*")
      .then(({ data }) => setPublications(data.data))
      .catch((error) => setError(error));
  }, []);

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

  return (
    <div className="App">
      <section>
      <MDBContainer
          className="fluid p-5"
          id="cluster-container"
          style={{ backgroundColor: "#EDEDED" }}
        >
          <MDBRow
            className="justify-content-center py-1"
            style={{
              borderLeft: "0.4rem solid  #EB562E ",
              display: "flex",
              alignItems: "center",
              fontFamily: "FontSemiBold",
            }}
          >
            <p className="m-0 text-2xl">Latest Journal</p>
          </MDBRow>
          <MDBRow>
            <MDBCol className="py-2 d-flex flex-col col-4">
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
              className="justify-content-center py-2"
              style={{
                alignItems: "center",
              }}
            >
              <p
                className="m-0 text-md px-1"
                style={{ color: "#EB562E", fontFamily: "FontSemiBold" }}
              >
                KMUTT Research and Development Journal
              </p>
              <p className="m-0 text-xs px-1 pt-2">Volume 46 No. 2</p>
              <p className="m-0 text-xs px-1 ">April - June</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer className={`fluid  ${containerStyle["xl"]}`}>
          <MDBRow className="d-flex justify-content-between px-5 py-6 fluid">
            <MDBCol md="10">
              {/* Publication Policy  */}
              <MDBRow className="justify-content-center ">
                <p
                  className="text-4xl px-0 text-black"
                  style={{ fontFamily: "FontBold" }}
                >
                  Journal
                </p>
              </MDBRow>
              <MDBRow className="justify-content-start py-3">
                <MDBCol
                  md="5"
                  style={{
                    backgroundColor: "#EB562E",
                    display: "inline-flex",
                    padding: "24px 36px 24px 36px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="text-lg px-0 mb-0 text-white"
                    style={{ fontFamily: "FontSemiBold" }}
                  >
                    Search KMUTT Digital Library
                  </p>
                  <span>
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-start py-3">
                <MDBCol
                  md="5"
                  style={{
                    backgroundColor: "#EB562E",
                    display: "inline-flex",
                    padding: "24px 36px 24px 36px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="text-lg px-0 mb-0 text-white"
                    style={{ fontFamily: "FontSemiBold" }}
                  >
                    Read KMUTT RIPO
                  </p>
                  <span>
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </span>
                </MDBCol>
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

export default function Journal() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <JournalMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <JournalDesktop />}
    </>
  );
}
