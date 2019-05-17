
import { MAIN_URL, TOKEN } from './config';

const api = {
    createTask: async (task) => {
        try {
            const answer = await fetch(MAIN_URL, {
                body:    JSON.stringify({ message: task }),
                headers: {
                    Authorization:  TOKEN,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const { data, message } = await answer.json();

            if (answer.status !== 200) {
                throw new Error(message);
            }

            return { task: data };
        } catch (error) {
            const { message } = error;

            return { error: message };
        }
    },

    deleteTask: async (taskId) => {
        try {
            const answer = await fetch(`${MAIN_URL}/${taskId}`, {
                headers: {
                    Authorization: TOKEN,
                },
                method: 'DELETE',
            });

            if (answer.status !== 204) {
                const { message } = await answer.json();

                throw new Error(message);
            }

            return { success: true };
        } catch (error) {
            const { message } = error;

            return { error: message };
        }
    },

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
    },

    updateTasks: async (tasks = []) => {
        try {
            const answer = await fetch(MAIN_URL, {
                body:    JSON.stringify(tasks),
                headers: {
                    Authorization:  TOKEN,
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
            });
            const { data, message } = await answer.json();

            if (answer.status !== 200) {
                throw new Error(message);
            }

            return { updatedTasks: data };
        } catch (error) {
            const { message } = error;

            return { error: message };
        }
    },
};

export { api };
