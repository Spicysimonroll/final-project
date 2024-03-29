import { useFormik } from 'formik';
import * as Yup from 'yup';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function TableReservation() {
  const layer = useRef(null);
  const popup = useRef(null);

  function createMessage(reservation, scenario) {
    switch(scenario) {
      case 0:
        return `${reservation.firstName} ${reservation.lastName}`;
      case 1:
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = reservation.date.toLocaleDateString('en-GB', options);

        return `${formattedDate} at ${reservation.arrivalTime}`;
      case 2:
        return reservation.numberOfPeople;
      case 3:
        return reservation.phoneNumber;
      default:
        console.log("default error");
        return null;
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      date: '',
      numberOfPeople: '',
      arrivalTime: ''
    },
    onSubmit: (reservation, { resetForm }) => {
      const h3Elements = Array.from(popup.current.querySelectorAll('h3'));

      h3Elements.forEach((h3, index) => {
        const message = createMessage(reservation, index);
        const p = document.createElement('p');

        p.innerText = message;

        h3.parentNode.insertBefore(p, h3.nextSibling);
      })
      layer.current.classList.remove('hidden');
      resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required').matches(/^[A-Za-z\s-]+$/, 'Only letters are allowed'),
      lastName: Yup.string().required('Required').matches(/^[A-Za-z\s-]+$/, 'Only letters are allowed'),
      phoneNumber: Yup.string().required('Required').matches(/^[\d\s-]+$/, 'Only digits are allowed'),
      date: Yup.string().required('Required'),
      numberOfPeople: Yup.string().required('Required').matches(/^[\d\s-]+$/, 'Only digits are allowed'),
      arrivalTime: Yup.string().required('Required').matches(/^\d{2}:\d{2}$/, '24 hour format (hh:mm)'),
    })
  })

  return (
    <>
      <div className="layer hidden" ref={layer}>
        <div className="confirmation" ref={popup}>
        {/* <FontAwesomeIcon icon={faX} /> */}
          <div>
            <h1>Thank you!</h1>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div>
            <h3>Reservation name</h3>
          </div>
          <div>
            <h3>When</h3>
          </div>
          <div>
            <h3>Table for</h3>
          </div>
          <div>
            <h3>Contact number</h3>
          </div>
          <Link to='/' className='btn btn-primary' >Great!</Link>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Reserve a table</h1>
        <div className='form-details'>
          <section>
            <div className="form-control">
              <Flatpickr
                options={{
                  inline: true,
                  dateFormat: 'd-m-Y',
                  minDate: 'today',
                  onChange: (date => formik.setFieldValue('date', date[0]))
                }}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date ? (<span class="invalid-error">{formik.errors.date}</span>) : null}
            </div>
          </section>
          <section>
            <div className='form-control'>
              <label htmlFor='first-name'>Name</label>
              <input id='first-name' type='text' name='first-name' {...formik.getFieldProps("firstName")} />
              {formik.touched.firstName && formik.errors.firstName ? (<span class="invalid-error">{formik.errors.firstName}</span>) : null}
            </div>
            <div className='form-control'>
              <label htmlFor='last-name'>Last name</label>
              <input id='last-name' type='text' name='last-name' {...formik.getFieldProps("lastName")} />
              {formik.touched.lastName && formik.errors.lastName ? (<span class="invalid-error">{formik.errors.lastName}</span>) : null}
            </div>
            <div className='form-control'>
              <label htmlFor='phone'>Phone No.</label>
              <input id='phone' type='text' name='phone' {...formik.getFieldProps("phoneNumber")} />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<span class="invalid-error">{formik.errors.phoneNumber}</span>) : null}
            </div>
            <div className='form-control'>
              <label htmlFor='number-of-people'>Number of people</label>
              <select id='number-of-people' name='number-of-people' {...formik.getFieldProps("numberOfPeople")}>
                <option value label=''></option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
              {formik.touched.numberOfPeople && formik.errors.numberOfPeople ? (<span class="invalid-error">{formik.errors.numberOfPeople}</span>) : null}
            </div>
            <div className='form-control'>
              <label htmlFor='arrival-time'>Arrival time</label>
              <input id='arrival-time' type='text' name='arrival-time' {...formik.getFieldProps("arrivalTime")} />
              {formik.touched.arrivalTime && formik.errors.arrivalTime ? (<span class="invalid-error">{formik.errors.arrivalTime}</span>) : null}
            </div>
          </section>
        </div>
        <input type='submit' value='Reserve now' className='btn btn-secondary' />
      </form>
    </>
  )
}
