
import faker from 'faker';
import { pick, random, range } from 'lodash';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import updateTasks from '../updateTasks';
import actions from '../../../actions';
import { api } from '../../../../../REST';

const fakeArray = () => range(1, random(5, 9))
    .map(() => ({ ...faker.random.objectElement() }));

describe('updateTasks saga:', () => {
    let payload = {};
    let updatedTasks = [];

    beforeEach(() => {
        payload = {
            onSuccess: jest.fn(),
            tasks:     fakeArray(),
        };
        updatedTasks = fakeArray();
    });

    it('turns the app loading on', async () => {
        await expectSaga(updateTasks, { payload })
            .put(actions.appLoading())
            .run();
    });

    it('handles a success case with a callback', async () => {
        await expectSaga(updateTasks, { payload })
            .provide([
                [call(api.updateTasks, payload.tasks), { updatedTasks }]
            ])
            .put(actions.updateTasksSuccess(updatedTasks))
            .call(payload.onSuccess)
            .run();
    });

    it('handles a success case without a callback', async () => {
        const newPayload = pick(payload, ['tasks']);

        await expectSaga(updateTasks, { payload: newPayload })
            .provide([
                [call(api.updateTasks, payload.tasks), { updatedTasks }]
            ])
            .put(actions.updateTasksSuccess(updatedTasks))
            .not.call(payload.onSuccess)
            .run();
    });

    it('handles an error case', async () => {
        await expectSaga(updateTasks, { payload })
            .provide([
                [call(api.updateTasks, payload.tasks), {}]
            ])
            .not.put(actions.updateTasksSuccess(updatedTasks))
            .not.call(payload.onSuccess)
            .run();
    });
});
