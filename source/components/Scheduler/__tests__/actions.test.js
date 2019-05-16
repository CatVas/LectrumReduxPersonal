
import faker from 'faker';
import { range, random } from 'lodash';
import actions from '../actions';
import types from '../../../model/types';

describe('actions:', () => {
    it('generates "APP_LOADING" action', () => {
        const action = actions.appLoading();

        expect(action).toEqual({ type: types.APP_LOADING });
    });

    it('generates "CHANGE_TASK_MESSAGE" action', () => {
        const message = faker.lorem.words();
        const action = actions.changeTaskMessage(message);

        expect(action).toEqual({
            payload: { message },
            type: types.CHANGE_TASK_MESSAGE,
        });
    });

    it('generates "CLEAR_TASK_EDIT" action', () => {
        const action = actions.clearTaskEdit();

        expect(action).toEqual({ type: types.CLEAR_TASK_EDIT });
    });

    it('generates "CREATE_TASK" action', () => {
        const message = faker.lorem.words();
        const action = actions.createTask(message);

        expect(action).toEqual({
            payload: { message },
            type: types.CREATE_TASK,
        });
    });

    it('generates "CREATE_TASK_SUCCESS" action', () => {
        const task = { ...faker.random.objectElement() };
        const action = actions.createTaskSuccess(task);

        expect(action).toEqual({
            payload: { task },
            type: types.CREATE_TASK_SUCCESS,
        });
    });

    it('generates "DELETE_TASK" action', () => {
        const taskId = faker.lorem.word();
        const action = actions.deleteTask(taskId);

        expect(action).toEqual({
            payload: { taskId },
            type: types.DELETE_TASK,
        });
    });

    it('generates "DELETE_TASK_SUCCESS" action', () => {
        const taskId = faker.lorem.word();
        const action = actions.deleteTaskSuccess(taskId);

        expect(action).toEqual({
            payload: { taskId },
            type: types.DELETE_TASK_SUCCESS,
        });
    });

    it('generates "FETCH_TASKS" action', () => {
        const action = actions.fetchTasks();

        expect(action).toEqual({ type: types.FETCH_TASKS });
    });

    it('generates "FETCH_TASKS_SUCCESS" action', () => {
        const payload = {
            tasks: range(1, random(5, 9)).map(() => ({
                ...faker.random.objectElement(),
            })),
        };
        const action = actions.fetchTasksSuccess(payload);

        expect(action).toEqual({
            payload,
            type: types.FETCH_TASKS_SUCCESS,
        });
    });

    it('generates "SEARCH_TASKS" action', () => {
        const searchBy = faker.lorem.words();
        const action = actions.searchTasks(searchBy);

        expect(action).toEqual({
            payload: { searchBy },
            type: types.SEARCH_TASKS,
        });
    });

    it('generates "TASK_INPUT_CHANGE" action', () => {
        const value = faker.lorem.words();
        const action = actions.taskInputChange(value);

        expect(action).toEqual({
            payload: { value },
            type: types.TASK_INPUT_CHANGE,
        });
    });

    it('generates "TOGGLE_TASK_EDIT" action', () => {
        const payload = {
            id: faker.lorem.word(),
            message: faker.lorem.words(),
        };
        const action = actions.toggleTaskEdit(payload);

        expect(action).toEqual({
            payload,
            type: types.TOGGLE_TASK_EDIT,
        });
    });

    it('generates "UPDATE_TASKS" action', () => {
        const payload = {
            onSuccess: jest.fn(),
            tasks: range(1, random(5, 9)).map(() => ({
                ...faker.random.objectElement(),
            })),
        };
        const action = actions.updateTasks(payload);

        expect(action).toEqual({
            payload,
            type: types.UPDATE_TASKS,
        });
    });

    it('generates "UPDATE_TASKS_SUCCESS" action', () => {
        const payload = range(1, random(5, 9)).map(() => ({
            ...faker.random.objectElement(),
        }));
        const action = actions.updateTasksSuccess(payload);

        expect(action).toEqual({
            payload,
            type: types.UPDATE_TASKS_SUCCESS,
        });
    });
});
