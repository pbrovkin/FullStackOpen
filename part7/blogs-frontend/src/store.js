import createStore from 'redux'
import notificationReducer from './reducers/notificationReducer'

const reducer = notificationReducer

const store = createStore(reducer)

export default store