import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import UserAvatar from './UserAvatar';

const AuthenticatedUserActions = ({ username, avatar, onLogout }) => (
    <NavDropdown id={"authenticated-user-dropdown"}
        title={<UserAvatar username={username} avatar={avatar}/>}>
        <MenuItem eventKey={3.1} onClick={onLogout}>Logout</MenuItem>
    </NavDropdown>
)


export default AuthenticatedUserActions;