import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import { Calendar, FilterIcon } from 'lucide-react';
import DataTable from '../Usablecomponents/Table';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const columns = [
  { header: "Event Name", accessorKey: "eventName" },
  { 
    header: "Date", accessorKey: "date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString()
  },
  { header: "Time", accessorKey: "time" },
  { header: "Contact", accessorKey: "contact" },
  { 
    header: "Status", accessorKey: "status",
    cell: (info) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        info.getValue() === 'Upcoming' ? 'bg-green-100 text-green-800' :
        info.getValue() === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {info.getValue()}
      </span>
    )
  }
];

const SchedulePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || generateSampleEvents();
    setEvents(storedEvents);
  }, []);

  function generateSampleEvents() {
    const sampleEvents = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      eventName: `Event ${i + 1}`,
      date: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
      time: `${(i % 12) + 1}:00 ${(i % 12) + 1 > 6 ? 'PM' : 'AM'}`,
      contact: `Contact ${i + 1}`,
      status: i % 3 === 0 ? 'Upcoming' : i % 3 === 1 ? 'Pending' : 'Past'
    }));
    localStorage.setItem('events', JSON.stringify(sampleEvents));
    return sampleEvents;
  }

  const filteredEvents = {
    upcoming: events.filter(event => event.status === 'Upcoming'),
    pending: events.filter(event => event.status === 'Pending'),
    past: events.filter(event => event.status === 'Past')
  };

  if (filterDate) {
    Object.keys(filteredEvents).forEach(key => {
      filteredEvents[key] = filteredEvents[key].filter(event => 
        new Date(event.date).toDateString() === filterDate.toDateString()
      );
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Schedule Management
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage your upcoming and past events
            </p>
          </div>
          <Button
            onClick={() => setIsCalendarOpen(true)}
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <FilterIcon className="w-5 h-5" />
            Filter by Date
          </Button>
        </div>

        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {['upcoming', 'pending', 'past'].map(status => (
            <button
              key={status}
              onClick={() => navigate(`/events/${status}`)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/events/upcoming" replace />} />
            {Object.entries(filteredEvents).map(([key, eventList]) => (
              <Route
                key={key}
                path={`/${key}`}
                element={<DataTable columns={columns} data={eventList} />}
              />
            ))}
          </Routes>
        </div>
      </div>
      <Dialog open={isCalendarOpen} onClose={() => setIsCalendarOpen(false)}>
        <div className="p-4">
          <CalendarComponent
            onChange={(date) => {
              setFilterDate(date);
              setIsCalendarOpen(false);
            }}
            value={filterDate}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default SchedulePage;