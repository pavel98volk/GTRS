
import React from 'react'
import './styles.css'
class MainPage extends React.Component{
   constructor(props){
     super(props);
     this.state={};
     this.styles ={
       buttonContainer:{
         display:'flex',justifyContent:'center',
       },
       buttonLink:{position:'absolute',width:'90%',maxWidth:'600px',height:'4em',maxHeight:'30%',
         fontSize:'2em',color:'#222',fontWeight:'bold',textDecoration:'none',
          display:'flex',justifyContent:'center',alignItems:'center',boxShadow:'1px 1px 1px 1px solid rgba(0,0,0,0.5)',
         borderRadius:'20px'},
       buttonLinkText:{
         position:'relative',
        /* top:'50%',*/
         /*transform:'translate(0, -50%)',*/
       }
     }
   }
   render(){
     return (
       <div style={{...this.styles.buttonContainer}}>
         <a style={{bottom:'51%',margin:'0 auto'}}
            className='main-buttonLink main-record' href = '/record'>
           <span style={this.styles.buttonLinkText}>Record new audio!</span>
         </a>
         <a  style ={{top:'51%',margin:'0 auto'}}
             className='main-buttonLink main-guess' href = '/choose'>
           <span  style={this.styles.buttonLinkText}>Guess the song!</span>
         </a>
       </div>
     )
   }
 }

 export default MainPage;
