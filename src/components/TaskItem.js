import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class TaskItem extends Component {
    
    constructor(props) {
        super();
    }

    onChangeStatus = () => {
        this.props.onChangeStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {

        const { index, task } = this.props;

        return (
            <tr>
                <td className="text-center">{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        onClick={this.onChangeStatus}
                        className={task.status === true ? "badge badge-success" : "badge badge-danger"}>
                        {task.status === true ? "Active" : "Hide"}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning mr-2"
                        onClick={this.onUpdate}
                    >
                        <FontAwesomeIcon icon={faPencilAlt} /> Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </td>
            </tr>
        )
    }
}
