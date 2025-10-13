import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router";

const AdminLayout: React.FC = () => {

    return (
        <div className="flex gap-2  bg-gray-600">
            <Sidebar  />
            <Outlet />
        </div>
    );
};

export default AdminLayout;
