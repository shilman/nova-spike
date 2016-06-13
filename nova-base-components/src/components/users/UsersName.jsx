import React, { PropTypes, Component } from 'react'
import Users from 'nova-users'

const UsersName = ({ user }) => <a className='users-name' href={Users.getProfileUrl(user)}>{Users.getDisplayName(user)}</a>

UsersName.propTypes = {
  user: React.PropTypes.object.isRequired,
}

UsersName.displayName = 'UsersName'

module.exports = UsersName
export default UsersName
