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
export default notificationSlice.reducer