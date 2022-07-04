import { all, call } from 'redux-saga/effects';
import { balanceSaga } from './balance/saga.slice';

export default function* rootSaga(){
    yield all([
         call(balanceSaga)
    ])
};