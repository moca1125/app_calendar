import React,{useState} from 'react';

import './css/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/style.css';


import CalenderHeader from './components/CalendarHeader.jsx';

const App = () => {
    const [date,setDate]=useState(new Date());
	return(
    <>
        <CalenderHeader date={date}/>
	    <h1>Hello, React!</h1>
      <p>現在Reactを学習しています</p>
    </>
  )
}

export default App;