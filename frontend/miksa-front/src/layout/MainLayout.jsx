import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar.jsx';

function MainLayout() {
    return (
        <div>
            <TopNavBar />
            <Outlet /> 
        </div>
    );
}

export default MainLayout;