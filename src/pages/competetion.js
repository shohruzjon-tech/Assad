import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Divider, Grid, Modal, Stack, Typography, Box, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactHtmlParser  from 'react-html-parser';
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db }  from '../services/firebase';
import GlobalLoader from '../components/global-loader';
import { toast} from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import format from "date-fns/format";
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import uz from 'date-fns/locale/uz';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '95%', lg: 700},
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

  

const ConcursePage = () =>{
    const [users, setUsers]=useState([]);
    const [task, setTask] = useState(undefined);
    const [modal, setModal]=useState(false);
    const [isLoading, setLoading] = useState(false);
    const user = useSelector(state=>state.user.user);
    const formik = useFormik({
      initialValues:{
         name: task?.name,
         description: task?.description,
         startedAt: task?.startedAt,
         endAt: task?.endAt,
      },
      onSubmit:(values)=>{
         console.log(values);
      }
    })

    useEffect(()=>{
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, "competetion/Ee7ztMouwJU6Wy5G7p2w/participants"), (snapshot) => {
            const arr=[];
            snapshot.forEach(doc=>{
                const data = doc.data();
                arr.push(data);
            });
            setUsers(arr);
            setLoading(false)
          });
        const unsub = onSnapshot(doc(db, "competetion", "Ee7ztMouwJU6Wy5G7p2w"), (snapshot) => {
            const data = snapshot.data();
            setTask(data);
          });
        return ()=> {
            unsubscribe();
            unsub();
        };
    }, [db]);

    const isExist = users?.find(item=>item?._id===user?.uid);
    const generateAstriks = (idn)=>{
       const part = idn?.slice(0, 15);
       return idn?.replace(part, '**********')
    };

    const joinCom = ()=>{
          
    };


    if(isLoading) return <GlobalLoader/>;
    return(
        <Stack px={3}>
        <Head>
          <title>xaridor.com | Konkurs</title>
        </Head>
            <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{padding: '20px 20px'}}>
                <Button disabled={isExist} onClick={joinCom} variant="contained" color='success'><DeleteIcon sx={{mr: 1}}/>YANGI KONKURS</Button>
                <Button  onClick={()=>setModal(!modal)} variant="contained" color='primary' sx={{ml:2}}><EditIcon sx={{mr: 1}}/> HOZIRGINI TAHRIRLASH</Button>
            </Stack>
            <Modal
               open={modal}
               onClose={()=>setModal(!modal)}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
             <Box component='form' sx={style} onSubmit={formik.handleSubmit}>
                <Typography variant='h5'>Konkursga O'zgartirish kiritsh</Typography>
                <Stack>
                  <Stack mt={3}>
                    <TextField
                     label='Konkurs nomi'
                     name='name'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.name}
                     required
                    />
                  </Stack>
                  <Stack mt={3}>
                   <TextField/>
                  </Stack>
                  <Stack mt={3}>
                    <TextField
                     value={formik.values.startedAt}
                     required
                     disabled
                     label='Konkurs boshlangan'
                    />
                  </Stack>
                  <Stack mt={3}>
                  <LocalizationProvider locale={uz} dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Tugash muddati"
                    inputFormat="MM/dd/yyyy"
                    value={formik?.endAt}
                    onChange={formik.handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </LocalizationProvider>
                  </Stack>
                  <Stack mt={3}>
                    <Button variant='contained' color='success' type='submit'>YANGILASH</Button>
                  </Stack>
                </Stack>
            </Box>
            </Modal>
         <Stack>
            <Typography variant="h4" sx={{textAlign: 'center', padding: '30px 0', fontFamily: 'serif'}}>{task?.name}</Typography>
            <Divider/>
            <Stack mt={5} mb={5}>
                {ReactHtmlParser(<div>salom</div>)}
            </Stack>
            <Stack sx={{padding: '0 10px'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>N</TableCell>
                            <TableCell align="right">Sotuvchi ID</TableCell>
                            <TableCell align="right">Sotilgan</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users?.map((row, indx) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: indx===0||indx===1||indx===2? 'yellow' : 'white' }}
                            >
                            <TableCell component="th" scope="row">
                                {indx+1}
                            </TableCell>
                            <TableCell align="right">{generateAstriks(row?._id)}</TableCell>
                            <TableCell align="right">{row?.count}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                     <Stack sx={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '20px', borderRadius: '10px', mb: 3}}>
                            <Typography variant="h5" component='h4' sx={{mb:3}}>Boshlanish vaqti</Typography>
                            <Typography variant="body1" component='h4'>{task?format(new Date(task?.startedAt?.seconds*1000), 'yyyy-MM-dd HH:mm'): ''}</Typography>
                        </Stack>
                        <Stack sx={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '20px', borderRadius: '10px'}}>
                            <Typography variant="h5" component='h4' sx={{mb:3}}>Tugash vaqti</Typography>
                            <Typography variant="body1" component='h4'>{task?format(new Date(task?.endAt?.seconds*1000), 'yyyy-MM-dd HH:mm'): ''}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
         </Stack>
        </Stack>
    )
};

ConcursePage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ConcursePage;
