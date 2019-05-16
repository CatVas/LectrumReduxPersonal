
import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import deleteTask from '../deleteTask';
import actions from '../../../actions';
import { api } from '../../../../../REST';

describe('deleteTask saga:', () => {
    let payload;

    beforeEach(() => {
        payload = { taskId: faker.random.number() };
    });

    it('turns the app loading on', async () => {
        await expectSaga(deleteTask, { payload })
            .put(actions.appLoading())
            .run();
    });

    it('handles a success case', async () => {
        await expectSaga(deleteTask, { payload })
            .provide([
                [call(api.deleteTask, payload.taskId), { success: true }]
            ])
            .put(actions.deleteTaskSuccess(payload.taskId))
            .run();
    });

    it('handles an error case', async () => {
        await expectSaga(deleteTask, { payload })
            .provide([
                [call(api.deleteTask, payload.taskId), { success: false }]
            ])
            .not.put(actions.deleteTaskSuccess(payload.taskId))
            .run();
    });
});
