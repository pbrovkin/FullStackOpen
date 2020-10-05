import React from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <>
      {props.notification ?
        <div style={style}>
          {props.notification}
        </div>
        : null}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.content
  }
}

const mapDispatchToProps = {
  removeNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default ConnectedNotification
