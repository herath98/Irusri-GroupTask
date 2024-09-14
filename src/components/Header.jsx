import React from "react";
import {  Button,  Navbar} from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/Group.png";



export default function Header() {


    return (
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <img src={logo} alt="Logo" width={100} height={50} className="max-w-[100px] w-auto "/>
            </Link>

            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                
                <Link to="/sign-in">
                    <Button outline gradientDuoTone="purpleToBlue">
                        Sign In
                    </Button>
                </Link>

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <NavLink to="/" className="nav-link" exact="true">
                    Home
                </NavLink>
                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>

            </Navbar.Collapse>
        </Navbar>
    );
}
