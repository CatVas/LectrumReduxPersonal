// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import { mapState } from './lib';

// Instruments
import Styles from './styles.m.css';
// import { tasks } from './tasks'; TODO: remove later.

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Checkbox from '../../theme/assets/Checkbox';

const {
    fetchTasks,
} = actions;

@connect(mapState, {
    fetchTasks,
})
class Scheduler extends Component {
    componentDidMount() {
        const { fetchTasks: fetchTasksAC } = this.props;

        fetchTasksAC();
    }

    render () {
        const {
            loading,
            tasks,
        } = this.props;
        const todoList = tasks.map((task) => (
            <Task
                completed = { task.completed }
                favorite = { task.favorite }
                id = { task.id }
                key = { task.id }
                message = { task.message }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button type="submit">Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
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
