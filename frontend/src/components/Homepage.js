import React from 'react';

export default function HomePage({currentUser}) {

    if (!currentUser.isAuthenticated) {
        return (
            <div>
                <h1>This is the HomePage</h1>
            </div>
        );
    }

    return (
        <div>Hello {currentUser.user.username}</div>
    );
}