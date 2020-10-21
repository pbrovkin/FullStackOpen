import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loggedUserReducer from './reducers/loggedUsedReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  user: loggedUserReducer,
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store