import React, { useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { formatFloat } from "../../../../util/formatFloat";

type MyNumTextProps = {
  value: number;
};

const MyNumText: React.FC<MyNumTextProps> = ({ value }) => {
  // useMemo
  const newValue = useMemo(() => {
    return formatFloat(value);
  }, [value]);

  return (
    <NumericFormat displayType="text" value={newValue} thousandSeparator="," />
  );
};

export default MyNumText;
