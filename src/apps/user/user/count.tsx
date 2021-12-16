import { connect } from 'dva';

export const Apps = connect(({ counter }) => ({ counter }))((props: any) => {
    const { counter: state } = props;
    console.log(props, state)
    return (
        <div>
            <h2>{state.sum}</h2>
            <button key="add" onClick={() => { props.dispatch({ type: 'counter/add' }) }}>+</button>
            <button key="minus" onClick={() => { props.dispatch({ type: 'counter/minus' }) }}>-</button>
        </div>
    );
})