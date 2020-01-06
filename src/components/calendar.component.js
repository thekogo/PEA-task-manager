import React, { useEffect, useState} from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
import 'moment/locale/th';

const localizer = momentLocalizer(moment)

const now = new Date()

function formatDate(date) {
  let monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม",
    "สิงหาคม", "กันยายน", "ตุลาคม",
    "พฤศจิกายน", "ธันวาคม"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.description}</p>
      <p>{`ผู้รับผิดชอบ : ${event.username}`}</p>
      <p>{`กำหนดส่งงาน : ${formatDate(event.finish)}`}<br/>
      {`กำหนดเช็คงาน : ${formatDate(event.check)}`}
      </p>
      <p>สถานะงาน : {event.status ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}</p>
    </span>
  )
}

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {` [${event.username}]`}
    </span>
  )
}

function CalendarForm (props) {

   const [events, setEvents] = useState([])
   console.log(localizer)

  useEffect( () => {
    setEvents(props.events)
  }, [props.events])

    return (
    <div className="card">
        <div className="card-header">
            <h2>ปฏิทินงาน</h2>
        </div>
        <div className="card-body">
            <Calendar
            localizer={localizer}
            culture = 'th-TH'
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 660 }}
            components={{
              event: Event,
              agenda: {
                event: EventAgenda,
              },
            }}
            />
        </div>
  </div>
)

}
export default CalendarForm;