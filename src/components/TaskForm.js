import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class TaskForm extends Component {

  constructor(props) {
    super();
    this.state = {
      id: "",
      name: "",
      status: false,
    }
  }

  static getDerivedStateFromProps = (props, state) => {

    if (props && props.task) {
      return {
        id: props.task.id,
        name: props.task.name,
        status: props.task.status,
      }
    } else if (state.id !== "" && !props.task) {
      return {
        id: "",
        name: "",
        status: false,
      };
    }
    return {};
  }

  onChange = (event) => {

    const value = event.target.name === "status" ? (event.target.value === "true" ? true : false ) 
    : event.target.value;

    this.setState({
      [event.target.name]: value,
    });

  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.onClear();
    this.onClose();
  }

  onClose = () => {
    this.props.onCloseForm();
  }

  onClear = () => {
    this.setState({
      ...this.state,
      name: "",
      status:  false,
    });
  }

  render() {

    return (
      <div className="col-xs-4 p-3">
        <div className="card border border-warning">
          <div className="card-header bg-warning">
            <div className="row">
              <div className="col-10">
                <h5>{ this.state.id !== "" ? "Update Task" : "Add Task" }</h5>
              </div>
              <div className="col-2 text-end">
                <span>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={ this.onClose }
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Name</label>
                <div className="col-sm-12">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Status</label>
                <div className="col-sm-12">
                  <select 
                    className="form-control"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Hide</option>
                  </select>
                </div>
              </div>
              <div className="form-group row justify-content-center">
                <div className="col-xs-12">
                  <button 
                    type="submit" 
                    className="btn btn-success mr-2"
                  >
                    <FontAwesomeIcon icon={faPlus} /> { this.state.id === ""  ? "ADD" : "Save"}
                      </button>
                  <button
                    type="button" 
                    className="btn btn-danger"
                    onClick={this.onClear}
                  >
                    <FontAwesomeIcon icon={faTimes} /> Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
