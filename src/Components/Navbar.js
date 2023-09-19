import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
/* */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import logored from "../Images/logored.svg";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { useMediaQuery } from "react-responsive";
import {
  MDBContainer,
  MDBCol,
  MDBNavbar,
  MDBNavbarBrand,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import logojournal from "../Images/journal-logo.svg";
import logojournal3 from "../Images/logo.png";
import { LanguageContext } from "./LanguageContext";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const pages = ["Home", , "Guidelines", "Contact us"];
const pages_th = [
  "หน้าแรก",
  // "การจัดพิมพ์",
  "ข้อแนะนำ",
  // "วารสาร",
  "เกี่ยวกับเรา",
];
const drawerWidth = 250;

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

export default function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  //   Language
  const { selectedLanguage, handleLanguageSwitch } =
    useContext(LanguageContext);

  const toggleLanguage = () => {
    handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
  };

  const navbarStyle = {
    // width: "1440px",
    height: "150px",
    flexShrink: 0,
    background: "#2D3339",
  };

  const menuStyle = {
    // width: "1440px",
    height: "60px",
    flexShrink: 0,
    background: "#FFF",
  };

  const logoStyle = {
    height: "100px",
    padding: "0.5rem",
    margin: "0px",
  };

  const logoMobileStyle = {
    height: "auto",
  };

  const customRowStyle = {
    display: "inline-flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: "1rem",
    whiteSpace: "nowrap",
    fontFamily: selectedLanguage === "en" ? "FontSemiBold" : "FontThaiSemiBold",
  };

  const containerStyle = {
    "2xl": "max-w-2xl",
    "6xl": "max-w-6xl",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
  };

  const activeLinkStyle = {
    color: "#EB562E",
  };

  const [showBasic, setShowBasic] = useState(false);

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [navbarType, setNavbarType] = useState("navbar1");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarType("navbar2");
      } else {
        setNavbarType("navbar1");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Logo
  const containerStyle1 = {
    width: "250px", // Adjust the width to your desired size
  };

  const containerStyle2 = {
    width: "200px", // Adjust the width to your desired size
  };
  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const RenderNavbar1 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);
    const location = useLocation();

    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
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
            setLoading(false); // Update loading state when data is fetched
          }
        } catch (error) {
          console.error(error);
        }
      }
      // Fetch data only if publications is empty
      if (publications.length === 0) {
        fetchData();
      }
      return () => {
        isMounted = false;
      };
    }, [publications]);
    if (loading) {
      return <div></div>;
    }

    const toggleLanguage = () => {
      handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
    };

    return (
      <div>
        {publications.map((publication) => (
          <MDBNavbar style={navbarStyle}>
            <MDBContainer className={`fluid p-0 px-0 ${containerStyle["6xl"]}`}>
              <MDBCol className="col-6">
                <MDBNavbarBrand href="/">
                  <img
                    src={logojournal3}
                    style={logoStyle}
                    alt=""
                    loading="lazy"
                  />
                </MDBNavbarBrand>
              </MDBCol>
              <MDBCol className="col-6 pt-5">
                <MDBRow className="row-cols-2 justify-content-end">
                  <MDBCol className="col-6 d-flex justify-content-end align-items-center w-fit">
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
                          width: "100%", // Set the width to 100%
                          display: "flex", // Add this to enable flex layout
                          justifyContent: "space-between", // Spread content horizontally
                          alignItems: "center", // Center content vertically
                        }}
                        className="text-sm py-1 px-2 capitalize font-bold rounded-0"
                        size="sm"
                      >
                        <p className="mb-0" style={{ marginRight: "10px" }}>
                          {selectedLanguage === "en"
                            ? "Read KMUTT R&D Journal Online"
                            : "ค้นหาทั้งหมด"}
                        </p>
                        <span>
                          <NorthEastIcon
                            style={{ color: "#EB562E", fontSize: "1rem" }}
                          />
                        </span>
                      </MDBBtn>
                    </a>
                  </MDBCol>

                  <MDBCol className="col-6 d-flex justify-content-end align-items-center w-fit">
                    <a
                      href="https://www.lib.kmutt.ac.th/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white"
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
                          width: "100%", // Set the width to 100%
                          display: "flex", // Add this to enable flex layout
                          justifyContent: "space-between", // Spread content horizontally
                          alignItems: "center", // Center content vertically
                        }}
                        className="text-sm py-1 px-2 capitalize font-bold rounded-0"
                        size="sm"
                      >
                        <p className="mb-0" style={{ marginRight: "10px" }}>
                          {selectedLanguage === "en"
                            ? "Search KMUTT R&D Journal"
                            : "ค้นหาทั้งหมด"}
                        </p>
                        <span>
                          <NorthEastIcon
                            style={{ color: "white", fontSize: "1rem" }}
                          />
                        </span>
                      </MDBBtn>
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBContainer>
          </MDBNavbar>
        ))}

        <MDBNavbar style={menuStyle}>
          <MDBContainer className={`fluid p-0 px-2 ${containerStyle["6xl"]}`}>
            <MDBRow style={customRowStyle}>
              {pages.map((page, index) => (
                <MDBCol key={page}>
                  <Link
                    to={
                      page === "Home"
                        ? "/"
                        : `/${page.toLowerCase().replace(" ", "-")}`
                    }
                    style={
                      location.pathname ===
                      (page === "Home"
                        ? "/"
                        : `/${page.toLowerCase().replace(" ", "-")}`)
                        ? { ...linkStyle, ...activeLinkStyle }
                        : linkStyle
                    }
                  >
                    <a
                      textAlign="center"
                      to={`/${page}`}
                      sx={{
                        fontWeight: "bold",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontSemiBold"
                            : "FontThaiSemiBold",
                        padding: "20px",
                        ":hover": {
                          "& a, & > a": {
                            color: "white",
                          },
                        },
                      }}
                    >
                      {selectedLanguage === "en" ? page : pages_th[index]}
                    </a>
                  </Link>
                </MDBCol>
              ))}
            </MDBRow>
            <MDBRow>
              {" "}
              <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
                <span> {selectedLanguage === "en" ? "English" : "Thai"} </span>
              </span>
            </MDBRow>
          </MDBContainer>
        </MDBNavbar>
      </div>
    );
  };

  const RenderNavbar2 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);
    const location = useLocation();

    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
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
            setLoading(false); // Update loading state when data is fetched
          }
        } catch (error) {
          console.error(error);
        }
      }
      // Fetch data only if publications is empty
      if (publications.length === 0) {
        fetchData();
      }
      return () => {
        isMounted = false;
      };
    }, [publications]);
    if (loading) {
      return <div>Loading...</div>;
    }

    const toggleLanguage = () => {
      handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
    };

    return (
      <div>
        {publications.map((publication) => (
          <MDBNavbar style={navbarStyle}>
            <MDBContainer className={`fluid p-0 px-0 ${containerStyle["6xl"]}`}>
              <MDBCol className="col-6">
                <MDBNavbarBrand href="/">
                  <img
                    src={logojournal3}
                    style={logoStyle}
                    alt=""
                    loading="lazy"
                  />
                </MDBNavbarBrand>
              </MDBCol>
              <MDBCol className="col-6">
                <MDBRow className="row-cols-2">
                  <MDBCol className="col-6">
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
                          width: "100%", // Set the width to 100%
                        }}
                        className="me-3 text-sm px-3 capitalize font-bold rounded-0"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "Read more"
                          : "อ่านเพิ่มเติม"}
                      </MDBBtn>
                    </Link>
                  </MDBCol>
                  <MDBCol className="col-6">
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
                          width: "100%", // Set the width to 100%
                        }}
                        className="text-sm py-1 px-2 capitalize font-bold rounded-0"
                        size="sm"
                      >
                        {selectedLanguage === "en"
                          ? "Explore All"
                          : "ค้นหาทั้งหมด"}
                      </MDBBtn>
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBContainer>
          </MDBNavbar>
        ))}

        <MDBNavbar style={menuStyle}>
          <MDBContainer className={`fluid p-0 px-2 ${containerStyle["6xl"]}`}>
            <MDBRow style={customRowStyle}>
              {pages.map((page, index) => (
                <MDBCol key={page}>
                  <Link
                    to={
                      page === "Home"
                        ? "/"
                        : `/${page.toLowerCase().replace(" ", "-")}`
                    }
                    style={
                      location.pathname ===
                      (page === "Home"
                        ? "/"
                        : `/${page.toLowerCase().replace(" ", "-")}`)
                        ? { ...linkStyle, ...activeLinkStyle }
                        : linkStyle
                    }
                  >
                    <a
                      textAlign="center"
                      to={`/${page}`}
                      sx={{
                        fontWeight: "bold",
                        fontFamily:
                          selectedLanguage === "en"
                            ? "FontSemiBold"
                            : "FontThaiSemiBold",
                        padding: "20px",
                        ":hover": {
                          "& a, & > a": {
                            color: "white",
                          },
                        },
                      }}
                    >
                      {selectedLanguage === "en" ? page : pages_th[index]}
                    </a>
                  </Link>
                </MDBCol>
              ))}
            </MDBRow>
            <MDBRow>
              {" "}
              <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
                <span> {selectedLanguage === "en" ? "English" : "Thai"} </span>
              </span>
            </MDBRow>
          </MDBContainer>
        </MDBNavbar>
      </div>
    );
  };
  const RenderNavbar3 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);

    const toggleLanguage = () => {
      handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
    };

    const location = useLocation();

    return (
      <React.Fragment>
        <CssBaseline />

        <HideOnScroll {...props}>
          <AppBar
            className="px-1"
            style={{
              background: "#474747",
              boxShadow: "unset",
            }}
            position="sticky"
          >
            <Container maxWidth="xl" style={{ height: " 80px" }}>
              <Toolbar disableGutters style={{ height: "inherit" }}>
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                  <Typography variant="h6" noWrap component="div">
                    <Link to="/" onClick={handleLogoClick}>
                      <div style={containerStyle2}>
                        <img
                          src={logojournal3}
                          loading="lazy"
                          style={logoMobileStyle}
                        />
                      </div>
                    </Link>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0,
                    flexDirection: "initial",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="text-xs"
                    onClick={toggleLanguage}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="p-2">
                      {selectedLanguage === "en" ? "TH" : "TH"}{" "}
                    </span>
                    <span style={{ borderRight: "1px solid white" }}></span>
                    <span className="p-2">
                      {selectedLanguage === "en" ? "EN" : "EN"}{" "}
                    </span>
                  </span>
                  <Tooltip title="Open settings">
                    <IconButton
                      color="black"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    // style={{ opacity: 0.7 }}
                    sx={{
                      mt: "62px",
                      left: "20px",
                      width: drawerWidth,
                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        width: drawerWidth,
                      },
                      opacity: "0.9",
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {pages.map((page, index) => (
                      <Link
                        to={
                          page === "Home"
                            ? "/"
                            : `/${page.toLowerCase().replace(" ", "-")}`
                        }
                        style={
                          location.pathname ===
                          (page === "Home"
                            ? "/"
                            : `/${page.toLowerCase().replace(" ", "-")}`)
                            ? { ...linkStyle, ...activeLinkStyle }
                            : linkStyle
                        }
                      >
                        <MenuItem
                          style={{
                            justifyContent: "center",
                            width: "200px",
                            height: "60px",
                            borderBottom: "1px solid gray",
                          }}
                          onClick={handleCloseUserMenu}
                          sx={{
                            color: "black",
                            ":hover": {
                              color: "#EB562E",
                              bgcolor: "white",
                              opacity: "100%",
                              "& a, & > a": {
                                color: "#EB562E",
                              },
                            },
                            fontWeight: "bold",
                            // padding: "10px 20px 10px 20px",
                            borderBottom: "1px solid white",
                            fontFamily:
                              selectedLanguage === "en"
                                ? "FontMedium"
                                : "FontThaiMedium",
                          }}
                        >
                          <a
                            textAlign="center"
                            to={
                              page === "TOOLS & SERVICE"
                                ? "/tools-and-service"
                                : `/${page.replace(/\s+/g, "-").toLowerCase()}`
                            }
                            sx={{
                              fontWeight: "bold",
                              padding: "20px",
                              // color: "inherit",
                            }}
                          >
                            {selectedLanguage === "en" ? page : pages_th[index]}
                          </a>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </React.Fragment>
    );
  };

  const RenderNavbar4 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);

    const toggleLanguage = () => {
      handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
    };

    const location = useLocation();
    return (
      <React.Fragment>
        <CssBaseline />

        <HideOnScroll {...props}>
          <AppBar
            className="px-1"
            style={{
              background: "#474747",
              boxShadow: "unset",
            }}
            position="sticky"
          >
            <Container maxWidth="xl" style={{ height: " 100px" }}>
              <Toolbar disableGutters style={{ height: "inherit" }}>
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                  <Typography variant="h6" noWrap component="div">
                    <div style={containerStyle2}>
                      <Link to="/" onClick={handleLogoClick}>
                        <img
                          src={logojournal3}
                          aloading="lazy"
                          style={logoMobileStyle}
                        />
                      </Link>
                    </div>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0,
                    flexDirection: "initial",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="text-xs"
                    onClick={toggleLanguage}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="p-2">
                      {selectedLanguage === "en" ? "TH" : "TH"}{" "}
                    </span>
                    <span style={{ borderRight: "1px solid white" }}></span>
                    <span className="p-2">
                      {selectedLanguage === "en" ? "EN" : "EN"}{" "}
                    </span>
                  </span>
                  <Tooltip title="Open settings">
                    <IconButton
                      color="black"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    style={{ opacity: 0.9 }}
                    sx={{
                      mt: "62px",
                      left: "20px",
                      width: drawerWidth,
                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        width: drawerWidth,
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {pages.map((page, index) => (
                      <Link
                        to={`/${page.replace(/\s+/g, "-").toLowerCase()}`}
                        style={{ color: "inherit" }}
                      >
                        <MenuItem
                          style={{
                            justifyContent: "center",
                            width: "200px",
                            height: "60px",
                            borderBottom: "1px solid gray",
                          }}
                          key={page}
                          onClick={handleCloseUserMenu}
                          sx={{
                            color: "black",
                            ":hover": {
                              color: "#EB562E",
                              bgcolor: "white",
                              opacity: "100%",
                              "& a, & > a": {
                                color: "#EB562E",
                              },
                            },
                            fontWeight: "bold",
                            fontFamily: "FontRegular",
                            // padding: "10px 20px 10px 20px",
                            borderBottom: "1px solid white",
                            fontFamily:
                              selectedLanguage === "en"
                                ? "FontMedium"
                                : "FontThaiMedium",
                          }}
                        >
                          <a
                            textAlign="center"
                            to={`/${page}`}
                            sx={{
                              fontFamily:
                                selectedLanguage === "en"
                                  ? "FontBold"
                                  : "FontThaiBold",
                              padding: "20px",

                              ":hover": {
                                "& a, & > a": {
                                  color: "white",
                                },
                              },
                            }}
                          >
                            {selectedLanguage === "en" ? page : pages_th[index]}
                          </a>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </React.Fragment>
    );
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Mobile */}
      {isMobile && (
        <>
          {navbarType === "navbar1" && RenderNavbar3()}
          {navbarType === "navbar2" && RenderNavbar4()}
        </>
      )}

      {/* Desktop */}
      {!isMobile && (
        <>
          {navbarType === "navbar1" && RenderNavbar1()}
          {navbarType === "navbar2" && RenderNavbar2()}
        </>
      )}
    </>
  );
}

// import * as React from "react";
// import { useState, useEffect, useRef, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// /* */
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import LanguageIcon from "@mui/icons-material/Language";
// import Container from "@mui/material/Container";
// import SearchIcon from "@mui/icons-material/Search";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import { Link } from "react-router-dom";
// import logo from "../Images/logo.png";
// import logored from "../Images/logored.svg";
// import PropTypes from "prop-types";
// import CssBaseline from "@mui/material/CssBaseline";
// import useScrollTrigger from "@mui/material/useScrollTrigger";
// import Slide from "@mui/material/Slide";
// import { useMediaQuery } from "react-responsive";
// import {
//   MDBContainer,
//   MDBCol,
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import logojournal from "../Images/journal-logo.svg";
// import { LanguageContext } from "./LanguageContext";

// const pages = ["Home", "Publications", "Guidelines", "Journal", "About us"];
// const drawerWidth = 250;

// function HideOnScroll(props) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//   });

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

// HideOnScroll.propTypes = {
//   children: PropTypes.element.isRequired,

//   window: PropTypes.func,
// };

// export default function Navbar(props) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//     setIsMenuOpen(true);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//     setIsMenuOpen(false);
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMenuOpen]);

//   //   Language
//   const { selectedLanguage, handleLanguageSwitch } =
//     useContext(LanguageContext);

//   const toggleLanguage = () => {
//     handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
//   };

//   const navbarStyle = {
//     // width: "1440px",
//     height: "150px",
//     flexShrink: 0,
//     background: "#474747",
//   };

//   const menuStyle = {
//     // width: "1440px",
//     height: "60px",
//     flexShrink: 0,
//     background: "#FFF",
//   };

//   const logoStyle = {
//     height: "124px",
//   };

//   const customRowStyle = {
//     display: "inline-flex",
//     justifyContent: "flex-end",
//     alignItems: "flex-start",
//     gap: "1rem",
//     whiteSpace: "nowrap",
//     fontFamily: "FontSemiBold",
//   };

//   const containerStyle = {
//     "2xl": "max-w-2xl",
//     "6xl": "max-w-6xl",
//   };

//   const linkStyle = {
//     color: "black",
//     textDecoration: "none",
//   };

//   const activeLinkStyle = {
//     color: "#EB562E",
//   };

//   const [showBasic, setShowBasic] = useState(false);

//   const navigate = useNavigate();
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const [navbarType, setNavbarType] = useState("navbar1");

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setNavbarType("navbar2");
//       } else {
//         setNavbarType("navbar1");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Logo
//   const containerStyle1 = {
//     width: "250px", // Adjust the width to your desired size
//   };

//   const containerStyle2 = {
//     width: "200px", // Adjust the width to your desired size
//   };
//   const handleLogoClick = () => {
//     navigate("/");
//     window.scrollTo(0, 0);
//   };

//   const RenderNavbar1 = () => {
//     const { selectedLanguage, handleLanguageSwitch } =
//       useContext(LanguageContext);

//     const toggleLanguage = () => {
//       handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
//     };
//     const location = useLocation();

//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <HideOnScroll {...props}>
//           {/* <Container maxWidth="xl"> */}
//           <AppBar
//             // className="px-2"
//             style={{
//               background: "unset",
//               boxShadow: "unset",
//               position: "sticky",
//             }}
//           >
//             <MDBNavbar
//               className="justify-content-center"
//               style={{
//                 backgroundColor: "#EB562E",
//                 fontFamily: "FontSemiBold",
//                 color: "white",
//                 textAlign: "center",
//               }}
//             >
//               {" "}
//               King Mongkut’s University of Technology Thonburi (KMUTT)
//             </MDBNavbar>

//             <MDBNavbar style={navbarStyle}>
//               <MDBContainer
//                 className={`fluid p-0 px-0 ${containerStyle["6xl"]}`}
//               >
//                 <MDBNavbarBrand href="/">
//                   <img
//                     src={logojournal}
//                     style={logoStyle}
//                     alt=""
//                     loading="lazy"
//                   />
//                 </MDBNavbarBrand>
//               </MDBContainer>
//             </MDBNavbar>

//             <MDBNavbar style={menuStyle}>
//               <MDBContainer
//                 className={`fluid p-0 px-3 ${containerStyle["6xl"]}`}
//               >
//                 <MDBRow style={customRowStyle}>
//                   {pages.map((page) => (
//                     <MDBCol key={page}>
//                       <Link
//                         to={
//                           page === "Home"
//                             ? "/"
//                             : `/${page.toLowerCase().replace(" ", "-")}`
//                         }
//                         style={
//                           location.pathname ===
//                           (page === "Home"
//                             ? "/"
//                             : `/${page.toLowerCase().replace(" ", "-")}`)
//                             ? { ...linkStyle, ...activeLinkStyle }
//                             : linkStyle
//                         }
//                       >
//                         <a
//                           textAlign="center"
//                           to={`/${page}`}
//                           sx={{
//                             fontWeight: "bold",
//                             padding: "20px",
//                             ":hover": {
//                               "& a, & > a": {
//                                 color: "white",
//                               },
//                             },
//                           }}
//                         >
//                           {page}
//                         </a>
//                       </Link>
//                     </MDBCol>
//                   ))}
//                 </MDBRow>
//                 <MDBRow>
//                   {" "}
//                   <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
//                     <span>
//                       {" "}
//                       {selectedLanguage === "en" ? "English" : "Thai"}{" "}
//                     </span>
//                   </span>
//                 </MDBRow>
//               </MDBContainer>
//             </MDBNavbar>
//           </AppBar>
//         </HideOnScroll>
//       </React.Fragment>
//     );
//   };

//   const RenderNavbar2 = () => {
//     const { selectedLanguage, handleLanguageSwitch } =
//       useContext(LanguageContext);

//     const toggleLanguage = () => {
//       handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
//     };
//     const location = useLocation();

//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <HideOnScroll {...props}>
//           {/* <Container maxWidth="xl"> */}
//           <AppBar
//             // className="px-2"
//             style={{
//               background: "unset",
//               boxShadow: "unset",
//               position: "sticky",
//             }}
//           >
//             <MDBNavbar
//               className="justify-content-center"
//               style={{
//                 backgroundColor: "#EB562E",
//                 fontFamily: "FontSemiBold",
//                 color: "white",
//                 textAlign: "center",
//               }}
//             >
//               {" "}
//               King Mongkut’s University of Technology Thonburi (KMUTT)
//             </MDBNavbar>

//             <MDBNavbar style={navbarStyle}>
//               <MDBContainer
//                 className={`fluid p-0 px-0 ${containerStyle["6xl"]}`}
//               >
//                 <MDBNavbarBrand href="/">
//                   <img
//                     src={logojournal}
//                     style={logoStyle}
//                     alt=""
//                     loading="lazy"
//                   />
//                 </MDBNavbarBrand>
//               </MDBContainer>
//             </MDBNavbar>

//             <MDBNavbar style={menuStyle}>
//               <MDBContainer
//                 className={`fluid p-0 px-3 ${containerStyle["6xl"]}`}
//               >
//                 <MDBRow style={customRowStyle}>
//                   {pages.map((page) => (
//                     <MDBCol key={page}>
//                       <Link
//                         to={
//                           page === "Home"
//                             ? "/"
//                             : `/${page.toLowerCase().replace(" ", "-")}`
//                         }
//                         style={
//                           location.pathname ===
//                           (page === "Home"
//                             ? "/"
//                             : `/${page.toLowerCase().replace(" ", "-")}`)
//                             ? { ...linkStyle, ...activeLinkStyle }
//                             : linkStyle
//                         }
//                       >
//                         <a
//                           textAlign="center"
//                           to={`/${page}`}
//                           sx={{
//                             fontWeight: "bold",
//                             padding: "20px",
//                             ":hover": {
//                               "& a, & > a": {
//                                 color: "white",
//                               },
//                             },
//                           }}
//                         >
//                           {page}
//                         </a>
//                       </Link>
//                     </MDBCol>
//                   ))}
//                 </MDBRow>
//                 <MDBRow>
//                   {" "}
//                   <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
//                     <span>
//                       {" "}
//                       {selectedLanguage === "en" ? "English" : "Thai"}{" "}
//                     </span>
//                   </span>
//                 </MDBRow>
//               </MDBContainer>
//             </MDBNavbar>
//           </AppBar>
//         </HideOnScroll>
//       </React.Fragment>
//     );
//   };

//   const RenderNavbar3 = () => {
//     const { selectedLanguage, handleLanguageSwitch } =
//       useContext(LanguageContext);

//     const toggleLanguage = () => {
//       handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
//     };

//     const location = useLocation();

//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <MDBNavbar
//           className="justify-content-center text-xs p-2"
//           style={{
//             backgroundColor: "#EB562E",
//             fontFamily: "FontSemiBold",
//             color: "white",
//             textAlign: "center",
//             fontSize: "0.6rem",
//           }}
//         >
//           King Mongkut’s University of Technology Thonburi (KMUTT)
//         </MDBNavbar>
//         <HideOnScroll {...props}>
//           <AppBar
//             className="px-1"
//             style={{
//               background: "#474747",
//               boxShadow: "unset",
//             }}
//             position="sticky"
//           >
//             <Container maxWidth="xl" style={{ height: " 100px" }}>
//               <Toolbar disableGutters style={{ height: "inherit" }}>
//                 <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
//                   <Typography variant="h6" noWrap component="div">
//                     <Link to="/" onClick={handleLogoClick}>
//                       <div style={containerStyle2}>
//                         <img
//                           src={logojournal}
//                           loading="lazy"
//                           style={logoStyle}
//                         />
//                       </div>
//                     </Link>
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexGrow: 0,
//                     flexDirection: "initial",
//                     gap: "1rem",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span
//                     className="text-xs"
//                     onClick={toggleLanguage}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <span className="p-2">
//                       {selectedLanguage === "en" ? "TH" : "TH"}{" "}
//                     </span>
//                     <span style={{ borderRight: "1px solid white" }}></span>
//                     <span className="p-2">
//                       {selectedLanguage === "en" ? "EN" : "EN"}{" "}
//                     </span>
//                   </span>
//                   <Tooltip title="Open settings">
//                     <IconButton
//                       color="black"
//                       onClick={handleOpenUserMenu}
//                       sx={{ p: 0 }}
//                     >
//                       <MenuIcon style={{ color: "white" }} />
//                     </IconButton>
//                   </Tooltip>
//                   <Menu
//                     // style={{ opacity: 0.7 }}
//                     sx={{
//                       mt: "62px",
//                       left: "20px",
//                       width: drawerWidth,
//                       flexShrink: 0,
//                       "& .MuiDrawer-paper": {
//                         width: drawerWidth,
//                       },
//                       opacity: "0.9",
//                     }}
//                     id="menu-appbar"
//                     anchorEl={anchorElUser}
//                     anchorOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorElUser)}
//                     onClose={handleCloseUserMenu}
//                   >
//                     {pages.map((page, index) => (
//                       <Link
//                         to={
//                           page === "Home"
//                             ? "/"
//                             : `/${page.toLowerCase().replace(" ", "-")}`
//                         }
//                         style={
//                           location.pathname ===
//                           (page === "Home"
//                             ? "/"
//                             : `/${page.toLowerCase().replace(" ", "-")}`)
//                             ? { ...linkStyle, ...activeLinkStyle }
//                             : linkStyle
//                         }
//                       >
//                         <MenuItem
//                           style={{
//                             justifyContent: "center",
//                             width: "200px",
//                             height: "60px",
//                             borderBottom: "1px solid gray",
//                           }}
//                           onClick={handleCloseUserMenu}
//                           sx={{
//                             color: "black",
//                             ":hover": {
//                               color: "white",
//                               bgcolor: "white",
//                               opacity: "100%",
//                               "& a, & > a": {
//                                 color: "white",
//                               },
//                             },
//                             fontWeight: "bold",
//                             // padding: "10px 20px 10px 20px",
//                             borderBottom: "1px solid white",
//                             fontFamily: "FontRegular",
//                           }}
//                         >
//                           <a
//                             textAlign="center"
//                             to={
//                               page === "TOOLS & SERVICE"
//                                 ? "/tools-and-service"
//                                 : `/${page.replace(/\s+/g, "-").toLowerCase()}`
//                             }
//                             sx={{
//                               fontWeight: "bold",
//                               padding: "20px",
//                               // color: "inherit",
//                             }}
//                           >
//                             {page}
//                           </a>
//                         </MenuItem>
//                       </Link>
//                     ))}
//                   </Menu>
//                 </Box>
//               </Toolbar>
//             </Container>
//           </AppBar>
//         </HideOnScroll>
//       </React.Fragment>
//     );
//   };

//   const RenderNavbar4 = () => {
//     const { selectedLanguage, handleLanguageSwitch } =
//       useContext(LanguageContext);

//     const toggleLanguage = () => {
//       handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
//     };

//     const location = useLocation();
//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <MDBNavbar
//           className="justify-content-center text-xs p-2"
//           style={{
//             backgroundColor: "#EB562E",
//             fontFamily: "FontSemiBold",
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           {" "}
//           King Mongkut’s University of Technology Thonburi (KMUTT)
//         </MDBNavbar>
//         <HideOnScroll {...props}>
//           <AppBar
//             className="px-1"
//             style={{
//               background: "#474747",
//               boxShadow: "unset",
//             }}
//             position="sticky"
//           >
//             <Container maxWidth="xl" style={{ height: " 100px" }}>
//               <Toolbar disableGutters style={{ height: "inherit" }}>
//                 <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
//                   <Typography variant="h6" noWrap component="div">
//                     <div style={containerStyle2}>
//                       <Link to="/" onClick={handleLogoClick}>
//                         <img
//                           src={logojournal}
//                           aloading="lazy"
//                           style={logoStyle}
//                         />
//                       </Link>
//                     </div>
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexGrow: 0,
//                     flexDirection: "initial",
//                     gap: "1rem",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span
//                     className="text-xs"
//                     onClick={toggleLanguage}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <span className="p-2">
//                       {selectedLanguage === "en" ? "TH" : "TH"}{" "}
//                     </span>
//                     <span style={{ borderRight: "1px solid white" }}></span>
//                     <span className="p-2">
//                       {selectedLanguage === "en" ? "EN" : "EN"}{" "}
//                     </span>
//                   </span>
//                   <Tooltip title="Open settings">
//                     <IconButton
//                       color="black"
//                       onClick={handleOpenUserMenu}
//                       sx={{ p: 0 }}
//                     >
//                       <MenuIcon style={{ color: "white" }} />
//                     </IconButton>
//                   </Tooltip>
//                   <Menu
//                     style={{ opacity: 0.9 }}
//                     sx={{
//                       mt: "62px",
//                       left: "20px",
//                       width: drawerWidth,
//                       flexShrink: 0,
//                       "& .MuiDrawer-paper": {
//                         width: drawerWidth,
//                       },
//                     }}
//                     id="menu-appbar"
//                     anchorEl={anchorElUser}
//                     anchorOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorElUser)}
//                     onClose={handleCloseUserMenu}
//                   >
//                     {pages.map((page) => (
//                       <Link
//                         to={`/${page.replace(/\s+/g, "-").toLowerCase()}`}
//                         style={{ color: "inherit" }}
//                       >
//                         <MenuItem
//                           style={{
//                             justifyContent: "center",
//                             width: "200px",
//                             height: "60px",
//                             borderBottom: "1px solid gray",
//                           }}
//                           key={page}
//                           onClick={handleCloseUserMenu}
//                           sx={{
//                             color: "black",
//                             ":hover": {
//                               color: "white",

//                               bgcolor: "#EB562E",
//                               opacity: "100%",
//                               "& a, & > a": {
//                                 color: "white",
//                               },
//                             },
//                             fontWeight: "bold",
//                             fontFamily: "FontRegular",
//                             // padding: "10px 20px 10px 20px",
//                             borderBottom: "1px solid white",
//                             color: "inherit", // set default link color to black
//                           }}
//                         >
//                           <a
//                             textAlign="center"
//                             to={`/${page}`}
//                             sx={{
//                               fontWeight: "bold",
//                               padding: "20px",

//                               ":hover": {
//                                 "& a, & > a": {
//                                   color: "white",
//                                 },
//                               },
//                             }}
//                           >
//                             {page}
//                           </a>
//                         </MenuItem>
//                       </Link>
//                     ))}
//                   </Menu>
//                 </Box>
//               </Toolbar>
//             </Container>
//           </AppBar>
//         </HideOnScroll>
//       </React.Fragment>
//     );
//   };

//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

//   return (
//     <>
//       {/* Mobile */}
//       {isMobile && (
//         <>
//           {navbarType === "navbar1" && RenderNavbar3()}
//           {navbarType === "navbar2" && RenderNavbar4()}
//         </>
//       )}

//       {/* Desktop */}
//       {!isMobile && (
//         <>
//           {navbarType === "navbar1" && RenderNavbar1()}
//           {navbarType === "navbar2" && RenderNavbar2()}
//         </>
//       )}
//     </>
//   );
// }
