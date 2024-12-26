import {useEffect, useState} from "react";

export default function App() {
    // state for the advice text
    const [advice, setAdvice] = useState("");
    // state for the number of advice gets
    const [count, setCount] = useState(0);

    // local function for fetching advice from an API
    async function getAdvice() {
        // wait for the fetch result before we progress futher
        const res = await fetch('https://api.adviceslip.com/advice');
        // convert the response to json
        const data = await res.json();

        // using the "useState" setAdvice to set the "advice" variable value
        setAdvice(data.slip.advice);
        // Same here with incrementing the state value without accessing the "count" variable
        setCount((prevState) => prevState + 1);
    }

    // useEffect will run the code inside when the page load
    useEffect(function () {
        getAdvice();
    }, []); // We need to set the dependency to an empty array so it not constantly running

    // Content
    return <div>
        <h1>{advice}</h1>
        <button onClick={getAdvice}>Get advice</button>
        <Message count={count}/>
    </div>
}

function Message(props) {
    return <p>
        You have read <strong>{props.count}</strong> pieces of advice
    </p>;
}