import { useReducer } from 'react'

const initialState = {
	counterA: 0,
	counterB: 0,
}

function reducer(state, action) {
	switch (action.type) {
		case 'INCREMENT_A':
			return { ...state, counterA: state.counterA + 1 }
		case 'DECREMENT_A':
			return { ...state, counterA: state.counterA - 1 }
		case 'INCREMENT_B':
			return { ...state, counterB: state.counterB + 1 }
		case 'DECREMENT_B':
			return { ...state, counterB: state.counterB - 1 }
		case 'RESET_ALL':
			return initialState
		default:
			throw new Error(`Unknown action: ${action.type}`)
	}
}

function Counter({ label, value, onIncrement, onDecrement }) {
	return (
		<section className="counter-panel">
			<p className="counter-label">{label}</p>
			<output className="counter-value">{value}</output>
			<div className="counter-actions">
				<button type="button" onClick={onDecrement} aria-label={`Decrease ${label}`}>
					−
				</button>
				<button type="button" onClick={onIncrement} aria-label={`Increase ${label}`}>
					+
				</button>
			</div>
		</section>
	)
}

export default function DoubleCounter() {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<main className="double-counter">
			<header className="counter-header">
				<p className="eyebrow">useReducer exercise</p>
				<h1>Double Counter</h1>
				<p>Two values, one predictable state machine.</p>
			</header>

			<div className="counter-grid">
				<Counter
					label="Counter A"
					value={state.counterA}
					onDecrement={() => dispatch({ type: 'DECREMENT_A' })}
					onIncrement={() => dispatch({ type: 'INCREMENT_A' })}
				/>
				<Counter
					label="Counter B"
					value={state.counterB}
					onDecrement={() => dispatch({ type: 'DECREMENT_B' })}
					onIncrement={() => dispatch({ type: 'INCREMENT_B' })}
				/>
			</div>

			<button className="reset-button" type="button" onClick={() => dispatch({ type: 'RESET_ALL' })}>
				Reset both counters
			</button>
		</main>
	)
}
