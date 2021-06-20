import { BusinessCenter, Chat, Home, Notifications, Search, SupervisorAccount } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './firebase';
import "./Header.css"
import HeaderOption from './HeaderOption'

function Header() {
    const dispatch = useDispatch();
    const logoutOfApp = () => {
        dispatch(logout())
        auth.signOut();
    }

    return (
        <div className="header">


            <div className="header__left">
                <img src="https://image.flaticon.com/icons/png/512/174/174857.png" alt="" />
                <div className="header__search">
                    <Search />
                    <input type="text" />
                </div>
            </div>

            <div className="header__right">
                <HeaderOption Icon={Home} title="Home" />
                <HeaderOption Icon={SupervisorAccount} title="My Network" />
                <HeaderOption Icon={BusinessCenter} title="Jobs" />
                <HeaderOption Icon={Chat} title="Chat" />
                <HeaderOption Icon={Notifications} title="Notifications" />
                <HeaderOption avatar="KB" title="Me" onClick={logoutOfApp} />
            </div>
        </div>
    )
}

export default Header
