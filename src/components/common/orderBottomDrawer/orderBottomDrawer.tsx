import {
    Box,
    Stack,
    SwipeableDrawer
} from "@mui/material";
import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import OrderCard, { IOrderCardProps } from "../orderCardList/OrderCard";
import SectionTitle from "../ui/typography/sectionTitle/SectionTitle";
  
  import { motion } from "framer-motion";
  
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
  
  const OrderBottomDrawer = forwardRef<TDrawerMethod, IDrawerProps>(
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
            </Box>
  
            {/* Card */}
            {bottomDrawer.data ? (
              <OrderCard {...bottomDrawer.data} />
            ) : (
              <Box sx={{ height: 90 }}></Box>
            )}
  
            {/* Buttons */}
            <Stack flexDirection={"row"} sx={{ padding: "2rem 0" }} gap={1}>
                {headElement}
            </Stack>
          </motion.div>
        </SwipeableDrawer>
      );
    }
  );
  
  export default OrderBottomDrawer;
  