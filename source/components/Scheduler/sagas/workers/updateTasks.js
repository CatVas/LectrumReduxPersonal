
import { call, put } from 'redux-saga/effects';
import actions from '../../actions';
import { api } from '../../../../REST';

export default function* ({ payload }) {
    yield put(actions.appLoading());

    const { onSuccess, tasks } = payload;
    const { updatedTasks } = yield call(api.updateTasks, tasks);

    if (updatedTasks) {
        yield put(actions.updateTasksSuccess(updatedTasks));
        typeof onSuccess === 'function' && onSuccess();
    }
}
