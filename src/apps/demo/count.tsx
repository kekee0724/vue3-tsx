import { connect } from 'dva';

import TestError from './test.error';

export const Apps = connect(({ countNamespace }) => ({ countNamespace }))((props: any) => {
    const { countNamespace: state } = props;
    console.log(props, state)
    return (
        <div>
            <TestError />
            <h2>{state.sum}</h2>
            <button key="add" onClick={() => { props.dispatch({ type: 'countNamespace/add' }) }}>+</button>
            <button key="minus" onClick={() => { props.dispatch({ type: 'countNamespace/minus' }) }}>-</button>
        </div>
    );
})