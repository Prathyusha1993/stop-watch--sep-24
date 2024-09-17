import React, { useEffect, useState } from 'react'

const StopWatch = () => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

   useEffect(() => {
    let interval;
    if(isActive){
        interval = setInterval(() => {
            setTimer(timer => {
                if(timer > 0){
                    return timer -1;
                } else {
                    setIsActive(false);
                    return 0;
                }
            })
        }, 1000)
    }
    return () => clearInterval(interval);
   }, [isActive])

    const handleStart = () => {
        setIsActive(true);
        setTimer(5400);
    };

    const handleReset = () => {
        setTimer(0);
        setIsActive(false);
    };

    const formatTimer = (timer) => {
        const hours = Math.floor(timer/3600);
        const minutes = Math.floor((timer % 3600) /60);
        const seconds = Math.floor(timer % 60);
        return `${hours}:${minutes}:${seconds}`;
    };

    const handlePause = () => {
        setIsActive(prev => !prev);
    }

  return (
    <div>
        <p>{formatTimer(timer)}</p>
        <div>
            <button onClick={handleStart}> Start</button>
            <button onClick={handlePause}>{isActive ? 'Pause' : 'Resume'}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
  )
}

export default StopWatch;