
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import types from '../../model/types';

const initialState = fromJS({
    loading: true,
    taskInput: {
        value: '',
    },
    tasks: [],
});

export default handleActions({
    [types.APP_LOADING]: (state, { payload }) => state
        .set('loading', true),

    [types.CREATE_TASK_SUCCESS]: (state, { payload }) => state
        .update(
            'tasks',
            tasks => tasks.unshift(fromJS(payload.task)),
        )
        .updateIn(['taskInput', 'value'], value => '')
        .set('loading', false),

    [types.DELETE_TASK_SUCCESS]: (state, { payload }) => state
        .update(
            'tasks',
            tasks => tasks.filter(task => task.get('id') !== payload.taskId),
        )
        .set('loading', false),

    [types.FETCH_TASKS_SUCCESS]: (state, { payload }) => state
        .set('loading', false)
        .update('tasks', tasks => tasks.concat(fromJS(payload.tasks))),

    [types.TASK_INPUT_CHANGE]: (state, { payload }) => state
        .updateIn(
            ['taskInput', 'value'],
            value => payload.value,
        ),
}, initialState);
