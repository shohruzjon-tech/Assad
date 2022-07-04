import { call, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { db }  from '../../services/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

async function getUser(id) {
    const docRef = doc(db, "stream-count", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
};

async function changerequets(data){
    const requestRef = doc(db, "order-requests", data._id);
    await setDoc(requestRef, data,{merge: true});
};

export const updateRequestAsync = createAction('request/update');



function* changeRequestSaga({ payload }) {
        try {
            const user = yield call(getUser, payload.stream);
            yield call(changerequets, {...payload, user_id: user.uid});
        } catch (error) {
            console.log(error);
        }
};
  
export function* requestSaga() {
  yield takeLatest(updateRequestAsync, changeRequestSaga);
};