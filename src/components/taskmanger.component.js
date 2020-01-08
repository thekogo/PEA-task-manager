import React, { useEffect, useState } from 'react';
import CalendarForm from './calendar.component';
import AddTask from './add-task.component';
import axios from 'axios';

function TaskManager () {

    const [events, setEvents] = useState([])

    useEffect( () => {
        axios.get('https://line-pea.herokuapp.com/tasks/')
        .then( (res) => {
            let dataEvents = res.data.map( (event) => (
                {
                    id: event._id,
                    title: event.title,
                    description: event.description,
                    username: event.username,
                    displayName: event.userdetials[0].displayname,
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
    }, [])

    return (
        <div className="container" style={{maxWidth: '1300px'}}>
            <br/>
            <div className="row">
                <div className="col-lg-4">
                    <AddTask />
                </div>
                <div className="col-lg-8">
                    <CalendarForm events={events}/>
                </div>
            </div>
        </div>
    )
}

export default TaskManager;