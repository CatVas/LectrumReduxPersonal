
import { call, put } from 'redux-saga/effects';
import actions from '../../actions';
import { api } from '../../../../REST';

export default function* ({ payload }) {
    yield put(actions.appLoading());

    const { onSuccess, ...rest } = payload;
    const { updatedTasks } = yield call(api.updateTask, rest);

    if (updatedTasks) {
        yield put(actions.updateTaskSuccess(updatedTasks[0]));
        typeof onSuccess === 'function' && onSuccess();
    }
}
