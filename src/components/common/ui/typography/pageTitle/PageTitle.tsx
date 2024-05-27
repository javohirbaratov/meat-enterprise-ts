import { Typography } from "@mui/material";
import React from "react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography sx={{ mt: 3, mb: 2 }} variant="h5" component="div">
      {title}
    </Typography>
  );
};

export default PageTitle;
