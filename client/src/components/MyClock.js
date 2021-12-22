import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import moment from 'moment';
import './MyClock.css';

function MyClock(props) {
  const [value, setValue] = useState();

  useEffect(() => {
    if (props.clock) {
      setValue(() => new Date(props.clock));
    }
  }, [props.clock]);

  return (
    <>
      {value && props.clock &&
        <Row className=" align-items-center container">

          <Col sm={12} className=" align-items-center d-flex justify-content-start p-0 m-0 text-center vertical-center ">

            <Card body className="clockButton m-0 p-0 text-center align-items-center">
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

            <div className="p-0" style={{ display: 'inline', visibility: moment(value).format('YYYY-MM-DD HH:mm') !== props.clock.format('YYYY-MM-DD HH:mm') ? 'visible' : 'hidden' }}>
              <Button variant="success" onClick={() => props.updateClock(value)}><CheckLg size="27" /></Button>
              <Button  variant="danger" onClick={() => setValue(() => new Date(props.clock))}><XLg size="27" /></Button>
            </div>
          </Col>

        </Row>}
    </>
  );

}

export default MyClock;