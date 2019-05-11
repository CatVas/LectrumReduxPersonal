
import { MAIN_URL, TOKEN } from './config';

const api = {
    fetchTasks: async () => {
        try {
            const answer = await fetch(MAIN_URL, {
                headers: {
                    Authorization: TOKEN,
                },
                method: 'GET',
            });
            const { data, message } = await answer.json();

            if (answer.status !== 200) {
                throw new Error(message);
            }

            return { tasks: data };
        } catch (error) {
            const { message } = error;

            return { error: message };
        }
    }
};

export { api };
