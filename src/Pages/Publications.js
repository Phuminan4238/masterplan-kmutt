import React, { useContext } from "react";
import { useState, useEffect, useRef, setIsLoaded } from "react";
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

function PublicationDesktop() {
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

  // Ref
  const policyRef = useRef(null);
  const ethicRef = useRef(null);
  const distributeRef = useRef(null);
  const periodicityRef = useRef(null);
  const boardmemberRef = useRef(null);

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
      color: "#474747",
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
  const [policy, setPolicies] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=policy"
      )
      .then(({ data }) => setPolicies(data.data))
      .catch((error) => setError(error));
  }, []);
  const [ethic, setEthics] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=ethics"
      )
      .then(({ data }) => setEthics(data.data))
      .catch((error) => setError(error));
  }, []);
  const [distribution, setDistributions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=distribution"
      )
      .then(({ data }) => setDistributions(data.data))
      .catch((error) => setError(error));
  }, []);
  const [periodicity, setPeridiocities] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=periodicity"
      )
      .then(({ data }) => setPeridiocities(data.data))
      .catch((error) => setError(error));
  }, []);

  // Member
  const [member, setMembers] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.35.29.179:1337/api/members")
      .then(({ data }) => setMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  const [honorarymember, setHonoraryMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/members/?populate=*&filters[usertype][$eq]=honorary_member"
      )
      .then(({ data }) => setHonoraryMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  const [editormember, setEditorMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/members/?populate=*&filters[usertype][$eq]=editor_chief"
      )
      .then(({ data }) => setEditorMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  const [boardmember, setBoardMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/members/?populate=*&filters[usertype][$eq]=board_member"
      )
      .then(({ data }) => setBoardMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  //

  // Style
  const isDesktop = useMediaQuery({ minWidth: 940 });
  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };
  //

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
            {/* ******************* */}

            {/* Middle  */}
            <MDBCol md="8">
              {/* Publication Policy  */}
              {policy[0] && (
                <div>
                  <MDBRow className="justify-content-center ">
                    <p
                      className="text-4xl px-0 text-black"
                      style={{ fontFamily: "FontBold", fontSize: "48px" }}
                    >
                      {selectedLanguage === "en"
                        ? "Publication"
                        : "Publication"}
                    </p>
                  </MDBRow>
                  <MDBRow
                    ref={policyRef}
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
                      md="6"
                      className="w-fit ps-4 text-black"
                      style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                    >
                      {selectedLanguage === "en"
                        ? `${policy[0].attributes.header_en} `
                        : `${policy[0].attributes.header_th}`}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="justify-content-center ">
                    <p
                      className="text-md px-0"
                      style={{ fontFamily: "FontRegular" }}
                    >
                      {selectedLanguage === "en"
                        ? `${policy[0].attributes.content_en} `
                        : `${policy[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Publication Ethics  */}
              {ethic[0] && (
                <div>
                  <MDBRow
                    ref={ethicRef}
                    className="d-flex justify-content-between fluid py-3"
                  >
                    <MDBCol
                      md="6"
                      className="text-2xl w-fit px-0 pe-4 text-black"
                      style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                    >
                      {selectedLanguage === "en"
                        ? `${ethic[0].attributes.header_en} `
                        : `${ethic[0].attributes.header_th}`}
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
                        ? `${ethic[0].attributes.content_en} `
                        : `${ethic[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                  {/* Editor and Editorial */}
                  <MDBRow className="d-flex justify-content-between fluid ">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontBold" }}
                      >
                        {selectedLanguage === "en" ? (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[0] &&
                              ethic[0].attributes.role[0].header_role}
                          </p>
                        ) : (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[0] &&
                              ethic[0].attributes.role[0].header_role_th}
                          </p>
                        )}
                      </p>
                      <ul className="list-disc text-md">
                        <li className="text-md">
                          {selectedLanguage === "en" ? (
                            <p>
                              {ethic[0].attributes.role &&
                                ethic[0].attributes.role[0] &&
                                ethic[0].attributes.role[0].content_role}
                            </p>
                          ) : (
                            <p>
                              {ethic[0].attributes.role &&
                                ethic[0].attributes.role[0] &&
                                ethic[0].attributes.role[0].content_role_th}
                            </p>
                          )}
                        </li>
                      </ul>
                    </MDBCol>
                  </MDBRow>
                  {/* Authors Role */}
                  <MDBRow className="d-flex justify-content-between fluid ">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontBold" }}
                      >
                        {selectedLanguage === "en" ? (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[1] && (
                                <p>{ethic[0].attributes.role[1].header_role}</p>
                              )}
                          </p>
                        ) : (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[1] && (
                                <p>
                                  {ethic[0].attributes.role[1].header_role_th}
                                </p>
                              )}
                          </p>
                        )}
                      </p>
                      {ethic[0].attributes.role &&
                        ethic[0].attributes.role[1] && (
                          <ul className="list-disc text-md">
                            <li className="text-md">
                              {selectedLanguage === "en" ? (
                                <p>
                                  {ethic[0].attributes.role[1].content_role}
                                </p>
                              ) : (
                                <p>
                                  {ethic[0].attributes.role[1].content_role_th}
                                </p>
                              )}
                            </li>
                          </ul>
                        )}
                    </MDBCol>
                  </MDBRow>
                  {/* Reviewers Role */}
                  <MDBRow className="d-flex justify-content-between fluid ">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontBold" }}
                      >
                        {selectedLanguage === "en" ? (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[2] && (
                                <p>{ethic[0].attributes.role[2].header_role}</p>
                              )}
                          </p>
                        ) : (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[2] && (
                                <p>
                                  {ethic[0].attributes.role[2].header_role_th}
                                </p>
                              )}
                          </p>
                        )}
                      </p>
                      {ethic[0].attributes.role &&
                        ethic[0].attributes.role[2] && (
                          <ul className="list-disc text-md">
                            <li className="text-md">
                              {selectedLanguage === "en" ? (
                                <p>
                                  {ethic[0].attributes.role[2].content_role}
                                </p>
                              ) : (
                                <p>
                                  {ethic[0].attributes.role[2].content_role_th}
                                </p>
                              )}
                            </li>
                          </ul>
                        )}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Distribution  */}
              {distribution[0] && (
                <div>
                  <MDBRow
                    ref={distributeRef}
                    className="d-flex justify-content-between fluid py-2"
                  >
                    <MDBCol
                      md="6"
                      className="text-2xl w-fit px-0 pe-4 text-black"
                      style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                    >
                      {selectedLanguage === "en"
                        ? `${distribution[0].attributes.header_en}`
                        : `${distribution[0].attributes.header_th}`}
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
                        ? `${distribution[0].attributes.content_en}`
                        : `${distribution[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Periodicity  */}
              {periodicity[0] && (
                <div>
                  <MDBRow
                    ref={periodicityRef}
                    className="d-flex justify-content-between fluid py-2"
                  >
                    <MDBCol
                      md="6"
                      className="text-2xl w-fit px-0 pe-4 text-black"
                      style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                    >
                      {selectedLanguage === "en"
                        ? `${periodicity[0].attributes.header_en}`
                        : `${periodicity[0].attributes.header_th}`}
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
                        ? `${periodicity[0].attributes.content_en}`
                        : `${periodicity[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Editorial Board Member  */}
              <MDBRow
                ref={boardmemberRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-2xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontBold", fontSize: "1.75rem" }}
                >
                  Editorial Board Members
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              {/* Honorary Member  */}
              {honorarymember[0] && (
                <div>
                  <MDBRow className="d-flex justify-content-between fluid mb-2">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black italic"
                        style={{ fontFamily: "FontMedium" }}
                      >
                        {honorarymember[0].attributes.position_en}
                      </p>
                      {honorarymember.map((memberData) => (
                        <ul className="list-disc text-md mb-0">
                          <li key={memberData.id}>
                            {memberData.attributes.prefix_en} {""}
                            {memberData.attributes.name_en} {""}
                            {memberData.attributes.surname_en}
                          </li>
                        </ul>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {/* Editor-in-Chief */}
              {editormember[0] && (
                <div>
                  <MDBRow className="d-flex justify-content-between fluid mb-2">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black italic"
                        style={{ fontFamily: "FontMedium" }}
                      >
                        {editormember[0].attributes.position_en}
                      </p>
                      {editormember.map((memberData) => (
                        <ul className="list-disc text-md mb-0">
                          <li key={memberData.id}>
                            {memberData.attributes.prefix_en} {""}
                            {memberData.attributes.name_en} {""}
                            {memberData.attributes.surname_en}
                          </li>
                        </ul>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {/* Board Member  */}
              {boardmember[0] && (
                <div>
                  <MDBRow className="d-flex justify-content-between fluid mb-2">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black italic"
                        style={{ fontFamily: "FontMedium" }}
                      >
                        {boardmember[0].attributes.position_en}
                      </p>
                      {boardmember.map((memberData) => (
                        <ul className="list-disc text-md mb-0">
                          <li key={memberData.id}>
                            {memberData.attributes.prefix_en} {""}
                            {memberData.attributes.name_en} {""}
                            {memberData.attributes.surname_en} {""} {"("}
                            {memberData.attributes.organization_en}
                            {")"}
                          </li>
                        </ul>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
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
                    Publication
                  </p>
                </MDBRow>
                <MDBRow className="d-flex justify-content-between fluid py-3">
                  <ul
                    className=""
                    style={{ color: "#474747", fontSize: "16px" }}
                  >
                    <li style={styles.listItem}>
                      <a
                        className={`${
                          activeTopic === "policy" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          ...(activeTopic === "policy"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(policyRef);
                          setActiveTopic("policy");
                        }}
                      >
                        Publication Policy
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      <a
                        className={`${activeTopic === "ethic" ? "active" : ""}`}
                        style={{
                          ...styles.listItemLink,
                          ...(activeTopic === "ethic" ? styles.activeLink : {}),
                        }}
                        onClick={() => {
                          scrollToRef(ethicRef);
                          setActiveTopic("ethic");
                        }}
                      >
                        Publication Ethics
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      <a
                        className={`${
                          activeTopic === "distribute" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          ...(activeTopic === "distribute"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(distributeRef);
                          setActiveTopic("distribute");
                        }}
                      >
                        Distribution
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      <a
                        className={`${
                          activeTopic === "periodicity" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          ...(activeTopic === "periodicity"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(periodicityRef);
                          setActiveTopic("periodicity");
                        }}
                      >
                        Periodicity
                      </a>
                    </li>
                    <li style={styles.listItem}>
                      <a
                        className={`${
                          activeTopic === "boardmember" ? "active" : ""
                        }`}
                        style={{
                          ...styles.listItemLink,
                          ...(activeTopic === "boardmember"
                            ? styles.activeLink
                            : {}),
                        }}
                        onClick={() => {
                          scrollToRef(boardmemberRef);
                          setActiveTopic("boardmember");
                        }}
                      >
                        Editorial Board Members
                      </a>
                    </li>
                  </ul>
                </MDBRow>
              </div>
            </MDBCol>
            {/* ******************* */}
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

function PublicationMobile() {
  // Ref
  const policyRef = useRef(null);
  const ethicRef = useRef(null);
  const distributeRef = useRef(null);
  const periodicityRef = useRef(null);
  const boardmemberRef = useRef(null);

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
  const [policy, setPolicies] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=policy"
      )
      .then(({ data }) => setPolicies(data.data))
      .catch((error) => setError(error));
  }, []);
  const [ethic, setEthics] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=ethics"
      )
      .then(({ data }) => setEthics(data.data))
      .catch((error) => setError(error));
  }, []);
  const [distribution, setDistributions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=distribution"
      )
      .then(({ data }) => setDistributions(data.data))
      .catch((error) => setError(error));
  }, []);
  const [periodicity, setPeridiocities] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/policies/?populate=*&filters[topic][$eq]=periodicity"
      )
      .then(({ data }) => setPeridiocities(data.data))
      .catch((error) => setError(error));
  }, []);

  // Member
  const [member, setMembers] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.35.29.179:1337/api/members")
      .then(({ data }) => setMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  const [honorarymember, setHonoraryMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/members/?populate=*&filters[usertype][$eq]=honorary_member"
      )
      .then(({ data }) => setHonoraryMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  const [editormember, setEditorMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/members/?populate=*&filters[usertype][$eq]=editor_chief"
      )
      .then(({ data }) => setEditorMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  const [boardmember, setBoardMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.35.29.179:1337/api/members/?populate=*&filters[usertype][$eq]=board_member"
      )
      .then(({ data }) => setBoardMembers(data.data))
      .catch((error) => setError(error));
  }, []);
  //

  // Style
  const isDesktop = useMediaQuery({ minWidth: 940 });
  const containerStyle = {
    maxWidth: isDesktop ? "5xl" : "fit",
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };
  //

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
              {policy[0] && (
                <div>
                  <MDBRow className="justify-content-center ">
                    <p
                      className="text-4xl px-0 text-black"
                      style={{ fontFamily: "FontBold" }}
                    >
                      {selectedLanguage === "en"
                        ? "Publication"
                        : "Publication"}
                    </p>
                  </MDBRow>
                  <MDBRow
                    ref={policyRef}
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
                      md="1"
                      className="text-xl w-fit  text-black"
                      style={{ fontFamily: "FontBold" }}
                    >
                      {selectedLanguage === "en"
                        ? `${policy[0].attributes.header_en} `
                        : `${policy[0].attributes.header_th}`}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="justify-content-center ">
                    <p
                      className="text-sm px-0"
                      style={{ fontFamily: "FontRegular" }}
                    >
                      {selectedLanguage === "en"
                        ? `${policy[0].attributes.content_en} `
                        : `${policy[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Publication Ethics  */}
              {ethic[0] && (
                <div>
                  <MDBRow
                    ref={ethicRef}
                    className="d-flex justify-content-between fluid py-3"
                  >
                    <MDBCol
                      md="6"
                      className="text-xl w-fit px-0 pe-4 text-black"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      {selectedLanguage === "en"
                        ? `${ethic[0].attributes.header_en} `
                        : `${ethic[0].attributes.header_th}`}
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
                      className="text-sm px-0"
                      style={{ fontFamily: "FontRegular" }}
                    >
                      {selectedLanguage === "en"
                        ? `${ethic[0].attributes.content_en} `
                        : `${ethic[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                  {/* Editor and Editorial */}
                  <MDBRow className="d-flex justify-content-between fluid ">
                    <MDBCol className=" w-fit px-0">
                      <p
                        className="mb-0 text-black"
                        style={{ fontFamily: "FontSemiBold" }}
                      >
                        {selectedLanguage === "en" ? (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[0] &&
                              ethic[0].attributes.role[0].header_role}
                          </p>
                        ) : (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[0] &&
                              ethic[0].attributes.role[0].header_role_th}
                          </p>
                        )}
                      </p>
                      <ul className="list-disc text-md">
                        <li className="text-sm">
                          {selectedLanguage === "en" ? (
                            <p>
                              {ethic[0].attributes.role &&
                                ethic[0].attributes.role[0] &&
                                ethic[0].attributes.role[0].content_role}
                            </p>
                          ) : (
                            <p>
                              {ethic[0].attributes.role &&
                                ethic[0].attributes.role[0] &&
                                ethic[0].attributes.role[0].content_role_th}
                            </p>
                          )}
                        </li>
                      </ul>
                    </MDBCol>
                  </MDBRow>
                  {/* Authors Role */}
                  <MDBRow className="d-flex justify-content-between fluid ">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontSemiBold" }}
                      >
                        {selectedLanguage === "en" ? (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[1] && (
                                <p>{ethic[0].attributes.role[1].header_role}</p>
                              )}
                          </p>
                        ) : (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[1] && (
                                <p>
                                  {ethic[0].attributes.role[1].header_role_th}
                                </p>
                              )}
                          </p>
                        )}
                      </p>
                      {ethic[0].attributes.role &&
                        ethic[0].attributes.role[1] && (
                          <ul className="list-disc text-md">
                            <li className="text-sm">
                              {selectedLanguage === "en" ? (
                                <p>
                                  {ethic[0].attributes.role[1].content_role}
                                </p>
                              ) : (
                                <p>
                                  {ethic[0].attributes.role[1].content_role_th}
                                </p>
                              )}
                            </li>
                          </ul>
                        )}
                    </MDBCol>
                  </MDBRow>
                  {/* Reviewers Role */}
                  <MDBRow className="d-flex justify-content-between fluid ">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontSemiBold" }}
                      >
                        {selectedLanguage === "en" ? (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[2] && (
                                <p>{ethic[0].attributes.role[2].header_role}</p>
                              )}
                          </p>
                        ) : (
                          <p>
                            {ethic[0].attributes.role &&
                              ethic[0].attributes.role[2] && (
                                <p>
                                  {ethic[0].attributes.role[2].header_role_th}
                                </p>
                              )}
                          </p>
                        )}
                      </p>
                      {ethic[0].attributes.role &&
                        ethic[0].attributes.role[2] && (
                          <ul className="list-disc text-md">
                            <li className="text-sm">
                              {selectedLanguage === "en" ? (
                                <p>
                                  {ethic[0].attributes.role[2].content_role}
                                </p>
                              ) : (
                                <p>
                                  {ethic[0].attributes.role[2].content_role_th}
                                </p>
                              )}
                            </li>
                          </ul>
                        )}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Distribution  */}
              {distribution[0] && (
                <div>
                  <MDBRow
                    ref={distributeRef}
                    className="d-flex justify-content-between fluid py-2"
                  >
                    <MDBCol
                      md="6"
                      className="text-xl w-fit px-0 pe-4 text-black"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      {selectedLanguage === "en"
                        ? `${distribution[0].attributes.header_en}`
                        : `${distribution[0].attributes.header_th}`}
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
                      className="text-sm px-0"
                      style={{ fontFamily: "FontRegular" }}
                    >
                      {selectedLanguage === "en"
                        ? `${distribution[0].attributes.content_en}`
                        : `${distribution[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Periodicity  */}
              {periodicity[0] && (
                <div>
                  <MDBRow
                    ref={periodicityRef}
                    className="d-flex justify-content-between fluid py-2"
                  >
                    <MDBCol
                      md="6"
                      className="text-xl w-fit px-0 pe-4 text-black"
                      style={{ fontFamily: "FontSemiBold" }}
                    >
                      {selectedLanguage === "en"
                        ? `${periodicity[0].attributes.header_en}`
                        : `${periodicity[0].attributes.header_th}`}
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
                      className="text-sm px-0"
                      style={{ fontFamily: "FontRegular" }}
                    >
                      {selectedLanguage === "en"
                        ? `${periodicity[0].attributes.content_en}`
                        : `${periodicity[0].attributes.content_th}`}
                    </p>
                  </MDBRow>
                </div>
              )}
              {/* ******************* */}

              {/* Editorial Board Member  */}
              <MDBRow
                ref={boardmemberRef}
                className="d-flex justify-content-between fluid py-3"
              >
                <MDBCol
                  md="6"
                  className="text-xl w-fit px-0 pe-4 text-black"
                  style={{ fontFamily: "FontSemiBold" }}
                >
                  Editorial Board Members
                </MDBCol>
                <MDBCol
                  className=""
                  style={{
                    borderTop: "1px solid black ",
                    marginTop: "1rem",
                  }}
                ></MDBCol>
              </MDBRow>
              {/* Honorary Member  */}
              {honorarymember[0] && (
                <div>
                  <MDBRow className="d-flex justify-content-between fluid mb-2">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontSemiBold" }}
                      >
                        {honorarymember[0].attributes.position_en}
                      </p>
                      {honorarymember.map((memberData) => (
                        <ul className="list-disc text-sm mb-0">
                          <li key={memberData.id}>
                            {memberData.attributes.prefix_en} {""}
                            {memberData.attributes.name_en} {""}
                            {memberData.attributes.surname_en}
                          </li>
                        </ul>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {/* Editor-in-Chief */}
              {editormember[0] && (
                <div>
                  <MDBRow className="d-flex justify-content-between fluid mb-2">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontSemiBold" }}
                      >
                        {editormember[0].attributes.position_en}
                      </p>
                      {editormember.map((memberData) => (
                        <ul className="list-disc text-sm mb-0">
                          <li key={memberData.id}>
                            {memberData.attributes.prefix_en} {""}
                            {memberData.attributes.name_en} {""}
                            {memberData.attributes.surname_en}
                          </li>
                        </ul>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {/* Board Member  */}
              {boardmember[0] && (
                <div>
                  <MDBRow className="d-flex justify-content-between fluid mb-2">
                    <MDBCol className=" w-fit px-0 pe-4">
                      <p
                        className="mb-2 text-black"
                        style={{ fontFamily: "FontSemiBold" }}
                      >
                        {boardmember[0].attributes.position_en}
                      </p>
                      {boardmember.map((memberData) => (
                        <ul className="list-disc text-sm mb-0">
                          <li key={memberData.id}>
                            {memberData.attributes.prefix_en} {""}
                            {memberData.attributes.name_en} {""}
                            {memberData.attributes.surname_en}
                          </li>
                        </ul>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
            </MDBCol>
            {/* ******************* */}

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

export default function Publication() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Render the Image component when on mobile */}
      {isMobile && <PublicationMobile />}

      {/* Hide the Post component when on mobile */}
      {!isMobile && <PublicationDesktop />}
    </>
  );
}
