import React from 'react';
import { OAUTH_PATH } from '../config/reddit-app';
import { NavItem } from 'react-bootstrap';

const UserLogIn = props => (
    <NavItem eventKey={1} href={OAUTH_PATH}>
        Log In
    </NavItem>
)

export default UserLogIn;