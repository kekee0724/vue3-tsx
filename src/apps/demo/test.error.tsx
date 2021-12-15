import React from 'react';

class TestError extends React.Component {
    componentDidCatch(e: { message: any; }) {
        alert(e.message);
    }
    componentDidMount() {
        // throw new Error('a');
    }
    render() {
        return <div>TestError</div>
    }
}

export default TestError