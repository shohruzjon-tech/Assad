import { all, call } from 'redux-saga/effects';
import { balanceSaga } from './balance/saga.slice';
import { requestSaga } from './requests/request.slice';
import { statisticsSaga } from './order-redux/statistics.slice';

export default function* rootSaga(){
    yield all([
         call(balanceSaga),
         call(requestSaga),
         call(statisticsSaga),
    ])
};