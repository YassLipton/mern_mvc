import React from 'react'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  } 

  Submit = async () => {
    let fet = await fetch('http://192.168.1.14:5000/user/login', {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let rep = await fet.json()
    console.log(rep)
    if (rep.successfullyLogged) {
      localStorage.setItem('userToken', rep.accessToken)
      window.location.href = window.location.origin + window.location.pathname
    } else {
      alert('Your credentials are incorrects. \nPlease try again.')
    }
  }

  render() {
    return (
      <div className='full_centered'>
        <form className='col-md-4' onSubmit={this.Submit}>
          <div class="form-group">
            <label for="email_input">Email address</label>
            <input type="email" class="form-control" id="email_input" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})} />
          </div>
          <div class="form-group">
            <label for="password_input">Password</label>
            <input type="password" class="form-control" id="password_input" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}