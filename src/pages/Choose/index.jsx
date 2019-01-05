
import React from 'react'
import NavBar from 'components/NavBar'
class ChoosePage extends React.Component{
  render(){
    return(
      <NavBar history={this.props.history}></NavBar>
    )
  }
}

export default ChoosePage;
