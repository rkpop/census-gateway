import React from 'react';
import { push } from 'redux-little-router';
import { connect } from 'react-redux'
import queryString from 'querystring';
import { SET_USER_AUTHENTICATION, SET_USER_ELIGIBLE, FETCH_USER_AUTHENTICATION } from '../modules/user/types';

//////// APIS
// Get user's identity


const fetchUserInfo = async (accessToken) => {
    const options = {
        method: "GET",
        headers: { "Authorization": "bearer " + accessToken },
    }

    const response = await fetch('https://oauth.reddit.com/api/v1/me', options);
    const user = await response.json();
    return user;
}
export class ValidateEligibilityPage extends React.Component {
    componentDidMount() {
        // if error in hash http://localhost:3000/sign-in#state=10128be7-f178-4af2-a104-411215c24044&error=access_denied
        // then redirect to public page
        // if authenticated (e.g. token in hash) then direct to private route
        const parsedToken = queryString.parse(this.props.hash.split("#")[1]);
        if ("access_token" in parsedToken) {
            this.props.loginSuccessfull(parsedToken);
            const accessToken = parsedToken.access_token;
            fetchUserInfo(accessToken).then(user => {
                this.props.setUser(user, accessToken);
                this.props.verifyEligibility(user);
            })
        }
        else {
            this.props.loginUnsuccessfull();
        }

    }
    render() {
        return <div />
    }
}
const mapStateToProps = (state) => ({
    hash: state.router.hash,
    isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
    loginSuccessfull: (token) => {
        dispatch({ type: FETCH_USER_AUTHENTICATION, token });
    },
    setUser: (user, token) => {
        const userInfoPayload = {
            username: user.name, 
            created_utc: user.created_utc, 
            avatar: user.icon_img, 
            token, 
            token_expired_utc: Date.now() + 3600*1000
        }
        localStorage.setItem('rkpopcensus-authentication', JSON.stringify(userInfoPayload));

        dispatch({ type: SET_USER_AUTHENTICATION, payload: userInfoPayload })
    },
    verifyEligibility: (user) => {
        const eligible = user.created_utc < 1533078000*1000; 
        if (eligible) {
            dispatch({ type: SET_USER_ELIGIBLE });
            dispatch(push('/poll'));
        }
        else {
            dispatch(push('/not-eligible'));
        }
    },
    loginUnsuccessfull: () => dispatch({ type: "UNELIGIBLE" })
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ValidateEligibilityPage)
