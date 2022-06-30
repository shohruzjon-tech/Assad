import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Orders = () => (
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
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
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
  </>
);

Orders.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Orders;