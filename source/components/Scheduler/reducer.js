
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import types from '../../model/types';

const initialState = fromJS({
    loading: true,
    tasks: [],
});

export default handleActions({
    [types.FETCH_TASKS_SUCCESS]: (state, { payload }) => initialState
        .set('loading', false)
        .set('tasks', payload.tasks),
}, initialState);
