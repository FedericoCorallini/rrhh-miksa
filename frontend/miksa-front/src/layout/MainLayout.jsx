import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar.jsx';
import './mainLayout.css';
import Footer from '../components/Footer.jsx';

function MainLayout() {
    const [isTabSelected, setIsTabSelected] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const pathsWithTabs = ['/perfil', '/empleados', '/solicitudes', '/permisos'];
        setIsTabSelected(pathsWithTabs.some(path => location.pathname.startsWith(path)));
    }, [location]);

    return (
        <>
        <div className={`main-layout ${isTabSelected ? 'tab-selected' : 'no-tab-selected'}`}>
            <TopNavBar setIsTabSelected={setIsTabSelected} />
            <Outlet />
        </div>
        {isTabSelected ? (
                <div className='tab-selected-footer'>
                    <Footer/>
                </div>
            ) : null}
        </>
    );
}

export default MainLayout;