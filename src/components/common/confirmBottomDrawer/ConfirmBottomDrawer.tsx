import {
  Box,
  Button,
  Stack,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import OrderCard, { IOrderCardProps } from "../orderCardList/OrderCard";
import SectionTitle from "../ui/typography/sectionTitle/SectionTitle";

import { motion } from "framer-motion";
import formatCommaNum from "../../../util/formatCommaNum";
import { LoadingButton } from "@mui/lab";
import { Check, Close } from "@mui/icons-material";

export type TDrawerDataType = IOrderCardProps | null;

type TDrawerState = {
  open: boolean;
  data: TDrawerDataType;
};

export type TDrawerMethod = {
  onOpen: (val: TDrawerDataType) => void;
  getData: () => TDrawerDataType;
  onClose: () => void;
};

type IDrawerProps = {
  isLoading: boolean;
  setConfirmed: (id: string | number | null) => void;
  title?: string;
  headElement?: ReactNode;
};

const ConfirmBottomDrawer = forwardRef<TDrawerMethod, IDrawerProps>(
  (
    { setConfirmed, isLoading, title = "Buyurtmani qabul qilish", headElement },
    ref
  ) => {
    const [bottomDrawer, setBottomDrawer] = useState<TDrawerState>({
      open: false,
      data: null,
    });

    useImperativeHandle(ref, () => ({
      onOpen: (val: TDrawerDataType): void => handleOpenDrawer(val),
      getData: (): TDrawerDataType => bottomDrawer.data,
      onClose: () => handleCloseDrawer(),
    }));

    // Drawer
    const handleOpenDrawer = (data: TDrawerDataType) =>
      setBottomDrawer({ open: true, data });
    const handleCloseDrawer = () => {
      setBottomDrawer({ open: false, data: null })
    };    
    return (
      <SwipeableDrawer
        anchor={"bottom"}
        open={bottomDrawer.open}
        onClose={handleCloseDrawer}
        onOpen={(val) => console.log(val)}
        sx={{ zIndex: 9999 }}
        disableSwipeToOpen={true}
        PaperProps={{
          style: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: "18px 14px",
          },
        }}
      >
        <motion.div
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <SectionTitle title={title} />
            {headElement}
          </Box>

          {/* Card */}
          {bottomDrawer.data ? (
            <OrderCard {...bottomDrawer.data} />
          ) : (
            <Box sx={{ height: 90 }}></Box>
          )}

          <TableContainer sx={{ marginTop: "1rem", maxHeight: 300 }}>

            <Table size="small" aria-label="a dense table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Nomi</TableCell>
                  <TableCell align="right">Miqdori</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bottomDrawer.data?.productList?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.product_name}
                    </TableCell>
                    <TableCell align="right">
                      <b>{formatCommaNum.formatNumber(row.massa)}</b> kg
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell  component="th" scope="row">
                    Izoh:
                  </TableCell>
                  <TableCell align="right">
                    {bottomDrawer.data?.comment}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Buttons */}
          <Stack flexDirection={"row"} sx={{ padding: "2rem 0" }} gap={2}>
            <Button
              startIcon={<Close />}
              variant="contained"
              color="error"
              onClick={handleCloseDrawer}
              fullWidth
            >
              Bekor qilish
            </Button>
            <LoadingButton
              startIcon={<Check />}
              loadingPosition="start"
              loading={isLoading}
              variant="contained"
              onClick={() => setConfirmed(bottomDrawer.data?.id || null)}
              fullWidth
            >
              Tasdiqlash
            </LoadingButton>
          </Stack>
        </motion.div>
      </SwipeableDrawer>
    );
  }
);

export default ConfirmBottomDrawer;
