import React, { Component } from 'react';
import PopoverForCreateEvent from './PopoverForCreateEvent';
import MoreEvents from './MoreEvents';
import './Day.css';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };

    }

    componentDidMount() {
        this.getEvents()
    }

    getEvents() {
        let allEvents = JSON.parse(localStorage.getItem('events') || '[]');
        let eventForThisDay = allEvents.filter(event => this.props.stringdate === event.date);
        this.setState(prevState => ({
            events: eventForThisDay
        }));
    }

    addEvent(e) {
        let events = this.state.events;
        events.push(e);
        this.setState(prevState => ({
            events: events
        }));

    }

    deleteEvent(e) {
        let allEvents = JSON.parse(localStorage.getItem('events') || '[]');
        allEvents.splice(allEvents.findIndex(event => event.id === e.id), 1);
        localStorage.setItem('events', JSON.stringify(allEvents));
        let events = this.state.events;
        events.splice(events.findIndex(event => event.id === e.id), 1);
        this.setState(prevState => ({
            events: events
        }));
    }

    render() {
        let getEvents = () => {
            if (this.state.events.length === 1) {
                return <div className="events">
                    <PopoverForCreateEvent
                        ispopover={true}
                        isdisable={true}
                        event={this.state.events[0]}
                        // gotolist={this.goToList.bind(this)}
                        deleteevent={this.deleteEvent.bind(this)}>
                        <span className="label label-primary event">
                            {this.state.events[0].eventName}
                        </span>
                    </PopoverForCreateEvent>
                </div>
            } else if (this.state.events.length > 1) {
                return <div className="events">
                    <PopoverForCreateEvent
                        ispopover={true}
                        isdisable={true}
                        event={this.state.events[0]}
                        // gotolist={this.goToList.bind(this)}
                        deleteevent={this.deleteEvent.bind(this)}>
                        <span className="label label-primary event">
                            {this.state.events[0].eventName}
                        </span>
                    </PopoverForCreateEvent>
                    <MoreEvents deleteevent={this.deleteEvent.bind(this)} events={this.state.events} />
                </div>
            }
        };

        return (
            <div className={this.props.classname}>
                <div className="header">
                    {this.props.stringforday}
                </div>
                {getEvents()}
                <PopoverForCreateEvent stringdate={this.props.stringdate} addevent={this.addEvent.bind(this)} daykey={this.props.daykey} />
            </div>
        );
    }
}

export default Day;
