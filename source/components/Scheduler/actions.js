
import { createActions } from 'redux-actions';
import types from '../../model/types';

export default createActions({
    [types.APP_LOADING]: void 0,

    /**
     * @param {String} message - task message
     * @return {Object} action
    */
    [types.CHANGE_TASK_MESSAGE]: (message) => ({ message }),

    [types.CLEAR_TASK_EDIT]: void 0,

    /**
     * @param {String} message - new task
     * @return {Object} action
    */
    [types.CREATE_TASK]: (message) => ({ message }),

    /**
     * @param {Object} task - task object
     * @return {Object} action
    */
    [types.CREATE_TASK_SUCCESS]: (task) => ({ task }),

    /**
     * @param {String} taskId - deleting task ID
     * @return {Object} action
    */
    [types.DELETE_TASK]: (taskId) => ({ taskId }),

    /**
     * @param {String} taskId - deleting task ID
     * @return {Object} action
    */
    [types.DELETE_TASK_SUCCESS]: (taskId) => ({ taskId }),

    [types.FETCH_TASKS]: void 0,

    /**
     * @param {Object} payload - action data
     * @param {Array} payload.tasks - fetched tasks
     * @return {Object} action
    */
    [types.FETCH_TASKS_SUCCESS]: (payload) => payload,

    /**
     * @param {String} searchBy - searching term
     * @return {Object} action
    */
    [types.SEARCH_TASKS]: (searchBy) => ({ searchBy }),

    /**
     * @param {String} value - updated task message
     * @return {Object} action
    */
    [types.TASK_INPUT_CHANGE]: (value) => ({ value }),

    /**
     * @param {Object} payload - action data
     * @param {String} payload.id - editing task ID
     * @param {String} payload.message - editing task message
     * @return {Object} action
    */
    [types.TOGGLE_TASK_EDIT]: (payload) => payload,

    /**
     * @param {Object} payload - action data
     * @param {Function} payload.onSuccess - callback
     * @param {Object[]} payload.tasks - tasks array
     * @param {Boolean} payload.tasks[].completed
     * @param {Boolean} payload.tasks[].favorite
     * @param {String} payload.tasks[].id
     * @param {String} payload.tasks[].message
     * @return {Object} action
    */
    [types.UPDATE_TASKS]: (payload) => payload,

    /**
     * @param {Array} payload - tasks
     * @param {Boolean} payload[].completed - task completion flag
     * @param {Boolean} payload[].favorite - task favorite flag
     * @param {String} payload[].id - task ID
     * @param {String} payload[].message - task message
     * @param {String} payload[].modified - when has a task been last modified
     * @return {Object} action
    */
    [types.UPDATE_TASKS_SUCCESS]: (payload) => payload,
});
