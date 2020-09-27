import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class SearchControl extends Component {

    constructor(props) {
        super();
        this.state = {
            keyword: "",
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value.toLowerCase(),
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        const { keyword } = this.state;
        return (
            <div className="input-group">
                <input
                    name="keyword"
                    value={keyword}
                    onChange={this.onChange}
                    className="form-control"
                    type="text"
                    placeholder="Type something..."
                />
                <span className="input-group-append">
                    <button 
                        onClick={this.onSearch}
                        type="button" 
                        className="btn btn-primary"
                    >
                        <FontAwesomeIcon icon={faSearch} /> Search
                    </button>
                </span>
            </div>
        )
    }
}
