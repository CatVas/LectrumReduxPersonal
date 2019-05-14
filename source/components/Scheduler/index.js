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
    taskInputChange,
    toggleTaskEdit,
    updateTask,
} = actions;

@connect(mapState, {
    changeTaskMessage,
    clearTaskEdit,
    createTask,
    deleteTask,
    fetchTasks,
    taskInputChange,
    toggleTaskEdit,
    updateTask,
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

    handleKeyDown = (ev) => {
        const {
            clearTaskEdit: clearTaskEditAC,
            taskEdited,
        } = this.props;

        if ((taskEdited.id || taskEdited.message) && ev.key === 'Escape') {
            clearTaskEditAC();
        }
    };

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

    handleTaskUpdate = (task) => {
        const { updateTask: updateTaskAC } = this.props;

        updateTaskAC(task);
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
            taskInput,
            taskEdited,
            tasks,
        } = this.props;
        const todoList = tasks.map((task) => {
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
                    onUpdate = { this.handleTaskUpdate }
                    { ...taskProps }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
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
                            checked
                            color1 = '#363636'
                            color2 = '#fff'
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
