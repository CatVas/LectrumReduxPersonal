
import { combineReducers } from 'redux';
import { reducer as schedulerReduser } from '../components/Scheduler';

export default combineReducers({
    scheduler: schedulerReduser,
});
