import React from 'react';
import {  Card } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import './MyClock.css';

function MyClock(props) {
  return (
    <>
      {props.value && props.clock &&
        <Card body data-testid="clock" className="clockButton m-0 p-0 text-center align-items-center">
          <DateTimePicker
            onChange={props.setValue}
            value={props.value}
            format='yyyy-MM-dd HH:mm'
            required={true}
            clearIcon={null}
            locale='en-us'
          />
        </Card>
      }
    </>
  );

}


export default MyClock;