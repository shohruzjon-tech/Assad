import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { db }  from '../../services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { setAdmin }  from './admin.info.slice';


async function getUser(id) {
    const docRef = doc(db, "stream-count", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
};

async function getAdmin(user){
    const userRef = doc(db, "telegram-admins", user);
    const result = await  getDoc(userRef);
    const data = result.data();
    return data;
};

export const getStatisticsAsync = createAction('statics/getStatisticsAsync');



function* statSaga({ payload }) {
        try {
            const stream = yield call(getUser, payload?._id);
            const admin = yield call(getAdmin, stream?.uid);
            yield put(setAdmin(admin));
        } catch (error) {
            console.log(error.message);
        }
};
  
export function* statisticsSaga() {
  yield takeLatest(getStatisticsAsync, statSaga);
};