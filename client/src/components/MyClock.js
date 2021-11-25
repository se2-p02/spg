import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
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
        setValue(() => new Date(response.serverTime));
      }
    });
  }, [props.setClock]);

  return (
    <Row className="d-flex align-items-center">
      <Col sm={8} className="d-flex justify-content-center">
        <Card body className="clockButton">
          <DateTimePicker
            onChange={setValue}
            value={value}
            format='yyyy-MM-dd HH:mm'
            required={true}
            clearIcon={null}
            locale='en-us'
          />
        </Card>
      </Col>
      <Col>
        <div style={{ display: 'inline', visibility: moment(value).format('YYYY-MM-DD HH:mm') !== moment(props.clock).format('YYYY-MM-DD HH:mm') ? 'visible' : 'hidden' }}>
          <Button variant="success" onClick={() => props.updateClock(value)}><CheckLg size="27" /></Button>
          <Button variant="danger" onClick={() => setValue(() => props.clock)}><XLg size="27" /></Button>
        </div>
      </Col>
    </Row>);
}

export default MyClock;