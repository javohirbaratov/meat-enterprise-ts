import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, memo } from "react";
import { ISalesAddOrderProduct } from "../../../../app/services/sales/order/salesOrder";
import NumericFormatCustom from "../../../../components/common/numericFormatCustom/NumericFormatCustom";
import formatCommaNum from "../../../../util/formatCommaNum";

export interface AddOrderTabeRow extends ISalesAddOrderProduct {
  uuid: string,
  name: string;
}
interface AddOrderTabeProps {
  data: AddOrderTabeRow[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AddOrderTable: React.FC<AddOrderTabeProps> = ({ data, handleChange }) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ px: 0.5, fontSize: 12 }} align="left">
              Mahsulot
            </TableCell>
            <TableCell sx={{ px: 0.5, fontSize: 12 }}>Narx</TableCell>
            <TableCell sx={{ px: 0.5, fontSize: 12 }}>Miqdor</TableCell>
            <TableCell sx={{ px: 0.5, fontSize: 12 }} width={80} align="right">
              Summa
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                sx={{ px: 0.5, color: "#747C85", fontSize: 12 }}
                scope="row"
                align="left"
              >
                {row.name}
              </TableCell>
              <TableCell component="th" sx={{ px: 0.5 }} scope="row">
                <TextField
                  name={`${row.uuid}.price`}
                  id={`${row.uuid}.price`}
                  size="small"
                  label="Narx"
                  variant="standard"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  required={true}
                  fullWidth
                  value={row.price || ""}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell component="th" sx={{ px: 0.5 }} scope="row">
                <TextField
                  name={`${row.uuid}.massa`}
                  id={`${row.uuid}.massa`}
                  size="small"
                  label="Miqdor"
                  variant="standard"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  fullWidth
                  value={row.massa || ""}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell
                component="th"
                sx={{ px: 0.5, color: "#747C85", fontSize: 12 }}
                scope="row"
                align="right"
              >
                {formatCommaNum.formatNumber(
                  (row.price || 0) * (row.massa || 0)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(AddOrderTable);
