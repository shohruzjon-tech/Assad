import { call, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { db }  from '../../services/firebase';
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

async function getUser(id) {
    console.log(id);
    const docRef = doc(db, "stream-count", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
};

async function increaseBalance({ user, amount }){
    console.log(user, amount);
    const balanceRef = doc(db, "telegram-admins", user);
    await updateDoc(balanceRef, {
        balance: increment(amount),
    });
};

export const updateBalanceAsync = createAction('balance/updateAsync');



function* updateSaga({ payload }) {
        try {
            const stream = yield call(getUser, payload?._id);
            yield call(increaseBalance, {user: stream?.uid, amount: payload?.amount});
        } catch (error) {
            console.log(error);
        }
};
  
export function* balanceSaga() {
  yield takeLatest(updateBalanceAsync, updateSaga);
};