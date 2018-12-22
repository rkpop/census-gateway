import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import logo from '../assets/rkpopredditlogo.png';
import { connect } from 'react-redux'
import { Link, push } from 'redux-little-router';
import { LOG_OUT } from '../modules/user/types';
import UserLogIn from './UserLogInButton';
import AuthenticatedUserActions from './AuthenticatedUserActions';

const NavigationBar = (props) => {
    return (
        <Navbar inverse collapseOnSelect style={{ borderRadius: 0 }}>
            <Navbar.Header>
                <Navbar.Brand >
                    <a href="https://www.reddit.com/r/kpop/" style={{ padding: "5px 5px" }}><img src={logo} alt="logo" style={{ height: "100%" }} /></a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
                <NavItem href={"/poll"}>
                    Poll
                    {/* <Link href="/poll" style={{ padding: "5px 5px" }}>Poll</Link> */}
                </NavItem>
            </Nav>

            <Navbar.Collapse>
                <Nav pullRight>
                    {!props.isAuthenticated ?
                        <UserLogIn /> :
                        <AuthenticatedUserActions
                            username={props.username}
                            avatar={props.avatar}
                            onLogout={props.logout} />
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.username,
    avatar: state.user.avatar,
})

const mapDispatchToProps = dispatch => ({
    changePage: (key) => dispatch(push("/" + key)),
    logout: () => {
        localStorage.removeItem('rkpopcensus-authentication');
        dispatch({ type: LOG_OUT });
        dispatch(push("/"));
    }

})

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar))

