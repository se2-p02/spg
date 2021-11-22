import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import moment from 'moment';
import API from './API';
import './MyClock.css';

function MyClock(props) {
  const [value, setValue] = useState();

  useEffect(() => {
    API.getClock().then((response) => {
      if (response.error === undefined) {
        props.setClock(new Date(response.serverTime));
        setValue(() => new Date(response.serverTime));
      }
    });
  }, [props.setClock]);

  return (
    <div>
      <span variant="primary" className="clockButton">
        <DateTimePicker
          onChange={setValue}
          value={value}
          format='yyyy-MM-dd HH:mm'
          required={true}
          clearIcon={null}
          locale='en-us'
        />
      </span>{' '}
      <div style={{ display: 'inline', visibility: moment(value).format('YYYY-MM-DD HH:mm') !== moment(props.clock).format('YYYY-MM-DD HH:mm') ? 'visible' : 'hidden' }}>
        <Button variant="success" onClick={() => props.updateClock(value)}><CheckLg size="27" /></Button>
        <Button variant="danger" onClick={() => setValue(() => props.clock)}><XLg size="27" /></Button>
      </div>
    </div>);
}

export default MyClock;