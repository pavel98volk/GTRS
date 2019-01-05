import React from 'react'
import './styles.css'
class NavBar extends React.Component{
  constructor(props){
    super(props);
  }
  goto(link){
    this.props.history.push(link);
  }

  render(){
    return(
      <div className='navBar-bar'>
        <div className='navBar-links'>
          <span>SOME LOGO</span>
          <button href= '/' onClick={()=>this.goto('/')}>main page</button>
        </div>
      </div>
    )
  }
}
function addNavBar(Component){
  return class extends React.Component{
    render(){
    return(
      <div>
        <NavBar/>
        <div className='navBar-noNav'>
          <Component {...this.props}/>
        </div>
      </div>
    )
    }
  }
}
export {addNavBar};
export default NavBar;
