import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '90%', lg: 700},
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AdminModal({ open, handleModal }) {

    const formik = useFormik({
         initialValues:{
            name: '',
            surname: '',
            phone: '',
            region: '',
            city: '',
            email: '',
            password: '',
         },
         onSubmit: (values)=>{
            console.log(values);
             const id = Date.now().toString();
             handleModal(!open);
             toast.promise(
                setDoc(doc(db, "telegram-admins", id), {...values, _id: id, createdAt: new Date()}),
                {
                  pending: "Admin yaratilinyapti",
                  success: "Admin yaratildi...",
                  error: 'Kiritilgan admin mavjud',
                }
            );
         }
    });

    const handleSubmit = (e)=>{
         e.preventDefault();
         createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password).then(()=>{
            formik.handleSubmit();
         }).catch((error)=>{
            alert('Admin mavjud!')
         });
    }

  return (
      <Modal
        open={open}
        onClose={()=>handleModal(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component='form' onSubmit={handleSubmit}>
           <Typography variant='h6'>Admin qo'shish</Typography>
           <Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin ism'
              name='name'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.name}
             />
            </Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin Familiyasi'
              name='surname'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.surname}
             />
            </Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin Telefon raqami'
              name='phone'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.phone}
             />
            </Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin Viloyati'
              name='region'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.region}
             />
            </Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin Tumani'
              name='city'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.city}
             />
            </Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin uchun login'
              name='email'
              required
              type='email'
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.email}
             />
            </Box>
            <Box sx={{mt: 3}}>
            <TextField
              fullWidth
              label='Admin uchun parol'
              name='password'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.password}
             />
            </Box>
            <Box sx={{mt: 3}}>
                <Button type='submit' variant='contained'>Qo'shish</Button>
            </Box>
           </Box>
        </Box>
      </Modal>
  );
}