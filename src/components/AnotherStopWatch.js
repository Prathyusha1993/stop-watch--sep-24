import React, { useEffect, useState } from 'react';
import './stopWatch.css';

const AnotherStopWatch = () => {
    const [timer, setTimer] = useState({hours:'00', minutes:'00',seconds:'00'});
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;
        if(isActive){
            interval = setInterval(() => {
                setTimer(timer => {
                    if(timer.hours === '00' && timer.minutes === '00' && timer.seconds === '00'){
                        setIsActive(false);
                        return {hours:'00', minutes:'00', seconds:'00'};
                    } else if(timer.seconds !== '00'){
                        return {...timer, seconds: (parseInt(timer.seconds) - 1).toString().padStart(2,'0')}
                    } else if(timer.minutes !== '00'){
                        return {...timer, seconds:'59', minutes:(parseInt(timer.minutes) - 1).toString().padStart(2, '0')}
                    } else {
                        return {hours:(parseInt(timer.hours) - 1).toString().padStart(2,'0'), minutes:'59', seconds:'59'}
                    }
                })
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(prev => !prev)
    };

    const handleReset = () => {
        setTimer({hours:'00', minutes:'00', seconds:'00'});
        setIsActive(false);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        
        // Sanitize and limit the input value
        let sanitizedValue = parseInt(value) || 0;

        if (name === 'hours' && sanitizedValue > 99) {
            sanitizedValue = 99;
        } else if ((name === 'minutes' || name === 'seconds') && sanitizedValue > 59) {
            sanitizedValue = 59;
        }

        // Prevent negative input
        sanitizedValue = sanitizedValue < 0 ? 0 : sanitizedValue;

        setTimer({ ...timer, [name]: sanitizedValue.toString().padStart(2, '0') });

    };

    return (
        <div>
            <div className='container'>
                <div>
                    <p>Hours</p>
                    <input type='number' max={99} name='hours' onChange={handleInput} className='input-watch' placeholder='00' value={timer.hours} />
                </div> :
                <div>
                    <p>Minutes</p>
                    <input type='number' className='input-watch' max={59} name='minutes' onChange={handleInput} placeholder='00' value={timer.minutes} />
                </div> : 
                <div>
                    <p>Seconds</p>
                    <input type='number' className='input-watch' max={59} name='seconds' onChange={handleInput} placeholder='00' value={timer.seconds} />
                </div>
            </div>
            <div className='btn-watch'>
                <button className='btn' onClick={handleStart}>Start</button>
                <button className='btn-s' onClick={handleStop}>{isActive ? 'Pause' : 'Resume'}</button>
                <button className='btn-s' onClick={handleReset}>Reset</button>
            </div>

        </div>
    )
}

export default AnotherStopWatch;