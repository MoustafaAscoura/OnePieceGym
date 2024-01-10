"use client";

import { useState, useCallback, useEffect } from "react";
import "./Navbar.css";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Fab,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  Zoom,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Home", "Services", "Programs", "Coaches", "Plans", "Contact"];
const settings = ["Add Session", "Logout"];
const admin_settings = ["Dashboard", "Logout"];

import $ from 'jquery';

function Logo() {
  return (
    <>
      <h1 className="relative">
        ONE<span className="text-green-600">PIECE</span>
        <span
          style={{ left: "1%" }}
          className="absolute font-semibold text-red-600"
        >
          X
        </span>
      </h1>
    </>
  );
}

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [logged, setLogged] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currSection, setCurrSection] = useState(0)

  useEffect(()=>{
      $(document).on('scroll', function() {
          let s = Math.floor($(document).scrollTop() / $(window).height())
          setCurrSection(s);
      });
  },[])
  
  const trigger = useScrollTrigger({
    // Number of pixels needed to scroll to toggle `trigger` to `true`.
    threshold: 300,
  })

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleTopClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

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

  return (
    <AppBar position="fixed" color="transparent" className="border-b-2 border-white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Logo />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component="a"
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={`#${page.toLowerCase()}`}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Logo />
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            justifyContent="end"
            gap={2}
          >
            {pages.map((page, index) => (
              <Button
                key={page}
                sx={{color: "white", display: "block", fontSize:"20px", fontWeight:"400", textTransform:"none"}}
                className={`nav-link ${currSection == index ? 'active':''}`}
                href={`#${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          {logged ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
      <Zoom in={trigger}>
        <Box
          role="presentation"
          // Place the button in the bottom right corner.
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1,
          }}
        >
          <Fab
            onClick={scrollToTop}
            color="success"
            size="large"
            aria-label="Scroll back to top"
            sx={{bgcolor:"white",border:"2px solid white"}}
          >
            <KeyboardArrowUpIcon fontSize="medium" />
          </Fab>
        </Box>
      </Zoom>
    </AppBar>
  );
}
