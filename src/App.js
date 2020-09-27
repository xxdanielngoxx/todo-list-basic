import './App.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import { Header } from './components/Header';

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      tasks: [
       
      ],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sort: {
        by: "name",
        value: 1,
      }
    }
  }

  componentDidMount = () => {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        ...this.state,
        tasks: tasks,
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateId() {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + "-"
      + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if (!this.state.isDisplayForm) {
      this.setState({
        isDisplayForm: true,
      });
    } else {
      this.setState({
        taskEditing: null,
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null,
    });
  }

  onTaskFormSubmit = (data) => {

    const { tasks } = this.state;

    const task = {
      id: data.id === "" ? this.generateId() : data.id,
      name: data.name,
      status: data.status,
    }

    if (data.id === "") {
      tasks.push(task);
    } else {
      const index = this.findIndexById(task.id);
      tasks[index] = task;
    }
    this.setState({
      tasks: tasks,
    }, () => { 
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  }

  onChangeStatus = (taskId) => {
    const { tasks } = this.state;
    const index = this.findIndexById(taskId);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      }, () => { localStorage.setItem("tasks", JSON.stringify(tasks)) });
    }
  }

  findIndexById = (id) => {
    let result = -1;
    this.state.tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDelete = (taskId) => {
    const { tasks } = this.state;
    const index = this.findIndexById(taskId);

    if ( index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      }, () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.onCloseForm();
      });
    }
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    })
  }

  onUpdate = (taskId) => {
    const index = this.findIndexById(taskId);
    this.setState({
      taskEditing: this.state.tasks[index],
    }, () => { this.onShowForm(); });

  }

  onFilter = (data) => {
    this.setState({
      filter: data,
    })
  }

  doFilter = (tasks = []) => {
    return tasks.filter((task) => {
      return (this.state.filter.name === "") ? true : task.name.toLowerCase().indexOf(this.state.filter.name) !== -1;
    }).filter((task) => {
      if (this.state.filter.status === -1) return true;
      return task.status === (this.state.filter.status === 1);
    }).filter((task) => {
      return (this.state.keyword === "") ? true : task.name.toLowerCase().indexOf(this.state.keyword) !== -1;
    }).sort(
      (taskA, taskB) => {
        if (this.state.sort.by === "name") {
          if(taskA.name > taskB.name) return this.state.sort.value;
          else if (taskA.name < taskB.name) return -this.state.sort.value;
          else return 0;
        } else if (this.state.sort.by === "status") {
          if(taskA.status > taskB.status) return -this.state.sort.value;
          else if(taskA.status < taskB.status) return this.state.sort.value;
          else return 0;
        }
        return 0;
      } 
    );
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    })
  }

  onSort = (data) => {
    const { sort } = data;
    this.setState({
      sort: {
        by: sort.by,
        value: Number(sort.value),
      }
    });
  }

  render() {

    const { tasks, isDisplayForm, taskEditing } = this.state;

    const filterTasks = this.doFilter(tasks);

    const elmTaskForm = isDisplayForm === true ? 
      <TaskForm 
        onSubmit={this.onTaskFormSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      /> : null;

    return (
      <div className="container">
        <Header/>
        <div className="row">
          { elmTaskForm }
          <div className={isDisplayForm ? "col-8 col-xs-8 p-3" : "col-12 col-xs-12 p-3"}>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <FontAwesomeIcon icon={faPlus}/> Add Task
            </button>
            <TaskControl 
              onSearch={this.onSearch} 
              onSort={this.onSort}  
            />
            <div className="row mt-2">
              <TaskList 
                tasks={filterTasks} 
                onChangeStatus={this.onChangeStatus}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                onFilter={this.onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}