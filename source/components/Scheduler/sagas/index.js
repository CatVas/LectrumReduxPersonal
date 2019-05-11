
import { takeLatest } from 'redux-saga/effects';
import { fetchTasks } from './workers';
import types from '../../../model/types';

export default function* () {
    yield takeLatest(types.FETCH_TASKS, fetchTasks);
}
