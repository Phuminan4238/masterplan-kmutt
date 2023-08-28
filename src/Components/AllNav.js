import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import { LanguageContext } from "./LanguageContext";

const pages = [
  "TEAM MEMBER",
  "RESEARCH",
  "PUBLICATIONS",
  "TOOLS & SERVICE",
  "NEWS & ACTIVITIES",
  "CONTACT US",
  "PARTICIPATE & DONATE",
];

const drawerWidth = 360;

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

export default function HomeNav(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /* Search box */
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
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
    width: "180px", // Adjust the width to your desired size
  };

  const logoStyle = {
    width: "100%",
    height: "auto",
  };

  // Search Result
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [memberResults, setMemberResults] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [toolResults, setToolResults] = useState([]);

  const fetchPublicationResults = async () => {
    try {
      const publicationResponse = await fetch(
        `https://10.35.29.186/api/publications?populate=uploadfiles.fileupload&filters[title_en][$contains]=${encodeURIComponent(
          searchTerm
        )}&filters[title_th][$contains]=${encodeURIComponent(searchTerm)}`
      );
      const publicationData = await publicationResponse.json();
      setSearchResults(publicationData.data);
      console.log("Publication data:", publicationData.data);
    } catch (error) {
      console.error("Error fetching publication results:", error);
    }
  };

  const fetchMemberResults = async () => {
    try {
      const memberResponse = await fetch(
        `https://10.35.29.186/api/members?populate=uploadfiles.fileupload&filters[$or][0][name_en][$contains]=${encodeURIComponent(
          searchTerm
        )}&filters[$or][1][surname_en][$contains]=${encodeURIComponent(
          searchTerm
        )}`
      );
      const memberData = await memberResponse.json();
      setMemberResults(memberData.data);
      console.log("Member data:", memberData.data);
    } catch (error) {
      console.error("Error fetching member results:", error);
    }
  };

  const fetchEventResults = async () => {
    try {
      const eventResponse = await fetch(
        `https://10.35.29.186/api/events?populate=uploadfiles.fileupload&filters[name_en][$contains]=${encodeURIComponent(
          searchTerm
        )}&filters[name_th][$contains]=${encodeURIComponent(searchTerm)}`
      );
      const eventData = await eventResponse.json();
      setEventResults(eventData.data);
      console.log("Event data:", eventData.data);
    } catch (error) {
      console.error("Error fetching event results:", error);
    }
  };

  const fetchToolResults = async () => {
    try {
      const toolResponse = await fetch(
        `https://10.35.29.186/api/tools?populate=uploadfiles.fileupload&filters[name_en][$contains]=${encodeURIComponent(
          searchTerm
        )}&filters[name_th][$contains]=${encodeURIComponent(searchTerm)}`
      );
      const toolData = await toolResponse.json();
      setToolResults(toolData.data);
      console.log("Tool data:", toolData.data);
    } catch (error) {
      console.error("Error fetching tool results:", error);
    }
  };

  useEffect(() => {
    fetchPublicationResults();
    fetchMemberResults();
    fetchEventResults();
    fetchToolResults();
  }, [searchTerm]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Redirect to the search result page
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  const inputStyle = {
    // opacity: isSearchOpen ? 1 : 0,
    // height: isSearchOpen ? "auto" : 0,
    marginRight: isSearchOpen ? "12px" : "0px",
    transition: "margin-right 0.3s ease-out",
  };

  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const handleMouseEnter = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [showSearchBox, setShowSearchBox] = useState(false);
  const handleSearchIconClick = () => {
    setShowSearchBox(true);
  };

  const RenderNavbar1 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);

    const toggleLanguage = () => {
      handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar
            // className="px-24"
            style={{
              background: "white",
              boxShadow: "unset",
              top: "15px",
            }}
            position="sticky"
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    component="div"
                  >
                    <Link to="/" onClick={handleLogoClick}>
                      <div style={containerStyle1}>
                        <img src={logored} loading="lazy" style={logoStyle} />
                      </div>
                    </Link>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0,
                    flexDirection: "initial",
                    gap: "3rem",
                  }}
                >
                  <div
                    className="searchBox"
                    // style={{ border: "2px solid #AE023E" }}
                  >
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      onMouseEnter={handleMouseEnter}
                    />

                    <button
                      className="searchButton"
                      href="#"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <SearchIcon
                        style={{
                          color: isHovered ? "grey" : "#AE023E",
                          cursor: "pointer",
                          transition: "color 0.3s ease-in-out",
                        }}
                      />
                    </button>
                  </div>
                  <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
                    <LanguageIcon
                      style={{ color: "#AE023E", marginRight: "0.2rem" }}
                    />
                    <span style={{ color: "#AE023E" }}>
                      {" "}
                      {selectedLanguage === "en" ? "EN" : "TH"}
                    </span>
                  </span>
                  <Tooltip title="Open settings">
                    <IconButton
                      color="black"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <MenuIcon style={{ color: "#AE023E" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    // style={{ opacity: 0.7 }}
                    sx={{
                      mt: "70px",
                      left: "25px",
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
                          page === "TOOLS & SERVICE"
                            ? "/tools-and-service"
                            : page === "NEWS & ACTIVITIES"
                            ? "/news-and-activities"
                            : page === "PARTICIPATE & DONATE"
                            ? "/participate-and-donate"
                            : `/${page.replace(/\s+/g, "-").toLowerCase()}`
                        }
                        // style={{ color: "black" }}
                        sx={{
                          color: "black",
                          ":hover": {
                            color: "white",
                          },
                        }}
                        key={page}
                      >
                        <MenuItem
                          style={{
                            justifyContent: "center",
                            width: "300px",
                            height: "60px",
                            borderBottom: "1px solid gray",
                          }}
                          onClick={handleCloseUserMenu}
                          sx={{
                            color: "black",
                            ":hover": {
                              color: "white",
                              bgcolor: "#AE023E",
                              opacity: "100%",
                              "& a, & > a": {
                                color: "white",
                              },
                            },
                            fontWeight: "bold",
                            padding: "10px 20px 10px 20px",
                            borderBottom: "1px solid white",
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
                            {page}
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

  const RenderNavbar2 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);

    const toggleLanguage = () => {
      handleLanguageSwitch(selectedLanguage === "en" ? "th" : "en");
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar
            // className="px-24"
            style={{
              background: "white",
              boxShadow: "unset",
            }}
            position="sticky"
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    component="div"
                  >
                    <div style={containerStyle1}>
                      <Link to="/" onClick={handleLogoClick}>
                        <img src={logored} aloading="lazy" style={logoStyle} />
                      </Link>
                    </div>
                  </Typography>
                  {/* 👇️ Anchor link
              <a href="https://google.com" target="_blank" rel="noreferrer">
                <img
                  src="https://bobbyhadz.com/images/blog/react-prevent-page-refresh-on-form-submit/thumbnail.webp"
                  alt="example"
                />
              </a> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0,
                    flexDirection: "initial",
                    gap: "3rem",
                  }}
                >
                  <div
                    className="searchBox"
                    // style={{ border: "2px solid #AE023E" }}
                  >
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      onMouseEnter={handleMouseEnter}
                    />

                    <button
                      className="searchButton"
                      href="#"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <SearchIcon
                        style={{
                          color: isHovered ? "grey" : "#AE023E",
                          cursor: "pointer",
                          transition: "color 0.3s ease-in-out",
                        }}
                      />
                    </button>
                  </div>
                  <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
                    <LanguageIcon
                      style={{ color: "#AE023E", marginRight: "0.2rem" }}
                    />
                    <span style={{ color: "#AE023E" }}>
                      {" "}
                      {selectedLanguage === "en" ? "EN" : "TH"}
                    </span>
                  </span>
                  <Tooltip title="Open settings">
                    <IconButton
                      color="black"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <MenuIcon style={{ color: "#AE023E" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    style={{ opacity: 0.9 }}
                    sx={{
                      mt: "70px",
                      left: "25px",
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
                    {pages.map((page) => (
                      <Link
                        to={`/${page.replace(/\s+/g, "-").toLowerCase()}`}
                        style={{ color: "inherit" }}
                      >
                        <MenuItem
                          style={{
                            justifyContent: "center",
                            width: "300px",
                            height: "60px",
                            borderBottom: "1px solid gray",
                          }}
                          key={page}
                          onClick={handleCloseUserMenu}
                          sx={{
                            color: "black",
                            ":hover": {
                              color: "white",

                              bgcolor: "#AE023E",
                              opacity: "100%",
                              "& a, & > a": {
                                color: "white",
                              },
                            },
                            fontWeight: "bold",
                            padding: "10px 20px 10px 20px",
                            borderBottom: "1px solid white",
                            color: "inherit", // set default link color to black
                          }}
                        >
                          <a
                            textAlign="center"
                            to={`/${page}`}
                            sx={{
                              fontWeight: "bold",
                              padding: "20px",

                              ":hover": {
                                "& a, & > a": {
                                  color: "white",
                                },
                              },
                              // color: "inherit", // set link color to inherit to match parent
                            }}
                          >
                            {page}
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

  const RenderNavbar3 = () => {
    const { selectedLanguage, handleLanguageSwitch } =
      useContext(LanguageContext);
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar
            className="px-3"
            style={{
              background: "white",
              boxShadow: "unset",
              top: "10px",
            }}
            position="sticky"
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ flexGrow: 1, marginTop: 2, marginBottom: 2 }}
                    component="div"
                  >
                    <Link to="/" onClick={handleLogoClick}>
                      <div style={containerStyle2}>
                        <img src={logored} loading="lazy" style={logoStyle} />
                      </div>
                    </Link>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0,
                    flexDirection: "initial",
                    gap: "3rem",
                  }}
                >
                  <div
                    className="searchBox"
                    style={{ top: "12%" }}
                    // style={{ border: "2px solid #AE023E" }}
                  >
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      onMouseEnter={handleMouseEnter}
                    />

                    <button
                      className="searchButton"
                      href="#"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleSearchIconClick}
                      style={{
                        position: showSearchBox ? "absolute" : "static",
                        right: "3%",
                      }}
                    >
                      <SearchIcon
                        style={{
                          color: isHovered ? "grey" : "#AE023E",
                          cursor: "pointer",
                          transition: "color 0.3s ease-in-out",
                        }}
                      />
                    </button>
                  </div>
                  {/* <div className="searchBox" style={{ top: "12%" }}>
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      style={{ display: showSearchBox ? "block" : "none" }}
                    />
           
                    <button
                      className="searchButton"
                      onClick={handleSearchIconClick}
                      style={{
                        position: showSearchBox ? "absolute" : "static",
                        right: "3%",
                      }}
                    >
                      <SearchIcon
                        style={{
                          color: "#AE023E",
                          cursor: "pointer",
                          transition: "color 0.3s ease-in-out",
                        }}
                      />
                    </button>
                  </div> */}
                  {/* <span style={{ color: "#AE023E" }}>
                    <LanguageIcon
                      style={{ color: "#AE023E", marginRight: "0.5rem" }}
                    ></LanguageIcon>
                    EN
                  </span> */}
                  <Tooltip title="Open settings">
                    <IconButton
                      color="black"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <MenuIcon style={{ color: "#AE023E" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    // style={{ opacity: 0.7 }}
                    sx={{
                      mt: "76px",
                      left: "48px",
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
                          page === "TOOLS & SERVICE"
                            ? "/tools-and-service"
                            : page === "NEWS & ACTIVITIES"
                            ? "/news-and-activities"
                            : page === "PARTICIPATE & DONATE"
                            ? "/participate-and-donate"
                            : `/${page.replace(/\s+/g, "-").toLowerCase()}`
                        }
                        // style={{ color: "black" }}
                        sx={{
                          color: "black",
                          ":hover": {
                            color: "white",
                          },
                        }}
                        key={page}
                      >
                        <MenuItem
                          style={{
                            justifyContent: "center",
                            width: "300px",
                            height: "60px",
                            borderBottom: "1px solid gray",
                          }}
                          onClick={handleCloseUserMenu}
                          sx={{
                            color: "black",
                            ":hover": {
                              color: "white",
                              bgcolor: "#AE023E",
                              opacity: "100%",
                              "& a, & > a": {
                                color: "white",
                              },
                            },
                            fontWeight: "bold",
                            padding: "10px 20px 10px 20px",
                            borderBottom: "1px solid white",
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
                            {page}
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
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar
            className="px-3"
            style={{
              background: "white",
              boxShadow: "unset",
            }}
            position="sticky"
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "flex" } }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ flexGrow: 1, marginTop: 2, marginBottom: 2 }}
                    component="div"
                  >
                    <div style={containerStyle2}>
                      <Link to="/" onClick={handleLogoClick}>
                        <img src={logored} aloading="lazy" style={logoStyle} />
                      </Link>
                    </div>
                  </Typography>
                  {/* 👇️ Anchor link
              <a href="https://google.com" target="_blank" rel="noreferrer">
                <img
                  src="https://bobbyhadz.com/images/blog/react-prevent-page-refresh-on-form-submit/thumbnail.webp"
                  alt="example"
                />
              </a> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 0,
                    flexDirection: "initial",
                    gap: "3rem",
                  }}
                >
                  <div
                    className="searchBox"
                    style={{ top: "12%" }}
                    // style={{ border: "2px solid #AE023E" }}
                  >
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      onMouseEnter={handleMouseEnter}
                    />

                    <button
                      className="searchButton"
                      href="#"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleSearchIconClick}
                      style={{
                        position: showSearchBox ? "absolute" : "static",
                        right: "3%",
                      }}
                    >
                      <SearchIcon
                        style={{
                          color: isHovered ? "grey" : "#AE023E",
                          cursor: "pointer",
                          transition: "color 0.3s ease-in-out",
                        }}
                      />
                    </button>
                  </div>
                  {/* <div className="searchBox" style={{ top: "12%" }}>
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      style={{ display: showSearchBox ? "block" : "none" }}
                    />
                 
                    <button
                      className="searchButton"
                      onClick={handleSearchIconClick}
                      style={{
                        position: showSearchBox ? "absolute" : "static",
                        right: "3%",
                      }}
                    >
                      <SearchIcon
                        style={{
                          color: "#AE023E",
                          cursor: "pointer",
                          transition: "color 0.3s ease-in-out",
                        }}
                      />
                    </button>
                  </div> */}
                  {/* <span>
                    {" "}
                    <LanguageIcon
                      style={{ color: "#AE023E", marginRight: "0.5rem" }}
                    ></LanguageIcon>
                    <span style={{ color: "#AE023E" }}>EN</span>
                  </span> */}
                  <Tooltip title="Open settings">
                    <IconButton
                      color="black"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <MenuIcon style={{ color: "#AE023E" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    style={{ opacity: 0.9 }}
                    sx={{
                      mt: "60px",
                      left: "30px",
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
                    {pages.map((page) => (
                      <Link
                        to={`/${page.replace(/\s+/g, "-").toLowerCase()}`}
                        style={{ color: "inherit" }}
                      >
                        <MenuItem
                          style={{
                            justifyContent: "center",
                            width: "300px",
                            height: "60px",
                            borderBottom: "1px solid gray",
                          }}
                          key={page}
                          onClick={handleCloseUserMenu}
                          sx={{
                            color: "black",
                            ":hover": {
                              color: "white",

                              bgcolor: "#AE023E",
                              opacity: "100%",
                              "& a, & > a": {
                                color: "white",
                              },
                            },
                            fontWeight: "bold",
                            padding: "10px 20px 10px 20px",
                            borderBottom: "1px solid white",
                            color: "inherit", // set default link color to black
                          }}
                        >
                          <a
                            textAlign="center"
                            to={`/${page}`}
                            sx={{
                              fontWeight: "bold",
                              padding: "20px",

                              ":hover": {
                                "& a, & > a": {
                                  color: "white",
                                },
                              },
                              // color: "inherit", // set link color to inherit to match parent
                            }}
                          >
                            {page}
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
