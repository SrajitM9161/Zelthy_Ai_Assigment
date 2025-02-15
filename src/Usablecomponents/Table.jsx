import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import AppointmentModal from "./Modal";

const DataTable = ({ columns, data }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpen = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-base sm:text-lg md:text-2xl font-bold mb-2 sm:mb-4">
        Total Events: {data.length}
      </h1>

      {!isMobile ? (
        <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow-md">
          <Table className="w-full">
            <TableHead>
              <TableRow className="bg-gray-200 dark:bg-gray-700">
                {columns.map((col) => (
                  <TableCell
                    key={col.accessorKey}
                    className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 py-2 sm:py-3"
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.accessorKey}
                        className={`text-sm sm:text-base py-2 sm:py-3 ${
                          col.accessorKey === "name"
                            ? "text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                            : ""
                        }`}
                        onClick={
                          col.accessorKey === "name" ? () => handleOpen(row) : undefined
                        }
                      >
                        {col.accessorKey === "avatar" ? (
                          <Avatar
                            src={row[col.accessorKey]}
                            alt={row.name}
                            className="w-8 h-8 sm:w-10 sm:h-10"
                          />
                        ) : (
                          row[col.accessorKey]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-600 dark:text-gray-300"
                  >
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-4">
          {data.map((row, index) => (
            <div
              key={index}
              className="flex flex-col p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Avatar 
                  src={row.avatar} 
                  alt={row.name} 
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-blue-600 dark:text-blue-400 text-base sm:text-lg font-semibold cursor-pointer truncate"
                    onClick={() => handleOpen(row)}
                  >
                    {row.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                    {row.email}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                    {row.phone}
                  </p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">
                  <span className="font-medium">Event:</span> {row.eventType}
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">
                  <span className="font-medium">Date:</span> {row.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={handleClose}
          name={selectedContact?.name}
        />
      )}
    </div>
  );
};

export default DataTable;