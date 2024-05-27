import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import React from "react";

export type TPieChart = {
  id: string | number;
  value: number;
  label: string;
  percent: number;
};

type TPieChartProps = {
  data: TPieChart[];
};

const MyPieChart: React.FC<TPieChartProps> = ({ data }) => {
  return (
    <PieChart
      margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
      series={[
        {
          arcLabel: (item) => (item.percent > 0 ? `${item.percent}%` : ""),
          data,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: 0,
        },
      }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "#000",
          fontWeight: 500,
          fontSize: 11,
          fontFamily: "OpenSans, sans-serif",
        },
      }}
      height={350}
    />
  );
};

export default MyPieChart;
