import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './reducers/groupReducer'

import handlerReducer from './reducers/handlerReducer'
import messageReduce from './reducers/messageReduce'
import socketReducer from './reducers/socketReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    handler: handlerReducer,
    message: messageReduce,
    socket: socketReducer,
    group: groupReducer
  }
})

export default store