
import { call, put } from 'redux-saga/effects';
import actions from '../../actions';
import { api } from '../../../../REST';

export default function* ({ payload }) {
    const { taskId } = payload;

    yield put(actions.appLoading());

    const { success } = yield call(api.deleteTask, taskId);

    if (success) {
        yield put(actions.deleteTaskSuccess(taskId));
    }
}
