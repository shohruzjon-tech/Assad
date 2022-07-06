import PropTypes from 'prop-types';
import { Button, Box, Card, CardContent, Divider, Grid, Typography, Stack } from '@mui/material';
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';
import format from 'date-fns/format';

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

export const ArchivedOrder = ({ order, ...rest }) => {


  const archiveOrders = async ()=>{
    toast.promise(
      Promise.all([
        setDoc(doc(db, 'orders-list', order?.order_id), order),
        deleteDoc(doc(db, 'order-archive', order?.order_id))
      ]),
      {
        pending: "Arxiv qaytarilyapti...",
        success: "Arxivlangan buyirtma qayta tiklandi",
        error: 'Jarayon bekor qilindi',
      }
    );
  };
  
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
         <Button onClick={archiveOrders} variant='contained'>QAYTA TIKLASH</Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
         <a href={`tel:${order?.customer_phone}`} style={{textDecoration: 'none'}}>
         <Button  variant='contained' color='success'>Qo'ng'iroq</Button>
         </a>
        </Grid>
      </Grid>
    </Box>
  </Card>
)};

ArchivedOrder.propTypes = {
  order: PropTypes.object.isRequired
};
