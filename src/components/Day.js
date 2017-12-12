import React, { Component } from 'react';
import PopoverForCreateEvent from './PopoverForCreateEvent';
import MoreEvents from './MoreEvents';
import './Day.css';
import { connect } from 'react-redux';

class Day extends Component {
    render() {
        let events = this.props.events.filter(event => this.props.stringdate === event.date);
        let getEvents = () => {
            if (events.length === 1) {
                return <div className="events">
                    <PopoverForCreateEvent
                        ispopover={true}
                        isdisable={true}
                        event={events[0]}>
                        <span className="label label-primary event">
                            {events[0].eventName}
                        </span>
                    </PopoverForCreateEvent>
                </div>
            } else if (events.length > 1) {
                return <div className="events">
                    <PopoverForCreateEvent
                        ispopover={true}
                        isdisable={true}
                        event={events[0]}>
                        <span className="label label-primary event">
                            {events[0].eventName}
                        </span>
                    </PopoverForCreateEvent>
                    <MoreEvents events={events} />
                </div>
            }
        };

        return (
            <div className={this.props.classname}>
                {events.length}
                <div className="header">
                    {this.props.stringforday}
                </div>
                {getEvents()}
                <PopoverForCreateEvent stringdate={this.props.stringdate} daykey={this.props.daykey} />
            </div>
        );
    }
}


const mapEventToProps = function(store) {
    return {
        events: store.events
    };
};

export default connect(mapEventToProps)(Day);
