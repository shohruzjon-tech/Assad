import PropTypes from 'prop-types';
import { Button, Box, Card, CardContent, Divider, Grid, Typography, Stack } from '@mui/material';
import EditModal from './edit';
import { useState } from 'react';
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';


export const OrderCard = ({ order, ...rest }) => {
  
  const [editModal, setEdit] = useState(false);

  const archiveOrders = async ()=>{
    toast.promise(
      setDoc(doc(db, "order-archive", order?.order_id), order),
      {
        pending: "Arxivlanyapti...",
        success: "Arxivlandi",
        error: 'Jarayon bekor qilindi',
      }
    );
    await deleteDoc(doc(db, "orders-list", order?.order_id));
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
      </Grid>
    </Box>
  </Card>
)};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired
};
