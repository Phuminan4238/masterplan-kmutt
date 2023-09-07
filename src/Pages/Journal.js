import React, { useContext } from "react";
import { useState, useEffect, setIsLoaded } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import { useMediaQuery } from "react-responsive";
import journalimage from "../Images/journal-image.png";
import welcomecover from "../Images/welcome-cover.png";
import { text } from "@fortawesome/fontawesome-svg-core";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { LanguageContext } from "../Components/LanguageContext";

function JournalDesktop() {
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
  // const [publications, setPublications] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://10.35.29.179:1337/api/publications/?populate=*")
  //     .then(({ data }) => setPublications(data.data))
  //     .catch((error) => setError(error));
  // }, []);

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
                <a
                  href="https://www.lib.kmutt.ac.th/en/"
                  target="_blank"
                  className="flex items-center text-white ps-0"
                >
                  <MDBCol
                    md="7"
                    style={{
                      backgroundColor: "#EB562E",
                      display: "inline-flex",
                      padding: "2.4rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="text-2xl px-0 mb-0 text-white"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      Search KMUTT Digital Library
                    </p>
                    {/* <span>
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </span> */}
                    <span>
                      <NorthEastIcon
                        style={{ color: "white", fontSize: "3rem" }}
                      ></NorthEastIcon>
                    </span>
                  </MDBCol>
                </a>
              </MDBRow>
              <MDBRow className="justify-content-start py-3">
                <a
                  href="https://ripo.kmutt.ac.th/publication/"
                  target="_blank"
                  className="flex items-center text-white ps-0"
                >
                  <MDBCol
                    md="7"
                    style={{
                      backgroundColor: "#EB562E",
                      display: "inline-flex",
                      padding: "2.4rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="text-2xl px-0 mb-0 text-white"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      Read KMUTT RIPO
                    </p>
                    <span>
                      <NorthEastIcon
                        style={{ color: "white", fontSize: "3rem" }}
                      ></NorthEastIcon>
                    </span>
                  </MDBCol>
                </a>
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
      .get("http://10.35.29.179:1337/api/publications/?populate=*")
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
                  Journal
                </p>
              </MDBRow>
              <MDBRow className="justify-content-start py-3">
                <MDBCol
                  md="5"
                  className="d-flex flex-col"
                  style={{
                    backgroundColor: "#EB562E",
                    padding: "1rem",
                    gap: "2rem",
                  }}
                >
                  <div className="text-end">
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-md px-0 mb-0 text-white"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      Search KMUTT Digital Library
                    </p>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="justify-content-start ">
                <MDBCol
                  md="5"
                  className="d-flex flex-col"
                  style={{
                    backgroundColor: "#EB562E",
                    padding: "1rem",
                    gap: "2rem",
                  }}
                >
                  <div className="text-end">
                    <MDBIcon
                      fas
                      icon="chevron-right"
                      style={{ color: "white" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-md px-0 mb-0 text-white"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      Read KMUTT RIPO
                    </p>
                  </div>
                </MDBCol>
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
