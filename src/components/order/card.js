import PropTypes from 'prop-types';
import { Button, Box, Card, CardContent, Divider, Grid, Typography, Stack } from '@mui/material';
import EditModal from './edit';
import { useState } from 'react';
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';
import format from 'date-fns/format';
import { archiveFile, removeFile } from '../../utils/changeStatus';
import { useRouter } from 'next/router';

const getstatus = (idx)=>{
  switch (idx) {
      case 1:
          return 'new';
      case 2:
          return 'onway';
      case 3:
          return 'delivered';
      case 4:    
          return 'canceled';
      case 5:
          return 'ready';
      case 6:
          return 'hold';
      default:
          return '';
  }
};

export const OrderCard = ({ order, ...rest }) => {
  
  const router = useRouter();
  const [editModal, setEdit] = useState(false);

  const archiveOrders = async ()=>{
    const status = getstatus(order?.status);
    toast.promise(
      Promise.all([
      setDoc(doc(db, "order-archive", order?.order_id), order),
      archiveFile(order?.streamID),
      deleteDoc(doc(db, "orders-list", order?.order_id)),
      removeFile(order?.streamID, status)
      ]),
      {
        pending: "Arxivlanyapti...",
        success: "Arxivlandi",
        error: 'Jarayon bekor qilindi',
      }
    );
  };

  const handleStat = ()=>{
    if(order?.streamID){
      router.push(`/order-stat/${order?.streamID}`);
      return;
    }else{
      toast.warning('Ushbu buyurtma admindan emas!')
    }
  }
  
  return (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Vaqti
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
        sx={{color: 'red'}}
      >
        {format(new Date(order?.createdAt.seconds*1000), 'yyyy-MM-dd HH:ss')}
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Mahsulot
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        {order?.product_name}
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Narxi
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
       {order?.product_price?.toLocaleString()} so'm
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Buyurtmachi
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        {order?.customer_name}
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Tel
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        {order?.customer_phone}
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Manzil
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        {order?.customer_address}
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Qo'shimcha
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        {order?.customer_info}
      </Typography>
      </Stack>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
         <EditModal open={editModal} handleModal={setEdit} order={order}/>
         <Button onClick={()=>setEdit(true)} variant='contained'>Tahrirlash</Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
         <EditModal open={editModal} handleModal={setEdit} order={order}/>
         <a href={`tel:${order?.customer_phone}`} style={{textDecoration: 'none'}}>
         <Button  variant='contained' color='success'>Qo'ng'iroq</Button>
         </a>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
         <Button onClick={archiveOrders} variant='contained' color='warning'>Arxivlash</Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
         <Button onClick={handleStat} variant='contained'>Statistika</Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
)};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired
};
