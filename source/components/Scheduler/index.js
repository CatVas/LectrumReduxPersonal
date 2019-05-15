// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import { mapState } from './lib';

// Instruments
import Styles from './styles.m.css';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Checkbox from '../../theme/assets/Checkbox';

const {
    changeTaskMessage,
    clearTaskEdit,
    createTask,
    deleteTask,
    fetchTasks,
    searchTasks,
    taskInputChange,
    toggleTaskEdit,
    updateTasks,
} = actions;

@connect(mapState, {
    changeTaskMessage,
    clearTaskEdit,
    createTask,
    deleteTask,
    fetchTasks,
    searchTasks,
    taskInputChange,
    toggleTaskEdit,
    updateTasks,
})
class Scheduler extends Component {
    componentDidMount() {
        const { fetchTasks: fetchTasksAC } = this.props;

        fetchTasksAC();
        document.body.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }

    handleAllCompleted = () => {
        const { tasks } = this.props;
        const tasksToComplete = tasks
            .filter(task => !task.completed)
            .map(task => ({ ...task, completed: true }));

        if (tasksToComplete.length > 0) {
            this.handleTasksUpdate({ tasks: tasksToComplete });
        }
    }

    handleKeyDown = (ev) => {
        const {
            clearTaskEdit: clearTaskEditAC,
            taskEdited,
        } = this.props;

        if ((taskEdited.id || taskEdited.message) && ev.key === 'Escape') {
            clearTaskEditAC();
        }
    };

    handleSearch = (ev) => {
        const { searchTasks: searchTasksAC } = this.props;

        searchTasksAC(ev.target.value);
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

        const {
            createTask: createTaskAC,
            taskInput: { value },
        } = this.props;

        if (value) {
            createTaskAC(value);
        }
    }

    handleTaskDelete = (taskId) => {
        const { deleteTask: deleteTaskAC } = this.props;

        deleteTaskAC(taskId);
    };

    handleTasksUpdate = (data) => {
        const { updateTasks: updateTasksAC } = this.props;

        updateTasksAC(data);
    };

    handleTaskInputChange = (ev) => {
        const { taskInputChange: taskInputChangeAC } = this.props;

        taskInputChangeAC(ev.target.value.slice(0, 50));
    }

    handleToggleTaskEdit = (data) => {
        const { toggleTaskEdit: toggleTaskEditAC } = this.props;

        toggleTaskEditAC(data);
    }

    render () {
        const {
            changeTaskMessage: changeTaskMessageAC,
            loading,
            searchBy,
            taskInput,
            taskEdited,
            tasks,
        } = this.props;
        const allCompleted = tasks.filter(task => !task.completed).length === 0;
        const todoList = tasks
            .filter((task) => {
                const messageLower = task.message.toLowerCase();
                const searchLower = searchBy.toLowerCase();

                return messageLower.indexOf(searchLower) > -1;
            })
            .map((task) => {
                const {
                    message,
                    ...taskProps
                } = task;
                const editing = task.id === taskEdited.id;
                const taskMessage = editing ? taskEdited.message : message;

                return (
                    <Task
                        completed = { task.completed }
                        editing = { editing }
                        favorite = { task.favorite }
                        id = { task.id }
                        key = { task.id }
                        message = { taskMessage }
                        onChangeMessage = { changeTaskMessageAC }
                        onDelete = { this.handleTaskDelete }
                        onToggleEdit = { this.handleToggleTaskEdit }
                        onUpdate = { this.handleTasksUpdate }
                        { ...taskProps }
                    />
                );
            });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            onChange = { this.handleSearch }
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { searchBy }
                        />
                    </header>
                    <section>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                onChange = { this.handleTaskInputChange }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { taskInput.value }
                            />
                            <button type="submit">Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.handleAllCompleted }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
                <Spinner isSpinning = { loading } />
            </section>
        );
    }
}

export default Scheduler;
export { default as reducer } from './reducer';
export { default as sagas } from './sagas';
