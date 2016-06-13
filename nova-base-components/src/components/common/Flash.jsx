import React, { PropTypes, Component } from 'react'
import { Alert } from 'react-bootstrap'

// import { Messages } from 'nova-core'
// FIXME: Messages.markAsSeen(this.props.message._id)
// FIXME: Messages.clear(this.props.message._id)

class Flash extends Component {
  constructor() {
    super()
    this.dismissFlash = this.dismissFlash.bind(this)
  }

  componentDidMount() {
    this._dispatch(this.props.seenCallback)
  }

  _dispatch(callback) {
    if (callback) {
      callback(this.props.message._id)
    }
  }

  dismissFlash(e) {
    e.preventDefault()
    this._dispatch(this.props.dismissCallback)
  }

  render() {
    let type = this.props.message.type
    type = type === 'error' ? 'danger' : type // if type is "error", use "danger" instead

    return (
      <Alert className='flash-message' bsStyle={type} onDismiss={this.dismissFlash}>
        {this.props.message.content}
      </Alert>
    )
  }
}

Flash.propTypes = {
  message: PropTypes.object.isRequired,
  dismissCallback: PropTypes.func,
  seenCallback: PropTypes.func,
}

module.exports = Flash
