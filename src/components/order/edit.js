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
import { updateOrder }  from '../../redux/order-redux/update';

const statuses = [
    {
        _id: 1,
        label: 'yangi'
    },
    {
        _id: 2,
        label: "Jo'natilinyapti"
    },
    {
        _id: 3,
        label: "Jo'natildi"
    },
    {
        _id: 4,
        label: "atkaz"
    }
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
   const isLoading = useSelector(state=>state.updateOrder.isLoading);

    const { handleChange, values, errors, touched, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
         customer_name: order?.customer_name,
         customer_phone: order?.customer_phone,
         customer_address: order?.customer_address,
         status: order?.status,
         customer_info: '',
        },
        validationSchema: Yup.object({
          customer_name: Yup.string().required('Mijoz ismi kiritilishi shart!'),
          customer_phone: Yup.string().required('Mahsulot narxi kiritilishi shart!'),
          customer_address: Yup.string().required('Mijoz manzilini kiriting kiriting!'),
          status: Yup.string().required('Holatini kiriting!'),
        }),
        onSubmit: (values) => {
            dispatch(updateOrder({
                ...order,
                ...values,
            }));
            handleModal(false);
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
          <Typography variant="h5" sx={{margin: '15px 0'}}>Buyurtmani tahrirlash</Typography>
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
                    label="Mijoz ismi"
                    name="customer_name"
                    onChange={handleChange}
                    required
                    value={values.customer_name}
                    variant="outlined"
                    error={Boolean(touched.customer_name && errors.customer_name)}
                    helperText={touched.customer_name && errors.customer_name}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Manzili"
                    name="customer_address"
                    onChange={handleChange}
                    required
                    value={values.customer_address}
                    variant="outlined"
                    error={Boolean(touched.customer_address && errors.customer_address)}
                    helperText={touched.customer_address && errors.description}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Telefon"
                    name="customer_phone"
                    onChange={handleChange}
                    required
                    value={values.customer_phone}
                    variant="outlined"
                    error={Boolean(touched.customer_phone && errors.customer_phone)}
                    helperText={touched.customer_phone && errors.customer_phone}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Holati</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.status}
                    label="Holati"
                    onChange={(e)=>setFieldValue('status', e.target.value)}
                    >
                    {
                     statuses?.map((item)=>
                     <MenuItem value={item?._id} key={item?._id}>{item.label}</MenuItem>
                     )
                    }
                    </Select>
                </FormControl>
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Qo'shimcha malumotlar"
                    name="customer_info"
                    onChange={handleChange}
                    value={values.customer_info}
                    variant="outlined"
                    error={Boolean(touched.customer_info && errors.customer_info)}
                    helperText={touched.customer_info && errors.customer_info}
                    multiline
                    rows={3}
                />
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