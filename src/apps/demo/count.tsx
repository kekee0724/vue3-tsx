import React, { useState as useStates } from 'react';

import { connect } from 'dva';
import { render } from 'react-dom';

function mapStateToProps(state: { counter: { sum: number; dispatch: Function }; }) {
    const { sum, dispatch } = state.counter;
    return {
        sum, dispatch
    };
}

// export const Apps = connect(({ counter }) => ({ counter }))((props: any) => {
//     const { counter: state } = props;
//     console.log(props, state)
export const App = connect(mapStateToProps)(({ sum, dispatch }: { sum: number; dispatch: Function }) => {
    // const { sum } = props;
    return (
        <div>
            {/* <h2>{state.sum}</h2> */}
            <h2>{sum}</h2>
            <button key="add" onClick={() => { dispatch({ type: 'counter/add' }) }}>+</button>
            <button key="minus" onClick={() => { dispatch({ type: 'counter/minus' }) }}>-</button>
        </div>
    );
})

let _state: any
function useState<T>(initialValue: any) {
    _state = _state || initialValue
    function dispatch(newState: T) {
        _state = newState
        render(<Apps />, document.getElementById('root'))
    }
    return [_state, dispatch]
}

export const Apps: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const [name, setName] = useState<string>('airing')
    const [age, setAge] = useState<number>(18)

    return (
        <>
            <p>{name} clicked {count} times</p>
            <p>{name} age: {age}</p>
            <button onClick={() => {
                setCount(count + 1)
                setAge(age + 1)
            }}>
                Click me
            </button>
        </>
    )
}
  // 如果用过 redux 的话，这一幕一定非常眼熟。给定一个初始 state，然后通过 dispatch 一个 action，
  // 再经由 reducer 改变 state，再返回新的 state，触发组件重新渲染。