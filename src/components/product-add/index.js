import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  {TextField, Grid, Divider, Button, Stack }  from '@mui/material';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  width: {xs: '100%', lg: 700},
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: {xs: 1, lg: 4},
  overflowY: 'auto',
};

export default function AddModal({ open, handleModal }) {

   const fileRef = useRef('');
   const [imagesList, setImages] = useState([]);

    const { handleChange, values } = useFormik({
        initialValues: {
         name: '',
         price: '',
         admin: '',
         category: '',
         description: '',
        },
        validationSchema: Yup.object({
          name: Yup.string().required('Mahsulot nomi kiritilishi shart!'),
          price: Yup.number().required('Mahsulot narxi kiritilishi shart!'),
          admin: Yup.number().required('Mahsulot uchun admin tulovini kiriting!'),
          category: Yup.string().required('Kategoriya aniq emas!'),
          description: Yup.string().required('Mahsulot haqida malumot kiritilishi kerak!'),
        }),
        onSubmit: (values) => {
          
        }
      });

      console.log(imagesList);

   
  return (
      <Modal
        open={open}
        onClose={()=>handleModal(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflowY: 'auto',
          height: '100vh',
          pt: 50,
          pb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{margin: '15px 0'}}>Mahsulot qo'shish</Typography>
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
                    multiline
                    rows={8}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <Stack>
                  <input type='file' multiple ref={fileRef} style={{display: 'none'}} onChange={(e)=>setImages(e.target.value)}/>
                  <Box
                   sx={{
                    width: '90%',
                    margin: '30px auto',
                    padding: '40px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor:  'pointer',
                    background: 'gray',
                   }}
                   onClick={()=>fileRef.current.click()}
                  >
                   <Box
                     component='img'
                     src='/static/upload.png'
                     alt='file upload'
                     width='100px'
                   />
                  </Box>
                </Stack>
                </Grid>
                <Grid
                item
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Mahsulot narxi"
                    name="price"
                    type="number"
                    onChange={handleChange}
                    required
                    value={values.price}
                    variant="outlined"
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
                    type="number"
                    value={values.admin}
                    variant="outlined"
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
                    type="number"
                    value={values.admin}
                    variant="outlined"
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
            >
            O'zgarishlarni saqlash
            </Button>
            </Box>
        </form>
        </Box>
      </Modal>
  );
}