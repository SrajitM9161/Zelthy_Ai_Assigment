import React, { useState, useEffect, Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const mockSlots = [
      { title: "Available: 9:00 AM - 5:00 PM", start: "2025-02-27", end: "2025-02-27" },
      { title: "Available: 9:00 AM - 5:00 PM", start: "2025-02-28", end: "2025-02-28" },
      { title: "Available: 9:00 AM - 5:00 PM", start: "2025-03-01", end: "2025-03-01" },
      { title: "Available: 10:00 AM - 4:00 PM", start: "2025-03-02", end: "2025-03-02" },
    ];
    setEvents(mockSlots);
  }, []);

  return (
    <Suspense fallback={<div className="flex justify-center mt-10"><CircularProgress /></div>}>
      <div className="p-4 max-w-5xl mx-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          editable={false}
        />
      </div>
    </Suspense>
  );
};

export default CalendarView;
