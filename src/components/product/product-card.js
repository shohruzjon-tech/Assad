import PropTypes from 'prop-types';
import { Button, Box, Card, CardContent, Divider, Grid, Typography, Stack } from '@mui/material';
import EditModal from '../product-edit';
import { useState } from 'react';

export const ProductCard = ({ product, ...rest }) => {
  
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
        src={product?.images[0]}
        height='300px'
       />
      </Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        {product.name}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        213,000 so'm
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        Admin to'lovi
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        213,000 so'm
      </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        Kategoriyasi
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h6"
      >
        Bolalar
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
         <Button onClick={()=>setEdit(true)} variant='contained'>O'zgartirish</Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Button variant='contained' color='error'>O'chirish</Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
)};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
