
import faker from 'faker';
import { fromJS } from 'immutable';
import reducer, { initialState } from '../reducer';
import types from '../../../model/types';

describe('reducer:', () => {
    it('handles "APP_LOADING" action', () => {
        const action = { type: types.APP_LOADING };
        const state = reducer(initialState, action);

        expect(state.get('loading')).toBe(true);
    });

    it('handles "CHANGE_TASK_MESSAGE" action', () => {
        const action = {
            payload: { message: faker.lorem.words() },
            type: types.CHANGE_TASK_MESSAGE,
        };
        const state = reducer(initialState, action);

        expect(state.getIn(['taskEdited', 'message']))
            .toBe(action.payload.message);
    });

    it('handles "CLEAR_TASK_EDIT" action', () => {
        const action = { type: types.CLEAR_TASK_EDIT };
        const state = reducer(initialState, action);

        expect(state.get('taskEdited'))
            .toEqual(initialState.get('taskEdited'));
    });

    it('handles "CREATE_TASK_SUCCESS" action', () => {
        const action = {
            payload: {
                task: { ...faker.random.objectElement() },
            },
            type: types.CREATE_TASK_SUCCESS,
        };
        const state = reducer(initialState, action);

        expect(state.getIn(['tasks', 0]).toJS())
            .toEqual(action.payload.task);
        expect(state.get('loading')).toBe(false);
    });

    it('handles "DELETE_TASK_SUCCESS" action', () => {
        const task = {
            ...faker.random.objectElement(),
            id: faker.lorem.word(),
        };
        const action = {
            payload: { taskId: task.id },
            type: types.DELETE_TASK_SUCCESS,
        };
        const newState = initialState.update(
            'tasks',
            tasks => tasks.unshift(fromJS(task)),
        );
        const state = reducer(newState, action);

        expect(state.get('tasks')
            .filter(t => t.get('id') === task.id)
            .toJS()
            .length
        ).toEqual(newState.get('tasks').toJS().length - 1);
        expect(state.get('loading')).toBe(false);
    });

    it('handles "FETCH_TASKS_SUCCESS" action', () => {
        const task = {
            ...faker.random.objectElement(),
            id: faker.lorem.word(),
        };
        const action = {
            payload: { tasks: [task] },
            type: types.FETCH_TASKS_SUCCESS,
        };
        const state = reducer(initialState, action);

        expect(state.get('tasks')).toEqual(fromJS(action.payload.tasks));
        expect(state.get('loading')).toBe(false);
    });

    it('handles "SEARCH_TASKS" action', () => {
        const action = {
            payload: { searchBy: faker.lorem.words() },
            type: types.SEARCH_TASKS,
        };
        const state = reducer(initialState, action);

        expect(state.get('searchBy')).toEqual(action.payload.searchBy);
    });

    it('handles "TASK_INPUT_CHANGE" action', () => {
        const action = {
            payload: { value: faker.lorem.words() },
            type: types.TASK_INPUT_CHANGE,
        };
        const state = reducer(initialState, action);

        expect(state.getIn(['taskInput', 'value'])).toEqual(action.payload.value);
    });

    describe('handles "TOGGLE_TASK_EDIT" action', () => {
        it('toggles on', () => {
            const action = {
                payload: {
                    id: faker.lorem.word(),
                    message: faker.lorem.words(),
                },
                type: types.TOGGLE_TASK_EDIT,
            };
            const state = reducer(initialState, action);

            expect(state.get('taskEdited')).toEqual(fromJS(action.payload));
        });

        it('toggles off', () => {
            const action = {
                payload: {
                    id: faker.lorem.word(),
                    message: faker.lorem.words(),
                },
                type: types.TOGGLE_TASK_EDIT,
            };
            const prevState = initialState
                .setIn(['taskEdited'], fromJS(action.payload));
            const state = reducer(prevState, action);

            expect(state.get('taskEdited'))
                .toEqual(initialState.get('taskEdited'));
        });
    });

    it('handles "UPDATE_TASKS_SUCCESS" action', () => {
        const action = {
            payload: [
                {
                    ...faker.random.objectElement(),
                    id: faker.lorem.word(),
                }
            ],
            type: types.UPDATE_TASKS_SUCCESS,
        };
        const prevTask = {
            ...faker.random.objectElement(),
            id: action.payload[0].id,
        };
        const prevState = initialState.set('tasks', fromJS([prevTask]));
        const state = reducer(prevState, action);

        expect(state.getIn(['tasks', 0]).toJS()).toEqual({
            ...prevTask,
            ...action.payload[0],
        });
    });
});
