import React from 'react';
import { Container, Button } from 'react-bootstrap';

const CalendarHeader = (props) => {
    const thisYear=props.date.getFullYear();
    const thisMonth=props.date.getMonth();
	return(
    <header className="l_header py-3 ms-0">
			<Container fluid className="d-flex justify-content-between">
	      <div className="d-flex align-items-center">
	        <Button variant="link" className="btn me-3 text-white">
	          <i className="bi bi-chevron-left" />
          </Button>
          <h1 className="mb-0 fs-2 fw-bold text-white text-center">{thisYear}年{thisMonth+1}月</h1>
          <Button variant="link" className="btn ms-3 text-white">
            <i className="bi bi-chevron-right" />
          </Button>
        </div>
      </Container>
    </header>
	)
}

export default CalendarHeader;