"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from "@mui/icons-material/Logout";
import BuildIcon from "@mui/icons-material/Build";
import PaymentsIcon from "@mui/icons-material/Payments";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsIcon from "@mui/icons-material/Sports";
import TimerIcon from "@mui/icons-material/Timer";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Link from "next/link";
import { getCookie } from "cookies-next";
import { Provider } from "react-redux";
import store from '../lib/store'

const drawerWidth = 240;
export const revalidate = 1800 // revalidate cached data at most every 30 mins

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
  const router = useRouter()
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const icons = {
    "Website": <BuildIcon />,
    "Logout": <LogoutIcon />,
    "Inbox": <MailIcon />,
    "Trainees": <DirectionsRunIcon />,
    "Coaches": <SportsIcon />,
    "Sessions": <TimerIcon />,
    "Payments": <PaymentsIcon />,
    "Dashboard": <DashboardIcon />,
    "Programs": <InsertDriveFileIcon/>
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {if (getCookie('coach') != process.env.ADMIN_PASSWORD) router.push('/')}, [])

  return (

      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <AppBar position="fixed" open={open} className='bg-green-400'>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && {display: "none"}),
                }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div" bac="true">
              <Link href='/dashboard'>Admin Dashboard</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                  <ChevronRightIcon/>
              ) : (
                  <ChevronLeftIcon/>
              )}
            </IconButton>
          </DrawerHeader>
          <Divider/>
          <List>
            {["Dashboard", "Trainees", "Payments", "Sessions", "Coaches", "Programs", "Inbox"].map(
                (text, index) => {
                  let href = `/dashboard${text === "Dashboard" ? "" : '/' + text.toLowerCase()}`

                  return <ListItem key={text} component={Link} disablePadding sx={{display: "block"}}
                                   href={href}
                                   className={href === pathname ? 'bg-green-100' : ''}
                  >
                    <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                    >
                      <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                      >
                        {icons[text]}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                  </ListItem>
                }
            )}
          </List>
          <Divider/>
          <List>
            {["Website", "Logout"].map((text, index) => (
                <ListItem key={index} disablePadding sx={{display: "block"}}>
                  <ListItemButton onClick={() => router.push(`/dashboard/${text.toLowerCase()}`)}
                                  sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                  }}
                  >
                    <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                    >
                      {icons[text]}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                  </ListItemButton>
                </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{flexGrow: 1, p: 5}} className='bg-white min-h-screen'>
          <DrawerHeader/>
          <Provider store={store}>
            {children}
          </Provider>
        </Box>
      </Box>
  );
}
