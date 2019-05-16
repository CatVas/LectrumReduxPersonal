
import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import createTask from '../createTask';
import actions from '../../../actions';
import { api } from '../../../../../REST';

describe('createTask saga:', () => {
    let payload;
    let task;

    beforeEach(() => {
        payload = { message: faker.lorem.words() };
        task = { ...faker.random.objectElement() };
    });

    it('turns the app loading on', async () => {
        await expectSaga(createTask, { payload })
            .put(actions.appLoading())
            .run();
    });

    it('handles a success case', async () => {
        await expectSaga(createTask, { payload })
            .provide([
                [call(api.createTask, payload.message), { task }]
            ])
            .put(actions.createTaskSuccess(task))
            .run();
    });

    it('handles an error case', async () => {
        await expectSaga(createTask, { payload })
            .provide([
                [call(api.createTask, payload.message), {}]
            ])
            .not.put(actions.createTaskSuccess(task))
            .run();
    });
});
