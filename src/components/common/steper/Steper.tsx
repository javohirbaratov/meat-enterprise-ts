import {
  Description,
  FactCheck,
  Favorite,
  People,
  ShoppingBasket,
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#5473FF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#5473FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    marginLeft: 5,
    marginRight: 5,
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[900] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  color: "#242E39",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #A1AEBE",
  ...(ownerState.active && {
    borderColor: "#5473FF",
    color: "#5473FF",
  }),
  ...(ownerState.completed && {
    borderColor: "#5473FF",
    color: "#5473FF",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <People sx={{fontSize: 18}} />,
    2: <ShoppingBasket sx={{fontSize: 18}} />,
    3: <FactCheck sx={{fontSize: 18}} />,
    4: <Description sx={{fontSize: 18}} />,
    5: <Favorite sx={{fontSize: 18}} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    key: 0,
    label: "Mijoz", 
  },
  {
    key: 1,
    label: "Mahsulot", 
  },
  {
    key: 2,
    label: "Miqdor", 
  },
  {
    key: 3,
    label: "Ko'rish", 
  },
  {
    key: 4,
    label: "Finish", 
  },
];

export type ISteperIndex = number;
interface ISteperProps {
  value: ISteperIndex;
  setValue: React.Dispatch<ISteperIndex>;
}

const Steper: React.FC<ISteperProps> = ({ value, setValue }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={value}
        connector={<ColorlibConnector />}
      >
        {steps.map((item) => (
          <Step key={item.key}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              onClick={() => setValue(item.key)}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default Steper;
