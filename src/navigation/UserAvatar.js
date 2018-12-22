import React from 'react';

const UserAvatar = ({ avatar, username }) => (
    <span>
        <img
        src={avatar || "https://www.redditstatic.com/avatars/avatar_default_19_FFB000.png"} 
        alt={"user-logo"}
        style={{height: 20}} />
        <span style={{ padding: 5 }}>{username}</span>
    </span>
)

export default UserAvatar;