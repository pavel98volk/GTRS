import React from 'react'
import './styles.css'
import {addNavBar} from  'components/NavBar'
class GuessPage extends React.Component{
   constructor(props){
     super(props);
     this.state={};
   }
   render(){
     return (
       <div>
         Here you shall guess...
       </div>
     )
   }
 }

 export default addNavBar(GuessPage);
