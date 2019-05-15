
import { createActions } from 'redux-actions';
import types from '../../model/types';

export default createActions({
    [types.APP_LOADING]: void 0,

    /**
     * @param {String} message
     * @return {Object}
    */
    [types.CHANGE_TASK_MESSAGE]: message => ({ message }),

    [types.CLEAR_TASK_EDIT]: void 0,

    /**
     * @param {String} message
     * @return {Object}
    */
    [types.CREATE_TASK]: message => ({ message }),

    /**
     * @param {Object} task
     * @return {Object}
    */
    [types.CREATE_TASK_SUCCESS]: task => ({ task }),

    /**
     * @param {String} taskId
     * @return {Object}
    */
    [types.DELETE_TASK]: taskId => ({ taskId }),

    /**
     * @param {String} taskId
     * @return {Object}
    */
    [types.DELETE_TASK_SUCCESS]: taskId => ({ taskId }),

    [types.FETCH_TASKS]: void 0,

    /**
     * @param {Object} payload
     * @param {Array} payload.tasks
     * @return {Object}
    */
    [types.FETCH_TASKS_SUCCESS]: payload => payload,

    /**
     * @param {String} searchBy
     * @return {Object}
    */
    [types.SEARCH_TASKS]: searchBy => ({ searchBy }),

    /**
     * @param {String} value
     * @return {Object}
    */
    [types.TASK_INPUT_CHANGE]: value => ({ value }),

    /**
     * @param {Object} payload
     * @param {String} payload.id
     * @param {String} payload.message
     * @return {Object}
    */
    [types.TOGGLE_TASK_EDIT]: payload => payload,

    /**
     * @param {Object} payload
     * @param {Object[]} payload.tasks
     * @param {Boolean} payload.tasks.completed
     * @param {Boolean} payload.tasks.favorite
     * @param {String} payload.tasks.id
     * @param {String} payload.tasks.message
     * @param {Function} payload.onSuccess
     * @return {Object}
    */
    [types.UPDATE_TASKS]: payload => payload,

    /**
     * @param {Array} payload
     * @param {Boolean} payload[].completed
     * @param {Boolean} payload[].favorite
     * @param {String} payload[].id
     * @param {String} payload[].message
     * @param {String} payload[].modified
     * @return {Object}
    */
    [types.UPDATE_TASKS_SUCCESS]: payload => payload,
});
