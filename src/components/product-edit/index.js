import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  {TextField, Grid, Divider, Button, Stack }  from '@mui/material';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import GlobalLoader from '../global-loader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { postOrder } from '../../redux/order-redux/order.slice';
import { getProducts } from '../../redux/product-redux/product.slice';


const statuses = [
    {
        _id: 1,
        label: "Go'zallik va salomatlik"
    },
    {
        _id: 2,
        label: "Bolalar uchun"
    },
    {
        _id: 3,
        label: "Erkaklar uchun"
    },
    {
        _id: 4,
        label: "Uy va ro'zg'or"
    },
    {
        _id: 5,
        label: "Smartfon va smart soatlar"
    },
    {
        _id: 6,
        label: "Maishiy texnikalar"
    },
];

const style = {
  position: 'absolute',
  width: {xs: '100%', lg: 700},
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: {xs: 1, lg: 4},
  overflowY: 'auto',
};

export default function AddModal({ open, handleModal, order}) {
   const dispatch = useDispatch();
   const isLoading = useSelector(state=>state.order.isLoading);

    const { handleChange, values, errors, touched, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
         name: order?.name,
         price: order?.price,
         description: order?.description,
         category: order?.category,
         admin: order?.admin,
        },
        validationSchema: Yup.object({
          name: Yup.string().required('Mahsulot nomi kiritlishi shart!'),
          price: Yup.number().required('Mahsulot narxi kiritilishi shart!'),
          description: Yup.string().required('Mahsulot haqida kiriting!'),
          category: Yup.number().required('Kategoriya kiritilmadi!'),
          admin: Yup.number().required('Admin tulovi kiritilmadi!'),
        }),
        onSubmit: (values) => {
            dispatch(postOrder({
                ...order,
                ...values,
            }));
            handleModal(false);
            dispatch(getProducts());
        }
      });
   

  if(isLoading) return <GlobalLoader/>;
   
  return (
      <Modal
        open={open}
        onClose={()=>handleModal(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflowY: 'auto',
          height: '100vh',
          pt: 10,
          pb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{margin: '15px 0'}}>Mahsulotni tahrirlash</Typography>
        <form
        autoComplete="off"
        noValidate
        >
            <Grid
                container
                spacing={3}
            >
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Mahsulot nomi"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Mahsulot haqida"
                    name="description"
                    onChange={handleChange}
                    required
                    value={values.description}
                    variant="outlined"
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    multiline
                    rows={6}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Mahsulot narxi"
                    name="price"
                    onChange={handleChange}
                    required
                    type='number'
                    value={values.price}
                    variant="outlined"
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Admin to'lovi"
                    name="admin"
                    onChange={handleChange}
                    type='number'
                    required
                    value={values.admin}
                    variant="outlined"
                    error={Boolean(touched.admin && errors.admin)}
                    helperText={touched.admin && errors.admin}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Mahulot kategoriyasi</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values?.category}
                    label="Mahulot kategoriyasi"
                    onChange={(e)=>setFieldValue('category', e.target.value)}
                    >
                    {
                     statuses?.map((item)=>
                     <MenuItem value={item?._id} key={item?._id}>{item.label}</MenuItem>
                     )
                    }
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
            <Divider />
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
            }}
            >
            <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
            >
             O'zgarishlarni saqlash
            </Button>
            </Box>
        </form>
        </Box>
      </Modal>
  );
}
