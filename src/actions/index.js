import * as types from './action-tupes';

export function addEvent(event) {
    return {
        type: types.EVENT_CREATE,
        event
    };
}

export function deleteEvent(event) {
    return {
        type: types.EVENT_DELETE,
        event
    };
}