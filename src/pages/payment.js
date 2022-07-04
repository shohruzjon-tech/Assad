import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import GlobalLoader from '../components/global-loader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PaymentRow from '../components/payment/row';
import { db } from '../services/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { toast } from 'react-toastify';

const Products = () => {
  const [reqList, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "payment-requests"), (snapshot) => {
         const arr=[];
         snapshot.forEach(doc=>{
          arr.push(doc.data());
         });
         setList(arr);
         setLoading(false);
    }, (error)=>{
         toast.error('Malumotni yuklab bulmadi!')
         setLoading(false);
    });

    return ()=>unsubscribe();
  }, [db]);
  
  if(isLoading) return <GlobalLoader/>;

  return (
  <>
    <Head>
      <title>
        Mahsulotlar | Xaridor.uz
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth={false}>
        <Typography variant='h5' sx={{py: 2}}>To'lov uchun so'rovlar</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='right'>ID</TableCell>
            <TableCell align="center">KARTA</TableCell>
            <TableCell align="center">SUMMA</TableCell>
            <TableCell align="center">ADMIN</TableCell>
            <TableCell align="center">ASOSIY BALANS</TableCell>
            <TableCell align="center">TO'LANGAN SO'MMA</TableCell>
            <TableCell align="center">HOLATI</TableCell>
            <TableCell align="center">HABAR</TableCell>
            <TableCell align="center">SANA</TableCell>
            <TableCell align="center">TAHRIR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reqList?.map((row, indx) => (<PaymentRow {...row} indx={indx} key={indx}/>))}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
    </Box>
  </>)
};

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
