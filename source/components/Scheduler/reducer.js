
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { sortImmutableTasks } from '../../instruments/helpers';
import types from '../../model/types';

const initialState = fromJS({
    loading: true,
    taskEdited: {
        id: '',
        message: '',
    },
    taskInput: {
        value: '',
    },
    tasks: [],
});

export default handleActions({
    [types.APP_LOADING]: (state, { payload }) => state
        .set('loading', true),

    [types.CHANGE_TASK_MESSAGE]: (state, { payload }) => state
        .setIn(['taskEdited', 'message'], payload.message),

    [types.CLEAR_TASK_EDIT]: (state, { payload }) => state
        .set('taskEdited', initialState.get('taskEdited')),

    [types.CREATE_TASK_SUCCESS]: (state, { payload }) => state
        .update(
            'tasks',
            tasks => sortImmutableTasks(tasks.unshift(fromJS(payload.task))),
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
        .update(
            'tasks',
            tasks => sortImmutableTasks(tasks.concat(fromJS(payload.tasks))),
        ),

    [types.TASK_INPUT_CHANGE]: (state, { payload }) => state
        .updateIn(
            ['taskInput', 'value'],
            value => payload.value,
        ),

    [types.TOGGLE_TASK_EDIT]: (state, { payload }) => {
        const isEdited = state.getIn(['taskEdited', 'id']) === payload.id;

        return state
            .updateIn(['taskEdited', 'id'], id => isEdited ? '' : payload.id)
            .updateIn(
                ['taskEdited', 'message'],
                message => isEdited ? '' : payload.message
            );
    },

    [types.UPDATE_TASK_SUCCESS]: (state, { payload }) => state
        .update(
            'tasks',
            (tasks) => {
                const idx = tasks
                    .findIndex(task => task.get('id') === payload.id);

                return sortImmutableTasks(
                    tasks.update(idx, task => task.merge(payload))
                )
            },
        )
        .set('loading', false),
}, initialState);
