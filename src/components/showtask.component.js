import React, {useEffect, useState} from 'react';
import CalendarForm from './calendar.component';
import axios from 'axios';
import style from '../App.css'


function ShowTask() {

    const [events, setEvents] = useState([])
    const [username, setUsername] = useState('')
    const [users, setUsers] = useState([]);

    useEffect( () => {
        axios.get(`https://line-pea.herokuapp.com/tasks/${username}`)
        .then( (res) => {
            let dataEvents = res.data.map( (event) => (
                {
                    id: event._id,
                    title: event.title,
                    description: event.description,
                    username: event.username,
                    start: new Date(new Date(event.finish).setHours( 8,0,0,0 )),
                    end: new Date(new Date(event.finish).setHours( 17,0,0)),
                    finish: new Date(event.finish),
                    check: new Date(event.finish),
                    status: event.status
                }
            ))
            setEvents(dataEvents)
            console.log(dataEvents)
        })
        .catch( (err) => console.log(err))
    }, [username])

    useEffect( () => {
        axios.get('https://line-pea.herokuapp.com/users/')
        .then( (res) => {
            let usersTemp = res.data.map( (user) => (
                {
                    username: user.username,
                    displayName: user.displayname
                }
            ))
            console.log( usersTemp)
            setUsers(usersTemp)
        })
    }, [])

    return (
        <div className="container">
        <br/>
            <label htmlFor="username" className={style.labelSameLine}>ชื่อ : </label>
            <select id="username" className="custom-select selectSameLine"
            value={username}
            onChange={ (e) => setUsername(e.target.value)}
            >
                <option value="">ทั้งหมด</option>
                {
                    users.map( (user) => (
                        <option key={user.username} value={user.username}>{user.displayName}</option>
                    ))
                }
            </select>
            <CalendarForm events={events}/>
        </div>

    )
}

export default ShowTask