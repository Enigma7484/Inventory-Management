import React, { useState } from 'react';
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import menu from "../../data/sidebar";
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className={isOpen ? "layout sidebar-open" : "layout sidebar-closed"}>
            <aside className="sidebar">

                <div className="top_section">
                    <div className="logo">
                        <RiProductHuntLine size={35} style={{ cursor: "pointer" }} onClick={goHome} />
                        {isOpen && <span>Stockroom</span>}
                    </div>

                    <button className="bars" type="button" onClick={toggle} aria-label="Toggle navigation">
                        <HiMenuAlt3 />
                    </button>
                </div>
                {menu.map((item, index) => {
                    return <SidebarItem key={index} item={item} isOpen={isOpen} />
                })}
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}

export default Sidebar
