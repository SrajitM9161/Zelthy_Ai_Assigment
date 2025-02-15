import React from "react";
import { Pagination as MUIPagination } from "@mui/material";

const Pagination = ({ page, setPage, totalPages }) => {
  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <div className="flex justify-center mt-4">
      <MUIPagination count={totalPages} page={page} onChange={handleChange} color="primary" />
    </div>
  );
};

export default Pagination;