import React, { Component } from 'react';
import * as moment from 'moment';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            popupVisible: false,
            result: [],
            findText: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleClick() {
        document.addEventListener('click', this.handleOutsideClick, false);

        this.setState(prevState => ({
            popupVisible: true,
        }));
    }

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setState(prevState => ({
            popupVisible: false,
        }));
    }

    find(e) {
        let value = e.target.value;

        this.setState({
            findText: value
        });
        let allEvents = JSON.parse(localStorage.getItem('events') || '[]');
        let result = allEvents.filter(event => {
            if (event.eventName.indexOf(value) !== -1 || event.assigns.indexOf(value) !== -1) {
                return true
            }
        });

        this.setState({
            result: result
        });
    }

    render() {
        console.log(this);
        let renderResult = () => {
            return this.state.result.map(item => {
                return <div key={item.id} className="item">
                    <div className="eventName">
                        {item.eventName}
                    </div>
                    <div className="eventDate">
                        {moment(item.date, 'YYYYMMDD').format('ll')}
                    </div>
                </div>
            })
        };

        return (
            <div className="search" onClick={this.handleClick} ref={node => { this.node = node; }}>
                <div className="icon">
                    <span className="glyphicon glyphicon-search" placeholder="Собітие дата или учасник"/>
                </div>
                <input className="form-control" onChange={this.find.bind(this)} type="text"/>
                {this.state.result.length && this.state.popupVisible ?
                    <div className="custom_popover">
                        <div className="result">
                            {renderResult()}
                        </div>
                    </div>
                    : []
                }
            </div>
        );
    }
}

export default Search;
