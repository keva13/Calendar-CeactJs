import React, { Component } from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            popupVisible: false,
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
    }

    render() {
        let result = this.props.events.filter(event => {
            if (event.eventName.indexOf(this.state.findText) !== -1 || event.assigns.indexOf(this.state.findText) !== -1) {
                return true
            }
        });
        let renderResult = (result) => {
            return result.map(item => {
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
                {result.length && this.state.popupVisible ?
                    <div className="custom_popover">
                        <div className="result">
                            {renderResult(result)}
                        </div>
                    </div>
                    : []
                }
            </div>
        );
    }
}


const mapEventToProps = function(store) {
    return {
        events: store.events
    };
};

export default connect(mapEventToProps)(Search);
