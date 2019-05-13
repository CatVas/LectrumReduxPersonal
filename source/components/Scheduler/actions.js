
import { createActions } from 'redux-actions';
import types from '../../model/types';

export default createActions({
    [types.APP_LOADING]: void 0,

    /**
     * @param {String} message
    */
    [types.CREATE_TASK]: message => ({ message }),

    /**
     * @param {Object} task
    */
    [types.CREATE_TASK_SUCCESS]: task => ({ task }),

    /**
     * @param {String} taskId
    */
    [types.DELETE_TASK]: taskId => ({ taskId }),

    /**
     * @param {String} taskId
    */
    [types.DELETE_TASK_SUCCESS]: taskId => ({ taskId }),

    [types.FETCH_TASKS]: void 0,

    /**
     * @param {Object} payload
     * @param {Array} payload.tasks
    */
    [types.FETCH_TASKS_SUCCESS]: payload => payload,

    /**
     * @param {String} value
    */
    [types.TASK_INPUT_CHANGE]: value => ({ value }),
});
