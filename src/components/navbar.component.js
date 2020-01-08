import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar () {

    const [collapsed, setCollapsed] = useState(true);

    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <a className="navbar-brand" href="#">JOB PEA Doi Lo</a>
            <button onClick={ () => setCollapsed(!collapsed) } className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${classOne}`} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    
                <li className="nav-item active">
                    <Link to="/" className="nav-link">หน้าหลัก</Link>
                </li>
                <li className="nav-item">
                    <Link to="/taskmanager" className="nav-link">มอบหมายงาน</Link>
                </li>
                <li className="nav-item">
                    <Link to="/showTask" className="nav-link">ดูตารางงาน</Link>
                </li>
                <li className="nav-item">
                    <Link to="/editProfile" className="nav-link">แก้ไขข้อมูลบุคคล</Link>
                </li>
                <li className="nav-item">
                    <Link to="/listTask" className="nav-link">รายการงาน</Link>
                </li>

                </ul>
                </div>
            </div>
            <br/>
        </nav>
    )
}

export default Navbar;