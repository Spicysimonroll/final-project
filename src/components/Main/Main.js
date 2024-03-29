import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Change alias to Router
import Homepage from '../Homepage/Homepage';
import ReservationForm from '../ReservationForm/ReservationForm';

export default function Main() {


  return (
    <main>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/reserve-table' element={<ReservationForm />} />
      </Routes>
    </main>
  )
}
