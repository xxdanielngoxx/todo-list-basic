import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class SortControl extends Component {

    constructor(props) {
        super();
        this.state = {
            sort: {
                by: 'name',
                value: 1,
            }
        }
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue,
            }
        }, () => this.props.onSort(this.state));
    }

    render() {

        const { sort } = this.state;

        return (
            <div className="dropdown show">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="true">
                    Sort
                </button>
                <ul className="dropdown-menu" aria-labelledby="triggerId">
                    <li onClick={() => this.onClick("name", 1)}>
                        <a role="button" className="dropdown-item">
                            <FontAwesomeIcon icon={faSortAlphaDown} /> A-Z
                            {(sort.by === "name" && sort.value === 1) ?
                                <Fragment>
                                    <span className="ml-2 mr-2"></span>
                                    <FontAwesomeIcon icon={faCheck} className="text-end" />
                                </Fragment> : ''
                            }

                        </a>
                    </li>
                    <li onClick={() => this.onClick("name", -1)}>
                        <a role="button" className="dropdown-item">
                            <FontAwesomeIcon icon={faSortAlphaUp} /> Z-A
                            {(sort.by === "name" && sort.value === -1) ?
                                <Fragment>
                                    <span className="ml-2 mr-2"></span>
                                    <FontAwesomeIcon icon={faCheck} className="text-end" />
                                </Fragment> : ''
                            }
                        </a>
                    </li>
                    <hr />
                    <li role="seperator" className="divider"></li>
                    <li onClick={() => this.onClick("status", 1)}>
                        <a role="button" className="dropdown-item">
                            <span className="badge badge-success">Status Active</span>
                            {(sort.by === "status" && sort.value === 1) ?
                                <Fragment>
                                    <span className="ml-2 mr-2"></span>
                                    <FontAwesomeIcon icon={faCheck} className="text-end" />
                                </Fragment> : ''
                            }
                        </a>
                    </li>
                    <li onClick={() => this.onClick("status", -1)}>
                        <a role="button" className="dropdown-item">
                            <span className="badge badge-danger">Status Hide</span>
                            {(sort.by === "status" && sort.value === -1) ?
                                <Fragment>
                                    <span className="ml-2 mr-2"></span>
                                    <FontAwesomeIcon icon={faCheck} className="text-end" />
                                </Fragment> : ''
                            }
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
