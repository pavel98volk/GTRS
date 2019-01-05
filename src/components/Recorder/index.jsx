//https://jsfiddle.net/sasivarunan/bv55z5fe/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css'
class Recorder extends Component{

constructor(props){
  super(props);
  this.audioChunks=[];
  this.recordedAudio={};
  this.audioDownload={};
  this.state={
    recording:false,
    recorded:false,

  }
  this.timeRef = React.createRef();
}

stop(){
  if(this.props.state==='playing'){
    this.props.stop();
  }else if(this.props.state==='recording'){
    this.props.stopRecording();
  }
}
renderTime(){
  const timeEl = this.timeRef.current;

  while(timeEl && this.props.recMeta.startTime && !this.props.recMeta.endTime){
      let time = ((this.props.recMeta.endTime?this.props.recMeta.endTime:(new Date()).getTime()) - this.props.recMeta.startTime )/1000;
      timeEl.innerHTML = time+' seconds';
  }
}
render(){
  let time = ((this.props.recMeta.endTime?this.props.recMeta.endTime:(new Date()).getTime()) - this.props.recMeta.startTime )/1000
  this.renderTime();
    return(
          <div className={'recorder-main '+(this.props.className?this.props.className:'')} style={this.props.style}>
          		<p ref={this.timeRef} className='label'>Record Your audio <span style={{color:'#DDD',fontWeight:'bold'}}>
                {time?time+' seconds':''}</span>
            </p>
          		<div className='buttons'>
          			<button onClick={this.props.startRecording} disabled={!(['empty','ready'].includes(this.props.state))}>start</button>
          			<button onClick={this.stop.bind(this)} disabled ={!(['recording','playing'].includes(this.props.state))}>stop</button>
                <button onClick={this.props.play} disabled={!(['ready'].includes(this.props.state))}>play</button>
                <button onClick={this.props.playReversed} disabled={!(['ready'].includes(this.props.state))}>playReversed</button>
          		</div>
          </div>
    )
  }
}

Recorder.propTypes={
  blob:PropTypes.any,
  setBlob:PropTypes.function,
  playBlob:PropTypes.function
}
export default Recorder
