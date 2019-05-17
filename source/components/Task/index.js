// Core
import React, { createRef, PureComponent } from 'react';
import cx from 'classnames';
import { bool, func, string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {
    static defaultTypes = {
        completed:       false,
        created:         '',
        editing:         false,
        favorite:        false,
        id:              '',
        message:         '',
        onChangeMessage: () => void 0,
        onDelete:        () => void 0,
        onToggleEdit:    () => void 0,
        onUpdate:        () => void 0,
    };

    static propTypes = {
        completed:       bool,
        created:         string,
        editing:         bool,
        favorite:        bool,
        id:              string,
        message:         string,
        onChangeMessage: func,
        onDelete:        func,
        onToggleEdit:    func,
        onUpdate:        func,
    };

    componentDidUpdate (prevProps) {
        const { editing: prevEditing } = prevProps;
        const { editing: thisEditing } = this.props;

        if (thisEditing && !prevEditing) {
            this.editingInput.current.focus();
        }
    }

    editingInput = createRef();

    handleChangeMessage = (ev) => {
        const { onChangeMessage } = this.props;

        onChangeMessage(ev.target.value.slice(0, 50));
    };

    handleDelete = () => {
        const { id, onDelete } = this.props;

        onDelete(id);
    };

    handleKeyPress = (ev) => {
        if (ev.nativeEvent.key === 'Enter') {
            const { completed, favorite, id, message, onUpdate } = this.props;

            onUpdate({
                onSuccess: this.toggleEdit,
                tasks:     [
                    {
                        completed,
                        favorite,
                        id,
                        message,
                    }
                ],
            });
        }
    };

    toggleCompleted = () => {
        const { completed, favorite, id, message, onUpdate } = this.props;

        onUpdate({
            tasks: [
                {
                    completed: !completed,
                    favorite,
                    id,
                    message,
                }
            ],
        });
    }

    toggleEdit = () => {
        const { id, message, onToggleEdit } = this.props;

        onToggleEdit({ id, message });
    }

    toggleFavorite = () => {
        const { completed, favorite, id, message, onUpdate } = this.props;

        onUpdate({
            tasks: [
                {
                    completed,
                    favorite: !favorite,
                    id,
                    message,
                }
            ],
        });
    }

    render () {
        const {
            editing,
            favorite,
            message,
            completed,
        } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this.toggleCompleted }
                    />
                    <input
                        disabled = { !editing }
                        maxLength = { 50 }
                        ref = { this.editingInput }
                        type = 'text'
                        value = { message }
                        onChange = { this.handleChangeMessage }
                        onKeyPress = { this.handleKeyPress }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.toggleFavorite }
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.toggleEdit }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.handleDelete }
                    />
                </div>
            </li>
        );
    }
}
