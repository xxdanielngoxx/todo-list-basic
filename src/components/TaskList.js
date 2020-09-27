import React, { Component } from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends Component {

  constructor(props) {
    super();
    this.state = {
      filter: {
        name: "",
        status: -1, // all: -1, active: 1, hide: 0
      }
    }
  }

  onChange = (event) => {
    this.setState({
      filter: {
        name: event.target.name === "name" ? event.target.value : this.state.filter.name,
        status: event.target.name === "status" ? Number(event.target.value) : Number(this.state.filter.status),
      }
    }, () => {
      const { filter } = this.state;
      this.props.onFilter({ name: filter.name.toLowerCase(), status: filter.status })
    }
    );
  }

  render() {

    const { tasks } = this.props;
    const { name, status } = this.state.filter;

    const elmTask = tasks.map((task, index) => {
      return <TaskItem
        key={task.id}
        task={task}
        index={index + 1}
        onChangeStatus={this.props.onChangeStatus}
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}
      />
    });

    return (
      <div className="col-12 col-xs-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  name="status"
                  className="form-control"
                  value={status}
                  onChange={this.onChange}
                >
                  <option value={-1}>All</option>
                  <option value={1}>Active</option>
                  <option value={0}>Hide</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTask}
          </tbody>
        </table>
      </div>
    )
  }
}
