import React, { Component } from 'react';
import Popover from 'react-popover';
import * as moment from 'moment';
import './PopoverForCreateEvent.css';
import store from '../store';
import { addEvent, deleteEvent } from '../actions/';

class PopoverForCreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            eventName: '',
            assigns: '',
            description: ''
        };
    }

    togglePopover (toState) {
        const popoverIsOpen = typeof toState === "boolean"
            ? toState
            : !this.state.open;
        this.setState({
            open: popoverIsOpen
        })
    }

    handleClose() {
        this.setState({
            open: false,
            eventName: '',
            assigns: '',
            description: ''
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    deleteEvent() {
        store.dispatch(deleteEvent([this.props.event]));
    }

    handleSubmit(e) {
        let event = {
            id: new Date().getTime(),
            eventName: this.state.eventName,
            date: this.props.stringdate,
            assigns: this.state.assigns,
            description: this.state.description
        };
        store.dispatch(addEvent([event]));
        this.handleClose(false);
        e.preventDefault();
    }

    render() {
        const targetToggleProps = {
            className: !this.props.isdisable ? 'Target-Toggle btn btn-default btn-sm' : '',
            onClick: (e) => this.togglePopover(e)
        };

        const popoverProps = {
            isOpen: this.state.open,
            preferPlace: 'right',
            onOuterAction: () => this.handleClose(false),
            body: [
                this.props.isdisable ?
                    <div className="createEvent">
                        <input disabled value={this.props.event.eventName} name="eventName"  className="form-control" type="text" placeholder="Событие"/>
                        <input disabled value={moment(this.props.event.date, 'YYYYMMDD').format('DD/MM/YYYY')} name="date" className="form-control" type="text"/>
                        <input disabled value={this.props.event.assigns} name="assigns" className="form-control" type="text" placeholder="Имена учасников"/>
                        <textarea disabled value={this.props.event.description} name="description" className="form-control" cols="30" rows="5" placeholder="Описание"/>
                        <div className="buttons">
                            <button onClick={() => this.props.gotolist ? this.props.gotolist() : this.handleClose(false)}>Готово</button>
                            <button onClick={this.deleteEvent.bind(this)}>Удалить</button>
                        </div>
                    </div>
                    :
                <form action="" className="createEvent" onSubmit={this.handleSubmit.bind(this)}>
                    <input value={this.state.eventName} name="eventName" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" placeholder="Событие"/>
                    <input value={moment(this.props.stringdate, 'YYYYMMDD').format('DD/MM/YYYY')} name="date" className="form-control" disabled type="text"/>
                    <input value={this.state.assigns} name="assigns" onChange={this.handleInputChange.bind(this)} className="form-control" type="text" placeholder="Имена учасников"/>
                    <textarea value={this.state.description} name="description" onChange={this.handleInputChange.bind(this)} className="form-control" cols="30" rows="5" placeholder="Описание"/>
                    <div className="buttons">
                        <button>Готово</button>
                    </div>
                </form>
            ]
        };

        return (
            this.props.ispopover ?
                <Popover {...popoverProps}>
                    {this.props.children ?
                    <span {...targetToggleProps}>
                        {this.props.children}
                    </span>
                    :
                    <button {...targetToggleProps}>
                        <span className="glyphicon glyphicon-plus"/>
                    </button>}
                </Popover>
                :
                <div className="createEvent">
                    <input disabled value={this.props.event.eventName} name="eventName"  className="form-control" type="text" placeholder="Событие"/>
                    <input disabled value={moment(this.props.event.date, 'YYYYMMDD').format('DD/MM/YYYY')} name="date" className="form-control" type="text"/>
                    <input disabled value={this.props.event.assigns} name="assigns" className="form-control" type="text" placeholder="Имена учасников"/>
                    <textarea disabled value={this.props.event.description} name="description" className="form-control" cols="30" rows="5" placeholder="Описание"/>
                    <div className="buttons">
                        <button onClick={() => this.props.gotolist()}>Готово</button>
                        <button onClick={() => {this.props.gotolist();this.deleteEvent()}}>Удалить</button>
                    </div>
                </div>

        );
    }
}

PopoverForCreateEvent.defaultProps = {
    ispopover: true,
    isdisable: false,
    event: {},
};

export default PopoverForCreateEvent;
