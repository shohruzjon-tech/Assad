import React from 'react';
import { Box, Stack } from '@mui/material';


const GlobalLoader = () =>{

    return(
        <Stack alignItems='center' justifyContent='center' sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background: '#fff'
        }}>
            <Box
             component='img'
             src='/static/loader.gif'
             width='200px'
            />
        </Stack>
    )
};


export default GlobalLoader;