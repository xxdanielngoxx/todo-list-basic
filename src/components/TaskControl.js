import React, { Component } from 'react';
import SortControl from './SortControl';
import SearchControl from './SearchControl';

export default class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-3">
              <div className="col-xs-6 ml-3 mr-2">
                <SearchControl onSearch={this.props.onSearch}/>
              </div>
              <div className="col-xs-6">
                <SortControl onSort={this.props.onSort} />
              </div>
            </div>
        )
    }
}
