import React from "react";
import DataTable from "../Usablecomponents/Table";

const columns = [
  { header: "Avatar", accessorKey: "avatar" },
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Phone", accessorKey: "phone" },
  { header: "Age", accessorKey: "age" },
  { header: "Event Type", accessorKey: "eventType" },
  { header: "Date", accessorKey: "date" },
];

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const Contact = () => {
  const generateData = (count) => {
    const avatars = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
    ];
    const events = ["Meeting", "Call", "Webinar", "Interview", "Consultation"];
    
    return Array.from({ length: count }, (_, i) => ({
      avatar: avatars[i % avatars.length],
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `123-456-${(i + 1).toString().padStart(4, "0")}`,
      age: 20 + (i % 30),
      eventType: events[i % events.length],
      date: formatDate(`2025-02-${((i + 1) % 28) + 1}`),
    }));
  };

  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Contact Management
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            View and manage your contacts and their scheduled events
          </p>
        </header>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <DataTable 
            columns={columns} 
            data={generateData(50)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;