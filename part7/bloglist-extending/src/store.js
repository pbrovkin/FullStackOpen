import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store