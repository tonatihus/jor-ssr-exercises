'use client';
import React from 'react';
import format from 'date-fns/format';
import Spinner from '../../../components/Spinner';


function Clock() {
  const [time, setTime] = React.useState(null);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="clock">{time instanceof Date ? format(time, 'hh:mm:ss.S a') : <Spinner />}</p>
  );
}

export default Clock;
