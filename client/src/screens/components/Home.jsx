import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  } 

  Logout = async () => {
    const userToken = localStorage.getItem('userToken')
    let fet = await fetch('http://192.168.1.14:5000/user/logout', {
      method: "DELETE",
      body: JSON.stringify({
        token: userToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let repStatus = await fet.status
    if (repStatus == 204) {
      localStorage.removeItem('userToken')
      window.location.hash = '/signin'
    }
  }

  render() {
    return (
      <div className='full_centered'>
        <div className='col-md-4'>
          <p>Home</p>
          <div className='btn btn-primary' onClick={this.Logout}>
            <a>Logout</a>
          </div>
        </div>
      </div>
    )
  }
}