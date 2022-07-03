import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { OrderCard } from  '../../components/order/card';
import { DashboardLayout } from '../../components/dashboard-layout';
import { db } from '../../services/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import GlobalLoader from '../../components/global-loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Orders = () => {

  const router = useRouter()
  const [ordersList, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(()=>{
    setLoading(true);
    const unsub = onSnapshot(collection(db, "orders-list"), (snapshot) => {
      const array = [];
      snapshot.forEach((doc)=>{
        const data = doc.data();
        array.push(data);
      })
      setList(array);
      setLoading(false);
  },
  (error) => {
    setLoading(false);
    toast.error("Malumotni yuklab bulmadi!")
  });

  return () =>{
    unsub();
  }
  }, [db]);
  
  if(isLoading) return <GlobalLoader/>;
  return (
  <>
    <Head>
      <title>
        Buyurtmalar | Xaridor.uz
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
    <Box sx={{width: '100%', overflowX: 'auto', padding: '20px 0', '&::--webkit-scrollbar':{display: 'none'}, }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='success' onClick={()=>router.push('/orders')}>BARCHASI</Button>
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='primary' onClick={()=>router.push('/orders/1')}>YANGI</Button>
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='primary' onClick={()=>router.push('/orders/5')}>DASTAFKAGA TAYYOR</Button>
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='warning' onClick={()=>router.push('/orders/2')}>YETKAZILMOQDA</Button>
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='secondary' onClick={()=>router.push('/orders/3')}>YETKAZILDI</Button>
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='success'  onClick={()=>router.push('/orders/6')}>KEYIN OLADI</Button>
      <Button sx={{ml: 2, borderRadius: '50px', width: '120px'}} color='error' onClick={()=>router.push('/orders/4')}>ATKAZ</Button>
    </ButtonGroup>
    </Box>
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {ordersList?.map((order) => (
              <Grid
                item
                key={order?.order_id}
                lg={4}
                md={6}
                xs={12}
              >
               <OrderCard order={order}/>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
        </Box>
      </Container>
    </Box>
  </>
)};

Orders.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Orders;