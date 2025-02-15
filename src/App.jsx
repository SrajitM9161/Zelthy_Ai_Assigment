import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  CssBaseline,
  CircularProgress,
  Switch,
} from "@mui/material";
import { ContentCopy, PersonAdd, Logout, DarkMode, LightMode, Menu as MenuIcon } from "@mui/icons-material";
import Sidebar from "./Components/Sidebar";

const SchedulePage = lazy(() => import("./Routes/Sceduledevents"));
const AvailabilityPage = lazy(() => import("./Routes/Availability"));
const ContactsPage = lazy(() => import("./Routes/Contacts"));

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Router>
      <CssBaseline />
      <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <Sidebar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col">
          <header className="h-16 px-4 flex items-center justify-between border-b dark:border-gray-700">
            <div className="flex items-center gap-4">
              {isMobile && (
                <IconButton onClick={toggleMobileMenu}>
                  <MenuIcon className="text-black dark:text-white" />
                </IconButton>
              )}
              <Tooltip title="Toggle Dark Mode">
                <IconButton onClick={toggleDarkMode} color="inherit">
                  {darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="Copy link">
                <IconButton>
                  <ContentCopy className="text-black dark:text-white" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add contact">
                <IconButton>
                  <PersonAdd className="text-black dark:text-white" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton onClick={handleProfileClick}>
                  <Avatar className="h-8 w-8">U</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose} className="text-red-600">
                  <Logout className="mr-2 h-5 w-5" />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Suspense fallback={<div className="flex justify-center mt-10"><CircularProgress /></div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/contacts" replace />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/events/*" element={<SchedulePage />} />
                <Route path="/availability" element={<AvailabilityPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;