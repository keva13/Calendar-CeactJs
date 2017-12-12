import * as types from '../actions/action-tupes';

const initialEventState = {
    events: []
}

const eventReducer = function(events = initialEventState, action) {
    let newEvents = {};
    switch(action.type) {
        case types.EVENT_CREATE:
            newEvents = {
                events: events.events.concat(action.event)
            };
            localStorage.setItem('events', JSON.stringify(newEvents.events));

            return newEvents;
            break;
        case types.EVENT_DELETE:
            newEvents = {
                events: events.events.concat([])
            };
            newEvents.events.splice(newEvents.events.findIndex(event => event.id === action.event[0].id), 1);
            localStorage.setItem('events', JSON.stringify(newEvents.events));

            return newEvents;
            break;
    }

    return events;
};

export default eventReducer;