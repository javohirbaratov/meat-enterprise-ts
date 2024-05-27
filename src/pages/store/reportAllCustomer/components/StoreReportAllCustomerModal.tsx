import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { IStoreReportCustomerStatusData, useGetStoreReportByStatusCustomerQuery } from '../../../../app/services/store/reports/storeReports';
import formatCommaNum from '../../../../util/formatCommaNum';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 2,
  py: 4,
  borderRadius: 2
};



type StoreReportAllCustomerModalProps = {
  id: number,
  status: string,
  open: boolean;
  handleClose: VoidFunction
};




const StoreReportAllCustomerModal: React.FC<StoreReportAllCustomerModalProps> = (
  {
    id, status, open, handleClose
  }

) => {

  // API
  const { data, isLoading, isFetching } = useGetStoreReportByStatusCustomerQuery({
    status: status,
    reportId: id,
  });

  const formatNumberSum = (num: any) => {
    return !isNaN(Number(formatCommaNum.formatNumber(Number(num)))) ? Number(formatCommaNum.formatNumber(Number(num))) : 0
  }


  const filterData = React.useMemo(() => {
    if (data?.success && data.data) {
      const { client, client_telefon, summa, vaqt }: IStoreReportCustomerStatusData = data.data
      return [
        {
          id: 1,
          label: "Xaridor",
          value: client,
        },
        {
          id: 2,
          label: "Xaridor",
          value: client_telefon,
        },
        {
          id: 3,
          label: "Jami summa",
          value: summa,
        },
        {
          id: 9,
          label: "Vaqt",
          value: vaqt,
        },
      ]
    }

    return []
  }, [data]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        sx={{ zIndex: 9999 }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" gutterBottom>
              Yetkazib beruvchi : {data?.data.dostavka}
            </Typography>
            <Box >
              {filterData.map(item => (
                <Typography key={item.id} id="transition-modal-title" variant="subtitle1" gutterBottom>
                  {item.label} : {item.value}
                </Typography>
              ))}
            </Box>
            {data?.data.items?.map((row) => (
              <Box >
                <Typography id="transition-modal-title" variant="subtitle2" gutterBottom>
                  nomi : {row.item_name}
                </Typography>
                <Typography id="transition-modal-title" variant="subtitle2" gutterBottom>
                  soni : {formatCommaNum.formatNumber(row.soni)}
                </Typography>
                <Typography id="transition-modal-title" variant="subtitle2" gutterBottom>
                  summa : <b>{formatCommaNum.formatNumber(row.summa)}</b>
                </Typography>
                <Typography id="transition-modal-title" variant="subtitle2" gutterBottom>
                  narxi : <b>{formatCommaNum.formatNumber(row.price)}</b>
                </Typography>
              </Box>
            ))}
          </Box>
        </Fade>
      </Modal>
    </div >
  );
};

export default StoreReportAllCustomerModal;