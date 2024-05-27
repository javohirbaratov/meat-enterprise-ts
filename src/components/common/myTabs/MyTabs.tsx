import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

import { motion } from "framer-motion";

interface IMyTabsItem {
  key: number;
  label: string;
}

interface IMyTabsProps {
  data: IMyTabsItem[];
  value: number;
  setValue: (val: number) => void;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyTabs: React.FC<IMyTabsProps> = ({ data, value, setValue }) => {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{width:'100%'}}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example" 
            variant="fullWidth"
          >
            {data.map((item) => (
              <Tab  label={item.label} {...a11yProps(item.key)} key={item.key} />
            ))}
          </Tabs>
        </Box>
      </Box>
    </motion.div>
  );
};

export default MyTabs;
