import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, IconButton, Dialog, Drawer } from "@mui/material";
import { Event, BarChart, ArrowBack, CalendarToday, Brightness4, Brightness7, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import CreateEvent from "../Pages/CreateEvent";

const routes = [
  { path: "/contacts", label: "Contact", icon: <BarChart className="text-black dark:text-white" /> },
  { path: "/events", label: "Scheduled Events", icon: <Event className="text-black dark:text-white" /> },
  { path: "/availability", label: "Availability", icon: <CalendarToday className="text-black dark:text-white" /> },
];

const Sidebar = ({ darkMode, toggleDarkMode, isMobile, mobileOpen, onMobileClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);

  const handleNavClick = () => {
    if (isMobile) onMobileClose();
  };
  const sidebarContent = (
    <div className="h-screen w-full bg-white dark:bg-gray-900 p-4 flex flex-col">
      {!isMobile && (
        <IconButton 
          onClick={() => setCollapsed(!collapsed)} 
          className="self-end text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowBack className={`transform transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </IconButton>
      )}
      
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <IconButton 
            onClick={onMobileClose} 
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Close />
          </IconButton>
          <IconButton 
            onClick={toggleDarkMode} 
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
      )}

      <Button
        variant="outlined"
        className="w-full border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-500 hover:text-white"
        startIcon={<Event className="text-blue-500 dark:text-blue-400" />}
        onClick={() => {
          setOpenCreateEvent(true);
          if (isMobile) onMobileClose();
        }}
      >
        {(!collapsed || isMobile) && "Create Event"}
      </Button>

      <nav className="flex flex-col mt-4 gap-2">
        {routes.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white"
              }`
            }
            onClick={handleNavClick}
          >
            {icon} {(!collapsed || isMobile) && label}
          </NavLink>
        ))}
      </nav>

      {!isMobile && (
        <div className="mt-auto flex justify-center">
          <IconButton 
            onClick={toggleDarkMode} 
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
      )}
    </div>
  );

  return (
    <>
      {!isMobile && (
        <motion.div
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -250, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300 ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          {sidebarContent}
        </motion.div>
      )}
      {isMobile && (
        <Drawer 
          anchor="left" 
          open={mobileOpen} 
          onClose={onMobileClose}
          classes={{
            paper: "w-[80%] max-w-[300px]"
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
      <Dialog 
        open={openCreateEvent} 
        onClose={() => setOpenCreateEvent(false)}
        maxWidth="sm"
        fullWidth
      >
        <CreateEvent onClose={() => setOpenCreateEvent(false)} />
      </Dialog>
    </>
  );
};

export default Sidebar;