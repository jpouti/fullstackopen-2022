import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [null],
    reducers: {
        createNotification(state, action) {
            const notification = action.payload
            state.push(notification)
            state.shift() // deletes the previous element to display the new notification
        },
        hideNotification(state, action) {
            const hide = null
            state.push(hide)
            state.shift() // deletes the notification message and applies null to hide notifications
        }
    }
})

export const { createNotification, hideNotification } = notificationSlice.actions

let timeoutId = null
export const setNotification = (content, time) => {
    return async dispatch => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)   
        }
        dispatch(createNotification(content))
        timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}
export default notificationSlice.reducer