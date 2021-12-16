function ProfilePageFunc(props: { user: string; }) {
    const showMessage = () => {
        alert('成功关注 ' + props.user);
    };

    const handleClick = () => {
        setTimeout(showMessage, 1000);
    };

    return (
        <button onClick={handleClick}>关注</button>
    );
}

export default ProfilePageFunc;