
import { all, call } from 'redux-saga/effects';
import { sagas as schedulerSagas } from '../components/Scheduler';

export default function* () {
    yield all([
        call(schedulerSagas)
    ]);
}
