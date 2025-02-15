import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Switch,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  TextField
} from '@mui/material';
import {
  AccessTime,
  Add as AddIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  CalendarToday as CalendarIcon,
  List as ListIcon
} from '@mui/icons-material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const defaultHours = { start: "09:00", end: "17:00" };
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Availability = () => {
  const [view, setView] = useState("list");
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: {
        available: day !== "Sunday" && day !== "Saturday",
        slots: day !== "Sunday" && day !== "Saturday" ? [defaultHours] : []
      }
    }), {})
  );
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [copyToDay, setCopyToDay] = useState("");

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const toggleAvailability = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available,
      }
    }));
  };

  const addSlot = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, defaultHours]
      }
    }));
  };

  const deleteSlot = (day, index) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index)
      }
    }));
  };

  const handleCopy = () => {
    if (selectedDay && copyToDay) {
      setAvailability(prev => ({
        ...prev,
        [copyToDay]: {
          ...prev[copyToDay],
          available: prev[selectedDay].available,
          slots: [...prev[selectedDay].slots],
        },
      }));
      setShowCopyModal(false);
      setSelectedDay("");
      setCopyToDay("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow text-gray-900 dark:text-gray-100 w-full">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-xl font-bold">Default Schedule</h1>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="list" className="dark:text-gray-200">
            <ListIcon />
          </ToggleButton>
          <ToggleButton value="calendar" className="dark:text-gray-200">
            <CalendarIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {view === "list" ? (
        <div className="space-y-3">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md w-full">
              <div className="flex items-center gap-3 flex-wrap">
                <Switch
                  checked={availability[day].available}
                  onChange={() => toggleAvailability(day)}
                  className="dark:text-gray-200"
                />
                <span className="text-sm font-medium">{day}</span>
                <Tooltip title="Add Slot">
                  <IconButton onClick={() => addSlot(day)} className="text-gray-700 dark:text-gray-300">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy Availability">
                  <IconButton onClick={() => { setSelectedDay(day); setShowCopyModal(true); }} className="text-gray-700 dark:text-gray-300">
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              </div>

              {availability[day].slots.map((slot, index) => (
                <div key={index} className="flex items-center gap-3 mt-2 flex-wrap">
                  <AccessTime className="dark:text-gray-300" />
                  <TextField
                    size="small"
                    type="time"
                    value={slot.start}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full sm:w-auto"
                  />
                  <span>-</span>
                  <TextField
                    size="small"
                    type="time"
                    value={slot.end}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full sm:w-auto"
                  />
                  <Tooltip title="Delete Slot">
                    <IconButton onClick={() => deleteSlot(day, index)} className="text-red-600 dark:text-red-400">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            events={[]}
            editable={false}
            selectable={true}
            height="auto"
            className="w-full sm:w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Availability;