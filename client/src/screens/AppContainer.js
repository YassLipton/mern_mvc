import React from 'react'
import { withRouter } from "react-router-dom"

class AppContainer extends React.Component {
  
  componentDidMount() {
    this.unlisten = this.props.history.listen(async (location, action) => {
      const userToken = localStorage.getItem('userToken')
      const request = await fetch(`http://192.168.1.14:5000/user/checkToken/${userToken}`)
      const response = await request
      if (response.status == 401) {
        localStorage.removeItem('userToken')
        if (window.location.hash != '#/signin' && window.location.hash != '#/signup') window.location.hash = '/signin'
      }
    })
  }
  componentWillUnmount() {
      this.unlisten();
  }
  render() {
     return (
         <div>{this.props.children}</div>
      );
  }
}
export default withRouter(AppContainer)