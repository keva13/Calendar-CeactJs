import React, { Component } from 'react';
import PopoverForCreateEvent from './PopoverForCreateEvent';
import Popover from 'react-popover';
import * as moment from 'moment';
import './MoreEvents.css';

class MoreEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            view: 'list',
            event: {}
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

    handleClose(e) {
        this.setState({
            open: false,
        });
    }

    viewEvent(e) {
        this.setState({
            view: 'event',
            event: e
        });
    }

    goToList() {
        this.setState({
            view: 'list'
        });
    }

    render() {
        let arrayForEvents = [];

        if (this.state.view === 'list') {
            this.props.events.map((event , i) => {
                arrayForEvents.push(<span key={i} onClick={() => this.viewEvent(event)} className="label label-primary event">{event.eventName}</span>)
            });
        } else {
            arrayForEvents =  <PopoverForCreateEvent ispopover={false} isdisable={true} event={this.state.event} gotolist={this.goToList.bind(this)} />
        }


        const targetToggleProps = {
            className: "Target-toggle-more-events btn btn-default btn-sm",
            onClick: (e) => this.togglePopover(e)
        };

        const popoverProps = {
            className: 'popoverForMoreEvents',
            isOpen: this.state.open,
            preferPlace: 'right',
            onOuterAction: () => this.handleClose(false),
            body: arrayForEvents
        };

        return (
            <Popover {...popoverProps}>
                <button {...targetToggleProps}>
                    <span className="glyphicon glyphicon-align-justify">More</span>
                </button>
            </Popover>

        );
    }
}

export default MoreEvents;
