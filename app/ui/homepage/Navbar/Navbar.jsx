"use client";

import { useState, useCallback, useEffect } from "react";
import { getCookie } from 'cookies-next';
import "./Navbar.css";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Fab,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  Zoom,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Home", "Services", "Programs", "Coaches", "Plans", "Contact"];
import AuthForm from "../../authentication/AuthForm";
import $ from 'jquery';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SessionDialog from "../../dashboard/trainees/sessionDialog";

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
  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currSection, setCurrSection] = useState(0)
  const [openLoginForm, setOpenLoginForm] = useState(false)

  useEffect(()=>{
    if (user) setUserData(user)
    handleCloseUserMenu()
  },[user])

  useEffect(()=>{
      $(document).on('scroll', function() {
        let s = Math.floor($(document).scrollTop() / $(window).height())
        setCurrSection(s);
      });

      const _user = getCookie('user_name');
      if (_user != undefined){
          setUser({
            'name' : getCookie('user_name'),
            'phone' : getCookie('user_phone'),
            'coach' : getCookie('user_coach') == 'true'
        })
      }
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

  const handleOpenSession = () => {
    if (userData) {
      console.log(userData)
      setUser(userData)
    } else {
      setOpenLoginForm(true)
    }
  }

  const addSession = (formData) => {
    let createdAt = new Date(formData.get('createdAt'))
    createdAt.setHours(formData.get('hour'))
    formData.set("createdAt", createdAt.toISOString());
    formData.set('traineeID', user.id)
    formData.set('coachID', user.coachID)

    fetch("/api/sessions", {method: "POST",body: formData,})
    .then(response => {setUser(false);setOpenLoginForm(false);})
    .catch((err) => console.log(err))}

  return (
    <nav className="fixed border-b-2 border-white bg-slate-950 w-full z-50">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#home"
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
            href="#home"
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


            <Box sx={{flexGrow:0, marginLeft:{xs:8, lg:16}}}>
              <Tooltip title={user.name} className="cursor-pointer">
                  <AccountBoxIcon color="success" sx={{fontSize:"35px"}} onClick={handleOpenUserMenu}/>
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
                  <MenuItem onClick={handleOpenSession}>
                    <Typography textAlign="center">Add Session</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => setOpenLoginForm(true)}>
                    <Typography textAlign="center">Coaches Login</Typography>
                  </MenuItem>
              </Menu>
              <AuthForm open={openLoginForm} setOpen={setOpenLoginForm} setUser={setUser}/>
              <SessionDialog open={user} setOpen={setUser} addSession={addSession}/>

            </Box>
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
    </nav>
  );
}
