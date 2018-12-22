import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Fragment } from 'redux-little-router';
import NavigationBar from './navigation';
import ValidateEligibilityPage from './validate-eligibility';
import { OAUTH_PATH } from './config/reddit-app';
import { SET_USER_AUTHENTICATION, SET_USER_ELIGIBLE, FETCH_USER_AUTHENTICATION } from './modules/user/types';
import { push } from 'redux-little-router';

export const Message = ({ children }) => {
    return (
        <div className={"content message"}>
            {children}
        </div>
    )
}
export const PleaseLogInMessage = props => {
    return (
        <Message>
            <h2>Please <a href={OAUTH_PATH}>log in</a> to fill out r/kpop 2018 census poll</h2>
        </Message>)
}
export const NotEligibleMessage = props => {
    return (
        <Message>
            <h2>Unfortunately, your account does not meet eligibility to fill out this year's census</h2>
        </Message>)
}

export const VotingPage = ({ eligible, username }) => {
    // if (!eligible){
    //     return <NotEligibleMessage/>
    // }
    return (
        <iframe
            title={"r/kpop 2018 poll"}
            src={`https://docs.google.com/forms/d/e/1FAIpQLScLH3gg6bpk_-gktBFiIWlzs3Lcpk1-rVqNVamMEWgeN7ldmw/viewform?usp=pp_url&entry.1496652089=${username}`}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
        >
            <h2>Loading...</h2></iframe>
    )
}

const APP_KEY = "rkpopcensus-authentication";
class App extends React.Component {

    componentDidMount() {
        if (localStorage.getItem(APP_KEY) !== null) {
            const userInfoPayload = JSON.parse(localStorage.getItem(APP_KEY));
            if (Date.now() < userInfoPayload.token_expired_utc) {
                this.props.loginSuccessfull(userInfoPayload.token);
                this.props.setUser(userInfoPayload);
                this.props.verifyEligibility(userInfoPayload);
            }
        }

    }
    render() {
        const props = this.props;
        return (
            <React.Fragment>
                <NavigationBar />
                <div className="content">
                    {!props.isAuthenticated && <PleaseLogInMessage />}

                    <Fragment forRoute="/sign-in">
                        <ValidateEligibilityPage />
                    </Fragment>

                    <Fragment forRoute="/not-eligible">
                        <NotEligibleMessage />
                    </Fragment>

                    {props.isEligible &&
                        <Fragment forRoute="/poll" withConditions={() => this.props.isEligible}>
                            <VotingPage username={props.username} eligible={this.props.eligible} />
                        </Fragment>
                    }

                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isEligible: state.user.isEligible,
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.username,
})

const mapDispatchToProps = dispatch => ({
    loginSuccessfull: (token) => {
        dispatch({ type: FETCH_USER_AUTHENTICATION, token });
    },
    setUser: (userInfoPayload) => {
        dispatch({ type: SET_USER_AUTHENTICATION, payload: userInfoPayload })
    },
    verifyEligibility: (user) => {
        // post goes up 7/31/2018 11 pm ET so 
        // users are required to sign up before then 
        // set to 07/31/2018 @ 11:00pm (UTC)
        const eligible = user.created_utc < 1533078000*1000; 

        if (eligible) {
            dispatch({ type: SET_USER_ELIGIBLE });
            dispatch(push('/poll'));
        }
        else {
            dispatch(push('/not-eligible'));
        }
    },
})

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(App))

