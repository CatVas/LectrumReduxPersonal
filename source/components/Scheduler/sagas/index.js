
import { takeLatest } from 'redux-saga/effects';
import { createTask, deleteTask, fetchTasks, updateTask } from './workers';
import types from '../../../model/types';

export default function* () {
    yield takeLatest(types.CREATE_TASK, createTask);
    yield takeLatest(types.DELETE_TASK, deleteTask);
    yield takeLatest(types.FETCH_TASKS, fetchTasks);
    yield takeLatest(types.UPDATE_TASK, updateTask);
}
