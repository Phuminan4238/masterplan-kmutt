import React, { useContext } from "react";
import { useState, useEffect, setIsLoaded } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
/* Routes */
import { Route, Routes, useParams } from "react-router";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useMediaQuery } from "react-responsive";
import welcomecover from "../Images/welcome-cover.png";
import { LanguageContext } from "../Components/LanguageContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EastIcon from "@mui/icons-material/East";
// Plan
import buildingplan from "../Images/building-plan.png";
import facilityplan from "../Images/facility-plan.png";
import parkingplan from "../Images/parking-plan2.png";

// Component
import PublicationComponent from "../Components/Publication";

function BuildingDetailDesktop() {
  let { id } = useParams();
  const [southbuildings, setSouthBuildings] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/api/buildings/${id}?populate=uploadfiles.fileupload&filters[zone][$eq]=south`
      )
      .then((response) => {
        setSouthBuildings(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const [building, setBuilding] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/api/buildings/${id}?populate=*populate=*&filters[zone][$eq]=south`
      )
      .then((response) => {
        setBuilding(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // buildingplan
  const [buildingPlanImages, setBuildingplanimages] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const instance = axios.create({
      baseURL: "http://localhost:1337/api/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    async function fetchData() {
      try {
        const response = await instance.get(
          "masterplan-images?populate=*&filters[title][$eq]=buildingplan"
        );
        if (isMounted) {
          setBuildingplanimages(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (buildingPlanImages.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [buildingPlanImages]);

  // ******************** //

  // layout
  const isDesktop = useMediaQuery({ minWidth: 940 });
  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };
  const secondContainerStyle = {
    // zIndex: 1,
    // padding: "4rem",
    paddingBottom: "0rem",
  };

  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  // Function to toggle between building and parking types
  const handleTypeToggle = (type) => {
    setSelectedType(type);
  };

  const [selectedType, setSelectedType] = useState("building"); // Default to building type

  return (
    <div className="App">
      <section>
        <MDBContainer className={`fluid px-3 ${containerStyle["6xl"]}`}>
          <MDBRow className="d-flex justify-content-between py-6 fluid gx-6">
            {buildingPlanImages.map((buildingPlan) => (
              <MDBCol md="6" className="ms-4 me-4 px-0">
                <img
                  className="shadow-md"
                  key={buildingPlan.id}
                  src={
                    "http://localhost:1337" +
                      southbuildings.attributes?.uploadfiles?.data[0]
                        ?.attributes?.fileupload.data[0]?.attributes?.url || "-"
                  }
                  style={{
                    width: "100%",
                    height: "500px",
                  }}
                />
              </MDBCol>
            ))}
            <MDBCol className="h-fit">
              <MDBRow>
                <MDBCol
                  md="2"
                  className="p-3 text-center"
                  style={{
                    borderTopLeftRadius: "0.4rem",
                    borderBottomLeftRadius: "0.4rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    className="text-2xl p-2"
                    style={{
                      color: "white",
                      backgroundColor: "#ff4612",
                      borderRadius: "3rem",
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontSemiBold"
                          : "FontSemiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${southbuildings.attributes?.buildingNumber || ""}`
                      : `${southbuildings.attributes?.buildingNumber || ""}`}
                  </span>
                </MDBCol>
                <MDBCol
                  className="text-start ps-4 mt-2 h-fit"
                  style={{
                    borderTopRightRadius: "0.4rem",
                    borderBottomRightRadius: "0.4rem",
                    borderLeft: "0.5rem solid grey",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p
                    className="mb-0 text-2xl"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiBold"
                          : "FontThaiBold",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${southbuildings.attributes?.buildingName || ""}`
                      : `${southbuildings.attributes?.buildingName || ""}`}
                  </p>
                  <p
                    className="mb-0 text-lg"
                    style={{
                      fontFamily:
                        selectedLanguage === "en"
                          ? "FontThaiMedium"
                          : "FontThaiMedium",
                    }}
                  >
                    {selectedLanguage === "en"
                      ? `${southbuildings.attributes?.buildingName_en || ""}`
                      : `${southbuildings.attributes?.buildingName_en || ""}`}
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow className="pt-4">
                <p
                  className="mb-0 text-lg"
                  style={{
                    fontFamily:
                      selectedLanguage === "en"
                        ? "FontThaiRegular"
                        : "FontThaiRegular",
                  }}
                >
                  {selectedLanguage === "en"
                    ? `${southbuildings.attributes?.contact || ""}`
                    : `${southbuildings.attributes?.contact || ""}`}
                </p>
              </MDBRow>
              <MDBRow className="pt-4 ">
                <Link
                  to={southbuildings.attributes?.url}
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
                    className="me-3 items-center text-lg px-3 py-2 capitalize font-bold rounded-0 d-flex flex-row justify-content-between gap-4 p-6"
                    size="sm"
                  >
                    {selectedLanguage === "en" ? "Navigate" : "นำทาง"}
                    <span>
                      <ArrowForwardIcon
                        style={{ color: "white", fontSize: "2rem" }}
                      ></ArrowForwardIcon>
                    </span>
                  </MDBBtn>
                </Link>
              </MDBRow>
            </MDBCol>
          </MDBRow>

          {/* <MDBRow className="d-flex justify-content-between py-6 fluid gx-6 w-fit">
            <MDBCol>
              <p
                className="text-uppercase fw-bold xs:text-lg sm:text-xl"
                style={{ fontFamily: "FontMedium", fontSize: "1.3rem" }}
              >
                {selectedLanguage === "en"
                  ? `${southbuildings.attributes?.buildingNumber || ""}`
                  : `${southbuildings.attributes?.buildingNumber || ""}`}
              </p>
            </MDBCol>
            <MDBCol>
              <p
                className="text-uppercase fw-bold xs:text-lg sm:text-xl"
                style={{ fontFamily: "FontMedium", fontSize: "1.3rem" }}
              >
                {selectedLanguage === "en"
                  ? `${southbuildings.attributes?.buildingName || ""}`
                  : `${southbuildings.attributes?.buildingName || ""}`}
              </p>
            </MDBCol>
            {buildingPlanImages.map((buildingPlan) => (
              <MDBCol md="6" className="ms-4 me-4 px-0">
                <img
                  className="shadow-md"
                  key={buildingPlan.id}
                  src={
                    "http://localhost:1337" +
                    buildingPlan.attributes.image?.data[0]?.attributes?.url
                  }
                  style={{
                    width: "100%",
                  }}
                />
              </MDBCol>
            ))}
          </MDBRow> */}
        </MDBContainer>
      </section>

      <section>
        <MDBContainer>
          <MDBRow style={{ height: "1vh" }}></MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

function BuildingDetailMobile() {
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

export default function BuildingDetail() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <BuildingDetailMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <BuildingDetailDesktop />}
    </>
  );
}
