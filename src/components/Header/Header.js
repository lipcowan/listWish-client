import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hyph } from '../Utils/Utils';
import TokenService from '../../services/token-service';


export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link 
                  onClick={this.handleLogoutClick}
                  to='/'>
                  Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                  to='/register'>
                  Create an account
                </Link>
                <Link
                  to='/login'>
                  Log in
                </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='Header'>
                <h1>
                    <Link to='/'>
                        ListWish
                    </Link>
                </h1>
                {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </nav>
        )
    }
}