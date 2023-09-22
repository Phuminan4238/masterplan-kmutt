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

function HomeDesktop() {
  // South building
  const [error, setError] = useState(null);
  const [southbuildings, setSouthBuildings] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const instance = axios.create({
      baseURL: "http://localhost:1337/api/", // Update with your API URL.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    async function fetchData() {
      try {
        const response = await instance.get(
          "buildings?populate=uploadfiles.fileupload&filters[zone][$eq]=south"
        );
        if (isMounted) {
          setSouthBuildings(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    if (southbuildings.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [southbuildings]);

  // North building
  const [northbuildings, setNorthBuildings] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const instance = axios.create({
      baseURL: "http://localhost:1337/api/", // Update with your API URL.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    async function fetchData() {
      try {
        const response = await instance.get(
          "buildings?populate=*populate=*&filters[zone][$eq]=north"
        );
        if (isMounted) {
          setNorthBuildings(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    if (northbuildings.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [northbuildings]);

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

  // parkingplan
  const [parkingPlanImages, setParkingPlanImages] = useState([]);
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
          "masterplan-images?populate=*&filters[title][$eq]=parkingplan"
        );
        if (isMounted) {
          setParkingPlanImages(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (parkingPlanImages.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [parkingPlanImages]);

  // facilitiesplan
  const [facilitiesPlanImages, setFacilitiesPlanImages] = useState([]);
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
          "masterplan-images?populate=*&filters[title][$eq]=facilityplan"
        );
        if (isMounted) {
          setFacilitiesPlanImages(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (facilitiesPlanImages.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [facilitiesPlanImages]);

  // officeplan
  const [officePlanImages, setOfficePlanImages] = useState([]);
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
          "masterplan-images?populate=*&filters[title][$eq]=office"
        );
        if (isMounted) {
          setOfficePlanImages(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (officePlanImages.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [officePlanImages]);

  // Building type
  const [buildingTypes, setBuildingtypes] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const instance = axios.create({
      baseURL: "  http://localhost:1337/api/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    async function fetchData() {
      try {
        const response = await instance.get(
          "masterplan-types?populate=*populate=*&filters[name_en][$eq]=building"
        );
        if (isMounted) {
          setBuildingtypes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (buildingTypes.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [buildingTypes]);

  // Parking type
  const [parkingTypes, setParkingTypes] = useState([]);
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
          "masterplan-types?populate=*&filters[name_en][$eq]=parking"
        );
        if (isMounted) {
          setParkingTypes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (parkingTypes.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [parkingTypes]);

  // Office type
  const [officeTypes, setOfficeTypes] = useState([]);
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
          "masterplan-types?populate=*&filters[name_en][$eq]=office"
        );
        if (isMounted) {
          setOfficeTypes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (officeTypes.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [officeTypes]);

  // Facilities type
  const [facilitiesTypes, setFacilitiesTypes] = useState([]);
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
          "masterplan-types?populate=*&filters[name_en][$eq]=facilities"
        );
        if (isMounted) {
          setFacilitiesTypes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (facilitiesTypes.length === 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [facilitiesTypes]);

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
        <MDBContainer className={`fluid py-5 px-4 ${containerStyle["6xl"]}`}>
          <MDBRow
            style={{
              color: "black",
              fontSize: "1.2rem",
              fontFamily:
                selectedLanguage === "en" ? "FontThaiBold" : "FontThaiBold",
            }}
          >
            {buildingTypes.map((buildingType) => (
              <MDBCol
                md="3"
                style={{
                  borderLeft: "0.5rem solid #EB562E",
                  display: "flex", // Enable Flexbox
                  flexDirection: "column", // Stack elements vertically
                  justifyContent: "center", // Vertically center text
                  textAlign: "left",
                }}
                onClick={() => handleTypeToggle("building")}
              >
                <p className="mb-0">{buildingType.attributes.name_en}</p>
                <p className="mb-0">{buildingType.attributes.name_th}</p>
              </MDBCol>
            ))}
            {parkingTypes.map((parkingType) => (
              <MDBCol
                md="3"
                style={{
                  borderLeft: "0.5rem solid #608DD4",
                  display: "flex", // Enable Flexbox
                  flexDirection: "column", // Stack elements vertically
                  justifyContent: "center", // Vertically center text
                  textAlign: "left",
                }}
                onClick={() => handleTypeToggle("parking")}
              >
                <p className="mb-0">{parkingType.attributes.name_en}</p>
                <p className="mb-0">{parkingType.attributes.name_th}</p>
              </MDBCol>
            ))}
            {facilitiesTypes.map((facilitiesType) => (
              <MDBCol
                md="3"
                style={{
                  borderLeft: "0.5rem solid #1DB528",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "left",
                }}
                onClick={() => handleTypeToggle("facilities")}
                key={facilitiesType.id}
              >
                <p className="mb-0">{facilitiesType.attributes.name_en}</p>
                <p className="mb-0">{facilitiesType.attributes.name_th}</p>
              </MDBCol>
            ))}

            {officeTypes.map((officeType) => (
              <MDBCol
                md="3"
                style={{
                  borderLeft: "0.5rem solid #FEB832",
                  display: "flex", // Enable Flexbox
                  flexDirection: "column", // Stack elements vertically
                  justifyContent: "center", // Vertically center text
                  textAlign: "left",
                }}
                onClick={() => handleTypeToggle("office")}
                key={officeType.id} // Add a unique key for each item in the array
              >
                <p className="mb-0">{officeType.attributes.name_en}</p>
                <p className="mb-0">{officeType.attributes.name_th}</p>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </section>
      <section>
        <MDBContainer id="cluster-container">
          <MDBContainer style={secondContainerStyle}>
            <MDBRow
              className="justify-content-center"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Render images based on the selected type */}
              <MDBCol md="10" className="ms-4 me-4 px-0">
                {selectedType === "building"
                  ? buildingPlanImages.map((buildingPlan) => (
                      <img
                        className="shadow-md"
                        key={buildingPlan.id}
                        src={
                          "http://localhost:1337" +
                          buildingPlan.attributes.image?.data[0]?.attributes
                            ?.url
                        }
                        style={{
                          width: "100%",
                        }}
                      />
                    ))
                  : selectedType === "parking"
                  ? parkingPlanImages.map((parkingPlan) => (
                      <img
                        className="shadow-md"
                        key={parkingPlan.id}
                        src={
                          "http://localhost:1337" +
                          parkingPlan.attributes.image?.data[0]?.attributes?.url
                        }
                        style={{
                          width: "100%",
                        }}
                      />
                    ))
                  : selectedType === "facilities"
                  ? facilitiesPlanImages.map((facilitiesPlan) => (
                      <img
                        className="shadow-md"
                        key={facilitiesPlan.id}
                        src={
                          "http://localhost:1337" +
                          facilitiesPlan.attributes.image?.data[0]?.attributes
                            ?.url
                        }
                        style={{
                          width: "100%",
                        }}
                      />
                    ))
                  : selectedType === "office"
                  ? officePlanImages.map((officePlan) => (
                      <img
                        className="shadow-md"
                        key={officePlan.id}
                        src={
                          "http://localhost:1337" +
                          officePlan.attributes.image?.data[0]?.attributes?.url
                        }
                        style={{
                          width: "100%",
                        }}
                      />
                    ))
                  : null}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </section>

      <section>
        <MDBContainer className={`fluid p-5 ${containerStyle["6xl"]}`}>
          <MDBRow
            style={{
              color: "black",
              fontFamily:
                selectedLanguage === "en" ? "FontThaiBold" : "FontThaiBold",
            }}
          >
            <MDBRow className="d-flex ">
              <MDBCol
                md="6"
                className="p-5 shadow-md"
                // style={{ border: "1px solid black" }}
              >
                <p className="text-center text-3xl pb-4"> South Zone </p>
                {selectedType === "building" &&
                  southbuildings.map((building) => (
                    <Link
                      to={`/BuildingDetail/${building.id}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.replace(
                          `/BuildingDetail/${building.id}`
                        );
                      }}
                    >
                      <MDBRow
                        className="text-white"
                        style={{ borderRadius: "0.4rem", marginBlock: "1rem" }}
                        key={building.id}
                      >
                        <MDBCol
                          md="2"
                          className="p-3 text-center"
                          style={{
                            backgroundColor: "#ff4612",
                            borderTopLeftRadius: "0.4rem",
                            borderBottomLeftRadius: "0.4rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <span className="text-2xl">
                            {building.attributes.buildingNumber}
                          </span>
                        </MDBCol>
                        <MDBCol
                          className="text-center p-3"
                          style={{
                            backgroundColor: "#717171",
                            borderTopRightRadius: "0.4rem",
                            borderBottomRightRadius: "0.4rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <p className="mb-0 text-lg">
                            {building.attributes.buildingName}
                          </p>
                        </MDBCol>
                      </MDBRow>
                    </Link>
                  ))}

                {selectedType === "parking" &&
                  parkingPlanImages.map((parkingPlan) => (
                    <Link
                      to={`/BuildingDetail/${parkingPlan.id}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.replace(
                          `/BuildingDetail/${parkingPlan.id}`
                        );
                      }}
                    >
                      <MDBRow
                        className="text-white"
                        style={{ borderRadius: "0.4rem", marginBlock: "1rem" }}
                        key={parkingPlan.id}
                      >
                        <MDBCol
                          md="2"
                          className="p-3 text-center"
                          style={{
                            backgroundColor: "#ff4612",
                            borderTopLeftRadius: "0.4rem",
                            borderBottomLeftRadius: "0.4rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <span className="text-2xl">
                            {parkingPlan.attributes.parkingNumber}
                          </span>
                        </MDBCol>
                        <MDBCol
                          className="text-center p-3"
                          style={{
                            backgroundColor: "#474747",
                            borderTopRightRadius: "0.4rem",
                            borderBottomRightRadius: "0.4rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <p className="mb-0 text-xl">
                            {parkingPlan.attributes.parkingName}
                          </p>
                        </MDBCol>
                      </MDBRow>
                    </Link>
                  ))}
              </MDBCol>
              <MDBCol md="6" className="p-5 shadow-md">
                <p className="text-center text-3xl pb-4"> North Zone </p>
                {selectedType === "building" &&
                  northbuildings.map((building) => (
                    <Link
                      to={`/BuildingDetail/${building.id}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.replace(
                          `/BuildingDetail/${building.id}`
                        );
                      }}
                    >
                      <MDBRow
                        className="text-white"
                        style={{ borderRadius: "0.4rem", marginBlock: "1rem" }}
                        key={building.id}
                      >
                        <MDBCol
                          md="2"
                          className="p-3 text-center"
                          style={{
                            backgroundColor: "#FEB832",
                            borderTopLeftRadius: "0.4rem",
                            borderBottomLeftRadius: "0.4rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <span className="text-2xl">
                            {building.attributes.buildingNumber}
                          </span>
                        </MDBCol>
                        <MDBCol
                          className="text-center p-3"
                          style={{
                            backgroundColor: "#717171",
                            borderTopRightRadius: "0.4rem",
                            borderBottomRightRadius: "0.4rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <p className="mb-0 text-lg">
                            {building.attributes.buildingName}
                          </p>
                        </MDBCol>
                      </MDBRow>
                    </Link>
                  ))}
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20vh" }}></MDBRow>
          </MDBRow>
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
