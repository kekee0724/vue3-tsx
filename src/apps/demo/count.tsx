import React, {
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { render } from 'react-dom';

import { connect } from 'dva';

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

// let memoizedState: any[] = [] // hooks 的值存放在这个数组里
// let cursor = 0 // 当前 memoizedState 的索引

// function useState<T>(initialValue: (() => T) | T) {
//     memoizedState[cursor] = memoizedState[cursor] || initialValue
//     const currentCursor = cursor
//     function setState(newState: T) {
//         memoizedState[currentCursor] = newState
//         cursor = 0
//         render(<Apps />, document.getElementById('root'))
//     }
//     return [memoizedState[cursor++], setState] // 返回当前 state，并把 cursor 加 1
// }

export const myReducer = (state: any, action: any) => {
    switch (action.type) {
        case ('countUp'):
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state
    }
}


export function AppsA() {
    // componentDidMount触发
    useEffect(() => {
        console.log("生命周期 componentDidMount触发")
    }, []);
    //componentDidUnmount触发
    useEffect(() => {
        return () => {
            console.log("生命周期 componentDidUnmount触发")
        }
    }, []);
    // componentUpdate触发
    const mounted = useRef<Boolean>();
    useEffect(() => {
        if (!mounted.current) {
            // componentDidMount
            console.log("生命周期 componentDidMount触发")
            mounted.current = true
        } else {
            //componnentDidUpdate
            console.log("生命周期 componnentDidUpdate触发")
        }
    });
    const [state, dispatch] = useReducer(myReducer, { count: 0 })
    const [count, setCount] = useState(99);
    const [name, setName] = useState("祝阳");
    return (
        <div className="App">
            <p>姓名:{name}   年纪:{count}</p>
            <button onClick={() => setCount(count + 1)}>click 年纪+1</button>
            <button onClick={() => dispatch({ type: 'countUp' })}>
                click Count+1
            </button>
            <p>Count: {state.count}</p>
        </div>
    );
}

export const AppsC: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const [name, setName] = useState<string>('airing')
    const [age, setAge] = useState<number>(18)
    // console.log(memoizedState)
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