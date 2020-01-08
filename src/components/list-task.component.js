import React, {useEffect, useState} from 'react';
import axios from 'axios';
import style from '../App.css'


function ShowTask() {

    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState({
        status: 2,
    })
    const [tasksed, setTasksed] = useState([])
    const [username, setUsername] = useState('')
    const [users, setUsers] = useState([]);

    // Fetch Tasks by username
    useEffect( () => {
        axios.get(`https://line-pea.herokuapp.com/tasks/${username}`)
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
            setTasks(dataEvents)
            setTasksed(dataEvents)
            console.log(dataEvents)
        })
        .catch( (err) => console.log(err))
    }, [username])

    // Filter Data
    useEffect( () => {
        let newTasks = tasks
        console.log(newTasks)
        console.log(filter.status)
        if(filter.status === 0) {
            newTasks = newTasks.filter(task => task.status === 0)
        }
        else if(filter.status === 1) {
            newTasks = newTasks.filter(task => task.status === 1)
        }
        setTasksed(newTasks)
    }, [tasks, filter])

    // Fetch users name
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

      function editTask(e) {
          console.log(e.target.value)
      }

    return (
        <div className="container">
        <br/>
            <div className="card">
                <div className="card-header">
                   <h3>รายการงาน</h3>
                </div>
                <div className="card-body">
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
                    <br/>
                    <button className={filter.status === 2 ? "btn mr-2 btn-primary" : "btn mr-2 btn-secondary"} onClick={ () => setFilter({status: 2})}>งานทั้งหมด</button>
                    <button className={filter.status === 1 ? "btn mr-2 btn-primary" : "btn mr-2 btn-secondary"} onClick={ () => setFilter({status: 1})}>งานที่เสร็จแล้ว</button>
                    <button className={filter.status === 0 ? "btn mr-2 btn-primary" : "btn mr-2 btn-secondary"} onClick={ () => setFilter({status: 0})}>งานที่ยังไม่เสร็จ</button>
                    <br />
                    <br />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">เรื่อง</th>
                                <th scope="col">กำหนดส่ง</th>
                                <th scope="col">สถานะงาน</th>
                                <th scope="col">ผู้รับผิดชอบ</th>
                                <th scope="col">แก้ไข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasksed.map( (task, index) => (
                                    <tr key={task.id}>
                                        <th>{index + 1}</th>
                                        <td key={task.title}>{task.title}</td>
                                        <td>{formatDate(task.finish)}</td>
                                        <td>{task.status ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}</td>
                                        <td key={task.displayName}>{task.displayName}</td>
                                        <td key={task.id}>
                                            <button className="btn btn-warning" value={task.id} onClick={editTask}>แก้ไข</button>
                                            <button className="btn btn-danger" value={task.id} onClick={editTask}>ลบ</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ShowTask