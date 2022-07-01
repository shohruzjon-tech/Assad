import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  {TextField, Grid, Divider, Button, Stack }  from '@mui/material';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postOrder } from 'src/redux/order-redux/order.slice';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../services/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import GlobalLoader from '../global-loader';
import { getProducts } from '../../redux/product-redux/product.slice';

const style = {
  position: 'absolute',
  width: {xs: '100%', lg: 700},
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: {xs: 1, lg: 4},
  overflowY: 'auto',
};

export default function AddModal({ open, handleModal }) {
   const dispatch = useDispatch();
   const isLoading = useSelector(state=>state.order.isLoading);
   const fileRef = useRef('');
   const [imagesList, setImages] = useState([]);
   const [reference, setRefer] = useState(undefined);

    const { handleChange, values, errors, touched, handleSubmit } = useFormik({
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
          dispatch(postOrder({
            ...values,
            _id: Date.now().toString(),
            images: imagesList,
          }));

          dispatch(getProducts());
        }
      });
   

      function ImageUploader (file){
        // Create the file metadata
        /** @type {any} */
          const metadata = {
            contentType: 'image/png'
          };
      
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error);
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
      
              // ...
      
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setImages([downloadURL]);
            });
          }
        );
      };

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
                    multiline
                    rows={8}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                />
                </Grid>
                <Grid
                item
                xs={12}
                >
                <Stack>
                  <input 
                    type='file' 
                    accept="image/png, image/jpg, image/jpeg, image/webp" 
                    ref={fileRef} 
                    style={{display: 'none'}} 
                    onChange={(e)=>{
                      if(e.target.files[0]){
                        ImageUploader(e.target.files[0]);
                        setRefer(URL.createObjectURL(e.target.files[0]))
                      }
                    }}
                    />
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
                  <Stack>
                    {
                      reference?
                      <Box
                      component='img'
                      src={reference}
                      alt='uploaded image'
                      width='100px'
                    />:undefined
                    }
                  </Stack>
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
                    type="number"
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
                <TextField
                    fullWidth
                    label="Mahsulot kategoriyasi"
                    name="category"
                    onChange={handleChange}
                    type="number"
                    value={values.category}
                    variant="outlined"
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
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
             Mahsulotni qo'shish
            </Button>
            </Box>
        </form>
        </Box>
      </Modal>
  );
}