import { Stack } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { IDate } from "../../../../types/api";

interface MyDateRangeProps {
  setValue: ({ start, end }: IDate) => void;
}

const MyDateRange: React.FC<MyDateRangeProps> = ({ setValue }) => {
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs().add(1, 'day'));

  useEffect(() => {
    const data: IDate = { start: null, end: null };

    if (start) {
      data.start = start?.format("DD/MM/YYYY").replace(/\//g, ".");
    }

    if (end) {
      data.end = end?.format("DD/MM/YYYY").replace(/\//g, ".");
    }

    setValue(data);
  }, [end, setValue, start]);

  return (
    <Stack
      gap={1}
      flexDirection={"row"}
      alignItems={"center"}
      flexWrap={"wrap"}
      justifyContent={"end"}
      sx={{ width: "100%" }}
    >
      <DateField
        size="small"
        label="Sana 1"
        defaultValue={dayjs()}
        value={start}
        onChange={setStart}
        format="DD/MM/YYYY"
      />
      <DateField
        size="small"
        label="Sana 2"
        value={end}
        onChange={setEnd}
        format="DD/MM/YYYY"
      />
    </Stack>
  );
};

export default MyDateRange;
