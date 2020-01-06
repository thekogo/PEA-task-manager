import React, { useEffect, useState} from 'react';
import qrcode from '../image/line.png';
import axios from 'axios';

function MainMenu() {

    const [users, setUsers] = useState([]);

    useEffect( () => {
        axios.get('https://line-pea.herokuapp.com/users/')
        .then( (res) => {
            let usersTemp = res.data.map( (user) => (
                {
                    id: user._id,
                    username: user.username,
                    displayName: user.displayname,
                    position: user.position,
                }
            ))
            setUsers(usersTemp)
            console.log(usersTemp)
        })
    }, [])

    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Qr Code</h3>
                        </div>
                        <div className="card-body">
                            <img className="img-thumbnail" src={qrcode} alt="QR Code" style={{width: '100%'}}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3>รายชื่อสมาชิก</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ชื่อ</th>
                                        <th scope="col">ตำแหน่ง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map( (user, index) => (
                                            <tr key={user.id}>
                                                <th>{index + 1}</th>
                                                <td key={user.displayName}>{user.displayName}</td>
                                                <td ket={user.position}>{user.position}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainMenu