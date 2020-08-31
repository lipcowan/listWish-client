import React, {Component} from 'react';
//import TokenService from '../../services/token-service';
//import AuthApiService from'../../services/auth-api-service';
import {Button, Input} from '../Utils/Utils';

export default class LoginForm extends Component {
    static defaultProps= {
        onLoginSucess: () => {}
    }

    state = { error: null}

    handleSubmitJwtAuth = e => {
        e.preventDefault()
        this.setState({ error: null})
        const { user_name, password } = e.target

        user_name.value = ''
        password.value = ''
        //TokenService.saveAuthToken()
        this.props.onLoginSucess()
    }

    render() {
        const {error} = this.state
        return (
            <form
              className='LoginForm'
              onSubmit={this.handleSubmitJwtAuth}
            >
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div className='user_name'>
                  <label htmlFor='LoginForm__user_name'>
                      User Name
                  </label>
                  <Input
                    required
                    name='user_name'
                    type='text'
                    id='LoginForm__user_name'>               
                  </Input>
              </div>
              <div className='password'>
                  <label htmlFor='LoginForm__password'>
                      Password
                  </label>
                  <Input
                    required
                    name='password'
                    type='password'
                    id='LoginForm__password'
                  >
                  </Input>
              </div>
              <Button type='submit'>
                  Login
              </Button>
            </form>
        )
    }
}