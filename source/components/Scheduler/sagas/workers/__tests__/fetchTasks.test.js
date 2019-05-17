
import faker from 'faker';
import { random, range } from 'lodash';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import fetchTasks from '../fetchTasks';
import actions from '../../../actions';
import { api } from '../../../../../REST';

const fakeArray = () => range(1, random(5, 9))
    .map(() => ({ ...faker.random.objectElement() }));

describe('fetchTasks saga:', () => {
    let tasks = [];

    beforeEach(() => {
        tasks = fakeArray();
    });

    it('handles a success case', async () => {
        await expectSaga(fetchTasks)
            .provide([
                [call(api.fetchTasks), { tasks }]
            ])
            .put(actions.fetchTasksSuccess({ tasks }))
            .run();
    });

    it('handles an error case', async () => {
        await expectSaga(fetchTasks)
            .provide([
                [call(api.fetchTasks), {}]
            ])
            .not.put(actions.fetchTasksSuccess({ tasks }))
            .run();
    });
});
