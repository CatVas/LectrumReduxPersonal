
import { call, put } from 'redux-saga/effects';
import actions from '../../actions';
import { api } from '../../../../REST';

export default function* ({ payload }) {
    const { message } = payload;

    yield put(actions.appLoading());

    const { task } = yield call(api.createTask, message);

    if (task) {
        yield put(actions.createTaskSuccess(task));
    }
}
