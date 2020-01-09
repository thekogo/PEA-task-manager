import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import th from 'date-fns/locale/th';
registerLocale('th', th)

function EditTask (props) {

    
    const [success, setSuccess] = useState(false); 
    const [task, setTask] = useState({
        id:'',
        title: '',
        description: '',
        finish: new Date(new Date().setHours( 0,0,0,0 )),
        check: new Date(new Date().setHours( 0,0,0,0 )),
        status: 0,
    });

    useEffect( ()=> {
        const id = props.match.params.id
        axios.get('https://line-pea.herokuapp.com/tasks/show/'+id)
        .then( (res) => {
            console.log(res.data)
            setTask({...res.data, finish: new Date(res.data.finish), check: new Date(res.data.check)})
        })
    }, [])

    useEffect( () => {
        setSuccess(false);
    }, [task])

    function onSubmit(e) {
        console.log(task.id)
        e.preventDefault();
        axios.patch('https://line-pea.herokuapp.com/tasks/edit/'+task._id, task)
        .then( res => {
            console.log(res)
            if(res.status === 200) {
                setSuccess(true);
            }
        })
        .catch( err => console.log(err))
    }

    return (
        <div className="container" style={{maxWidth: '1300px'}}>
            <br/>
            <div className="card">
                <div className="card-header">
                    <h2>แก้ไขข้อมูลบุคคล</h2>
                </div>
                <div className="card-body">
                    {success && <div className="alert alert-success">บันทึกข้อมูลของ {task.title} เรียบร้อย</div>}
                    <form onSubmit={onSubmit}>

                        <div className="form-group">
                            <label>ชื่อเรื่อง</label>
                            <input className="form-control" type="text"
                                value={task.title}
                            />
                        </div>
                        <div className="form-group">
                            <label>รายละเอียด</label>
                            <textarea className="form-control" type="text"
                                value={task.description}
                                onChange={ (e) => setTask({...task, description: e.target.value})}
                                rows="7"
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
                        <div className="form-group">
                        <label htmlFor="name">สถานะงาน : </label>
                        <select id="name" className="custom-select"
                        value={task.status}
                        onChange={ (e) => setTask({...task, status: e.target.value})}
                        >
                            <option value="0">ยังไม่เสร็จ</option>
                            <option value="1">เสร็จแล้ว</option>
                        </select>
                    </div>
                        <button className="btn btn-success float float-right" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask;