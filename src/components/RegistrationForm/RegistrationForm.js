import React, {Component} from 'react';
import {Button, Input, Required} from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = e => {
        e.preventDefault()
        const { preferred_name, user_name, password } = e.target

        this.setState({error: null})
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            preferred_name: preferred_name.value
        })
          .then(user => {
              preferred_name.value = ''
              user_name.value = ''
              password.value = ''
              this.props.onRegistrationSuccess()
          })
          .catch(res => {
              this.setState({ error: res.error })
          })
    }

    render() {
        const { error } = this.state
        return (
            <form
              className='RegistrationForm'
              onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='preferred_name'>
                    <label htmlFor='RegistrationForm__preferred_name'>
                        Preferred Name <Required />
                    </label>
                    <Input
                      name='preferred_name'
                      type='text'
                      required
                      id='RegistrationForm__preferred_name'>
                    </Input>
                </div>
                <div className='user_name'>
                    <label htmlFor='RegistrationForm__user_name'>
                        User Name <Required />
                    </label>
                    <Input
                      name='user_name'
                      type='text'
                      required
                      id='RegistrationForm__user_name'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='RegistrationForm__password'>
                        Password <Required />
                    </label>
                    <Input 
                      name='password'
                      type='password'
                      required
                      id="RegistrationForm__password"
                    >
                    </Input>
                </div>
                <Button type='submit'>
                    Register
                </Button>
            </form>
        )
    }
}