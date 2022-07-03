import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useSelector, useDispatch }  from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../redux/product-redux/product.slice';
import GlobalLoader from '../components/global-loader';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state)=>state.product.products);
  const isLoading = useSelector(state=>state.product.isLoading);

  useEffect(()=>{
    dispatch(getProducts());
   }, [dispatch])
  
  if(isLoading) return <GlobalLoader/>

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
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product._id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
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
  </>)
};

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
