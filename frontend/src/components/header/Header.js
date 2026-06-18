import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice';
import { FiLogOut } from "react-icons/fi";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <header className="--pad header app-header">
      <div className="--flex-between app-header__inner">
        <div>
          <span className="app-header__eyebrow">Inventory workspace</span>
          <h3>
            Welcome, <span className="app-header__name">{name || "there"}</span>
          </h3>
        </div>
        <button onClick={logout} className="--btn --btn-danger">
          <FiLogOut />
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
