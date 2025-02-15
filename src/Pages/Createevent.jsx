import { useState } from "react";

const CreateEvent = ({ onClose }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Event Created:", eventData);
    onClose();
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Create New Event
      </h2>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event details..."
            rows="3"
            className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 resize-none"
          />
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-4 py-3 sm:py-2 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;