import PropTypes from 'prop-types';
import { Button, Box, Card, CardContent, Divider, Grid, Typography, Stack } from '@mui/material';
import EditModal from '../product-edit';
import { useState } from 'react';
export const OrderCard = ({ order, ...rest }) => {
  
  const [editModal, setEdit] = useState(false);
  
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
       <Box
        component='img'
        src={order?.image}
        height='300px'
       />
      </Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        Mahsulot nomi
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
        Mahsulot Narxi
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
        Buyurtmachi ismi
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
        Buyurtmachi telefon raqami
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
         <EditModal open={editModal} handleChange={setEdit}/>
         <Button onClick={()=>setEdit(true)} variant='contained'>Tahrirlash</Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
        </Grid>
      </Grid>
    </Box>
  </Card>
)};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired
};
