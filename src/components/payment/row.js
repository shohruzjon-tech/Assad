import React, { useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';
import format from 'date-fns/format';
import { useRouter } from 'next/router';

const getStatus = (val)=>{
  switch (val) {
   case 1:
      return {color: '#c419c7', label: 'Qabul qilindi'};
   case 2:
      return {color: 'orange', label: 'Tekshiruvda'};
   case 3:
      return {color: 'green', label: "To'landi"};
   case 4:
      return {color: 'red', label: "Bekor qilindi"};
   default:
      return {color: '#c419c7', label: 'Qabul qilindi'};
  };
};


const PaymentRow = ({ _id, card, amount, createdAt, status, user_id, message })=>{
    const stausState = getStatus(status);
    const router = useRouter();
    const paymentRef = doc(db, "payment-requests", _id);
    const adminRef = doc(db, "telegram-admins", user_id);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [admin, setAdmin] = React.useState({});
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
      const unsub = onSnapshot(doc(db, "telegram-admins", user_id), (doc) => {
        const data = doc.data();
        setAdmin(data);
      });

      return ()=>unsub()
    },[db]);

    function orderReceived(){
      toast.promise(
        updateDoc(paymentRef, {
          status: 1,
      }),
      {
        pending: 'Holat saqlanmoqda...',
        success: 'Holat saqlandi👌',
        error: 'Bekor qilindi 🤯'
      }
      )
    };

    function orderCheck(){
      toast.promise(
        updateDoc(paymentRef, {
          status: 2,
      }),
      {
        pending: 'Holat saqlanmoqda...',
        success: 'Holat saqlandi👌',
        error: 'Bekor qilindi 🤯'
      }
      )
    };

    function orderPaid(){
      const money = parseInt(amount);
      toast.promise(
        Promise.all([
          updateDoc(paymentRef, {
            status: 3,
        }),
          updateDoc(adminRef, {
            balance: increment(-money),
            paid: increment(money),
        }),
        ]).then(()=>{}).catch(error=>console.log(error)),
      {
        pending: 'Holat saqlanmoqda...',
        success: 'Holat saqlandi👌',
        error: 'Bekor qilindi 🤯'
      }
      )
    };

    function orderCanceled(){
      toast.promise(
        updateDoc(paymentRef, {
          status: 4,
      }),
      {
        pending: 'Holat saqlanmoqda...',
        success: 'Holat saqlandi👌',
        error: 'Bekor qilindi 🤯'
      }
      )
    };

    return(
        <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-child(even)':{background: '#24292e0f'}}}
        align="right"
      >
        <TableCell component="th" scope="row">
          {_id}
        </TableCell>
        <TableCell align="center">{card}</TableCell>
        <TableCell align="center">{parseInt(amount).toLocaleString()} so'm</TableCell>
        <TableCell align="center" sx={{color: 'red', cursor: 'pointer'}} onClick={()=>router.push(`/telegram-admins/${user_id}`)}>{admin?.name}</TableCell>
        <TableCell align="center" sx={{color: 'red', cursor: 'pointer'}}>{admin?.balance}</TableCell>
        <TableCell align="center" sx={{color: 'red', cursor: 'pointer'}}>{admin?.paid}</TableCell>
        <TableCell align="center" sx={{color: stausState.color}}>{stausState?.label}</TableCell>
        <TableCell align="center">{message}</TableCell>
        <TableCell align="center">{format(new Date(createdAt.seconds*1000), 'yyyy-MM-dd, HH:mm')}</TableCell>
        <TableCell align="center">
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ mr: 2 }}
        >
          <MoreIcon />
        </IconButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={orderReceived}>Qabul qilindi</MenuItem>
        <MenuItem onClick={orderCheck}>Tekshiruvda</MenuItem>
        <MenuItem onClick={orderPaid}>To'landi</MenuItem>
        <MenuItem onClick={orderCanceled}>Bekor qilindi</MenuItem>
      </Menu>
        </TableCell>
      </TableRow>
    )
};

export default PaymentRow;