import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditProfile (props) {

    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState(false); 
    const [profile, setProfile] = useState({
        id:'',
        username: '',
        displayName:'',
        position:'',
    });

    useEffect( () => {
        axios.get('https://line-pea.herokuapp.com/users/')
        .then( (res) => {
            let usersTemp = res.data.map( (user) => (
                {
                    id: user._id,
                    username: user.username,
                    displayName: user.displayname
                }
            ))
            setUsers(usersTemp)
            setProfile({...profile, username: usersTemp[0].username})
        })
    }, [])

    useEffect( ()=> {
        axios.get('https://line-pea.herokuapp.com/users/'+profile.username)
        .then( (res) => {
            let usersTemp = res.data.map( (user) => (
                {
                    id: user._id,
                    username: user.username,
                    displayName: user.displayname,
                    position: user.position || '',
                }
            ))
            setProfile({...profile, id: usersTemp[0].id, username: usersTemp[0].username, displayName: usersTemp[0].displayName, position: usersTemp[0].position})
        })
    }, [profile.username])

    function onSubmit(e) {
        console.log(profile.id)
        e.preventDefault();
        axios.patch('https://line-pea.herokuapp.com/users/edit/'+profile.id, profile)
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
                    {success && <div className="alert alert-success">บันทึกข้อมูลของ {profile.displayName} เรียบร้อย</div>}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>แก้ไขข้อมูลของ : </label>
                            <select className="custom-select"
                            value={profile.username}
                            onChange={ (e) => {
                                setProfile({...profile, username: e.target.value});
                                setSuccess(false)
                            }}
                            >
                                {
                                    users.map( (user) => (
                                        <option key={user.username} value={user.username}>{user.displayName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>ชื่อ Line</label>
                            <input className="form-control" type="text"
                                disabled
                                value={profile.username}
                            />
                        </div>
                        <div className="form-group">
                            <label>ชื่อ</label>
                            <input className="form-control" type="text"
                                value={profile.displayName}
                                onChange={ (e) => setProfile({...profile, displayName: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>ตำแหน่ง</label>
                            <input className="form-control" type="text"
                                value={profile.position}
                                onChange={ (e) => setProfile({...profile, position: e.target.value})}
                            />
                        </div>
                        <button className="btn btn-success float float-right" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;