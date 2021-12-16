import React, { useEffect } from 'react';

class ProfilePageClass extends React.Component<any, any> {
    showMessage = () => {
        alert('成功关注 ' + this.props.user);
    };

    handleClick = () => {
        setTimeout(this.showMessage, 1000);
    };

    render() {
        return <button onClick={this.handleClick}>关注</button>;
    }
}

export default ProfilePageClass