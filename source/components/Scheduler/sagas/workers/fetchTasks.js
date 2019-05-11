
import { call, put } from 'redux-saga/effects';
import actions from '../../actions';
import { api } from '../../../../REST';

export default function* () {
    const { tasks } = yield call(api.fetchTasks);

    if (tasks) {
        yield put(actions.fetchTasksSuccess({
            tasks,
        }));
    }
}
