import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const generateTimeSlots = () => {
  const slots = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0];
    slots[formattedDate] = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];
  }
  return slots;
};

const availableSlots = generateTimeSlots();

const Appointment = ({ isOpen, onClose, name }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "";
  const slots = availableSlots[formattedDate] || [];

  const handleConfirm = () => {
    if (selectedSlot) {
      alert(`Appointment confirmed with ${name} for ${formattedDate} at ${selectedSlot}`);
      onClose();
    }
  };

  return (
    <Transition show={isOpen} as="div" className="relative z-50">
      <Dialog 
        onClose={onClose} 
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Book Appointment with {name}
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Date:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  inline
                  highlightDates={Object.keys(availableSlots).map(date => new Date(date))}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Time Slots:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 text-sm rounded-lg transition-colors duration-200
                        ${selectedSlot === slot 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-2">
                    No slots available
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedSlot}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors duration-200
                ${selectedSlot 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Appointment;