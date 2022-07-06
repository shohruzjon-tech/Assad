import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { getStatisticsAsync } from "../../redux/order-redux/statistics.slice";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from "next/router";



export default function StatisticsModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const stream = router.query.id;
  const admin = useSelector(state=>state.adminStat.admin);
  
  useEffect(()=>{
      dispatch(getStatisticsAsync({_id: stream?.toString()}));
  }, [dispatch])

  return (
    <DashboardLayout>
      <Box sx={muistyles.menu}>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h1" component="h2">
    
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          spacing={13}
          sx={{ pt: 2, pb: 2, pl: 5, background: "#F6F9FF" }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                backgroundColor: "#D96C45",
                width: "30px",
                height: "30px",
              }}
              src={admin?.avatar}
            />
            <Typography variant="body1" component="span">
               {admin?.name} {admin?.surname}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1" component="span">
                Balans: 
              </Typography>
              <Typography variant="h6" component="span">
                {admin?.balance?.toLocaleString()} so'm
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1" component="span">
                To'langan:
              </Typography>
              <Typography variant="h6" component="span">
              {admin?.paid?.toLocaleString()}
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={1}>
          </Stack>
        </Stack>
        <Divider />
        <Stack p={2} spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h2" component="h4" sx={{ fontSize: "16px" }}>
              Telefon raqam:
            </Typography>
            <Typography variant="body1" component="span">
              {admin?.phone}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h2" component="h4" sx={{ fontSize: "16px" }}>
              Viloyati:
            </Typography>
            <Typography variant="body1" component="span">
               {admin?.region}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h2" component="h4" sx={{ fontSize: "16px" }}>
               Tumani:
            </Typography>
            <Typography variant="body1" component="span">
               {admin?.city}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
      </Box>
    </DashboardLayout>
  );
}

const muistyles = {
    menu: {
      position: "absolute",
      backgroundColor: "#F1FFEE",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      boxShadow: 24,
      border: "1px solid #68B94C",
      borderRadius: "10px",
      overflowY: "auto",
      outline: 'none',
      "&::-webkit-scrollbar": {
        display: "none",
      },
      width: { xs: "95%", sm: "50%" },
      maxHeight: "95vh",
    },
  };