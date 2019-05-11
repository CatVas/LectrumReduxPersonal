
import { createActions } from 'redux-actions';
import types from '../../model/types';

export default createActions({
    [types.FETCH_TASKS]: void 0,

    /**
     * @param {Object} payload
     * @param {Array} payload.tasks
    */
    [types.FETCH_TASKS_SUCCESS]: payload => payload,
});
