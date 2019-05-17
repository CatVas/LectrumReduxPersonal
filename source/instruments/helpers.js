
import { List } from 'immutable';

const compareTasksByFavorite = (task1, task2) => {
    const favorite1 = task1.get('favorite');
    const favorite2 = task2.get('favorite');

    if (favorite1 && !favorite2) {
        return -1;
    }
    if (favorite2 && !favorite1) {
        return 1;
    }

    return 0;
};

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const sortImmutableTasks = (tasks = List()) => {
    const completed = tasks.filter((task) => task.get('completed'));
    const incompleted = tasks.filter((task) => !task.get('completed'));

    return incompleted.sort(compareTasksByFavorite)
        .concat(
            completed.sort(compareTasksByFavorite)
        );
};
