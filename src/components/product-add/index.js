import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  { Card, TextField, CardHeader, Grid, Divider, CardContent, Button }  from '@mui/material';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddModal({ open, handleModal }) {

    const { handleChange, values } = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup
            .string()
            .email(
              'Login Elektron pochta shaklida kiritiladi!')
            .max(255)
            .required(
              'Login kiritilishi shart!'),
          password: Yup
            .string()
            .max(255)
            .required(
              'Parol kiritilishi shart!')
        }),
        onSubmit: (values) => {
          
        }
      });

   
  return (
      <Modal
        open={open}
        onClose={()=>handleModal(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form
        autoComplete="off"
        noValidate
        >
        <Card>
            <CardHeader
            subheader="Malumotni o'zgartirish mumkin"
            title="Profil"
            />
            <Divider />
            <CardContent>
            <Grid
                container
                spacing={3}
            >
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Ism"
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Familiya"
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="outlined"
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Elektron pochta"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Telefon raqam"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                />
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Davlat"
                    name="country"
                    onChange={handleChange}
                    required
                    value={values.country}
                    variant="outlined"
                />
                </Grid>
            </Grid>
            </CardContent>
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
            >
            O'zgarishlarni saqlash
            </Button>
            </Box>
        </Card>
        </form>
        </Box>
      </Modal>
  );
}