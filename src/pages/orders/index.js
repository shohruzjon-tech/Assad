import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { OrderCard } from  '../../components/order/card';
import { DashboardLayout } from '../../components/dashboard-layout';
import { db } from '../../services/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import GlobalLoader from '../../components/global-loader';
import { toast } from 'react-toastify';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/router'

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
        py: 8
      }}
    >
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Barchasi" sx={{color: 'green'}} onClick={()=>router.push('/orders')}/>
        <BottomNavigationAction label="yangi" sx={{color: 'green'}} onClick={()=>router.push('/orders/1')}/>
        <BottomNavigationAction label="Tayyorlanyapti" sx={{color: 'green'}} onClick={()=>router.push('/orders/2')}/>
        <BottomNavigationAction label="Jo'natildi" sx={{color: 'green'}} onClick={()=>router.push('/orders/3')}/>
        <BottomNavigationAction label="Atkaz" sx={{color: 'green'}} onClick={()=>router.push('/orders/4')}/>
      </BottomNavigation>
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