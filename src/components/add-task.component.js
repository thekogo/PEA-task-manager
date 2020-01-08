import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import th from 'date-fns/locale/th';
registerLocale('th', th)

function AddTask () {

    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState(false); 
    const [task, setTask] = useState({
       username: '',
       title: '',
       description: '',
       finish: new Date(new Date().setHours( 0,0,0,0 )),
       check: new Date(new Date().setHours( 0,0,0,0 )),
    });

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
            setTask({...task, username: usersTemp[0].username})
        })
    }, [])

   useEffect( () => {
        setSuccess(false);
   }, [task])

    function onSubmit(e) {
        e.preventDefault();
        console.log(task)
        axios.post('https://line-pea.herokuapp.com/tasks/add', task)
        .then( res => {
            if(res.status === 200) {
                setSuccess(true);
            }
        })
        .catch( err => console.log(err))
    }


    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <h2>มอบหมายงาน</h2>
                    {success && <div className="alert alert-success">บันทึกงานเรื่อง {task.title} เรียบร้อย</div>}
                    <div className="form-group">
                        <label htmlFor="name">มอบหมายงานให้ : </label>
                        <select id="name" className="custom-select"
                        value={task.username}
                        onChange={ (e) => setTask({...task, username: e.target.value})}
                        >
                            {
                                users.map( (user) => (
                                    <option key={user.username} value={user.username}>{user.displayName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">หัวข้อเรื่อง : </label>
                        <input id="title" className="form-control" required 
                            value={task.title} 
                            onChange={ (e) => setTask({...task, title: e.target.value})} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">รายละเอียด : </label>
                        <textarea id="description" className="form-control" required rows="10"
                            value={task.description} 
                            onChange={ (e) => setTask({...task, description: e.target.value})} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="finish">กำหนดส่งงาน : </label>
                        <DatePicker 
                            selected={task.finish}
                            onChange={(date) => setTask({...task, finish: new Date(date.setHours( 0,0,0,0 ))})}
                            dateFormat="dd/MM/yyyy"
                            minDate={ new Date() }
                            locale="th"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="check">กำหนดเช็คงาน :  </label>
                        <DatePicker 
                            selected={task.check}
                            onChange={(date) => setTask({...task, check: new Date(date.setHours( 0,0,0,0 ))})}
                            dateFormat="dd/MM/yyyy"
                            minDate={ new Date() }
                            locale="th"
                        />
                    </div>
                    <button className="btn btn-success float-right mr-2" type="submit">Summit</button>
                </form>
            </div>
        </div>
    )
}

export default AddTask;