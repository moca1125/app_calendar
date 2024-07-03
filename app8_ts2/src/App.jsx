import React, { useState } from 'react';

import './css/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/style.css';

import CalendarHeader from './components/CalendarHeader';
import CalendarBody from './components/CalendarBody';
import EventModal from './components/EventModal';

const API_URL='http://localhost:3000/events/';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [modalFlg, setModalFlg]=useState(false);

  const onModalOpen = () => setModalFlg(true);
	const onModalClose = () => setModalFlg(false);

  return (
    <>
      <CalendarHeader date={date} setDate={setDate} onModalOpen={onModalOpen}/>
      <CalendarBody date={date} />
      <EventModal modalFlg={modalFlg} onModalClose={onModalClose}/>
    </>
  )
}

export default App;

