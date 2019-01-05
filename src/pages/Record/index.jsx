
//https://stackoverflow.com/questions/9874167/how-can-i-play-audio-in-reverse-with-web-audio-api


import React from 'react'

import './styles.css'
import {cloneDeep} from 'lodash'
import Recorder from 'components/Recorder'
import {addNavBar} from 'components/NavBar'
class RecordPage extends React.Component{
  constructor(props){
    super(props);
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    this.state={
      audioBlob:undefined,
      audioState:'empty', //empty,recording,ready, playing
      meta:{startTime:undefined,endTime:undefined}
    };
    this.tools={
      mediaRecorder: undefined,
      source: undefined,
      context: new AudioContext()
    };
    this.initRecordTools();
  }
  initRecordTools(){
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.tools.mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];
        this.tools.mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });
      this.tools.mediaRecorder.addEventListener("start",()=>{
        audioChunks=[];
      });
      this.tools.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        var arrayBuffer;
        var fileReader = new FileReader();
        fileReader.onload = (function(event) {
          arrayBuffer = event.target.result;
          //const audioUrl = URL.createObjectURL(audioBlob);
          this.tools.context.decodeAudioData(arrayBuffer, (function(buffer){
            this.tools.buffer = buffer;
            this.setState({
              audioState:'ready',
              meta:{
                ...this.state.meta,
                endTime:(new Date()).getTime()
              }
            });
          }).bind(this));
        }).bind(this);
        fileReader.readAsArrayBuffer(audioBlob);
      // const audioUrl = URL.createObjectURL(audioBlob);
      // const audio = new Audio(audioUrl);
      // audio.play();
      });
    });
  }
  startRecording(){
    this.setState({
      audioState:'recording',
      meta:{
        startTime:(new Date()).getTime(),
        endTime:undefined
      }
    });
    this.tools.mediaRecorder.start();
  }
  stopRecording(){
    this.tools.mediaRecorder.stop();
  }
  play(){
    var source = this.tools.context.createBufferSource()
    source.buffer = this.tools.buffer;
    source.connect(this.tools.context.destination);
    this.tools.source = source;
    this.tools.source.addEventListener("ended",(function(){
      this.setState({
        audioState:'ready'
      });
    }).bind(this))
    this.setState({
      audioState:'playing'
    });
    if(this.tools.source)this.tools.source.start(0);
  }
  stop(){
    this.setState({
      audioState:'ready'
    });
    if(this.tools.source)this.tools.source.stop();
  }
  copyAudioBuffer(buffer){

    let revBuffer = this.tools.context.createBuffer(buffer.numberOfChannels,buffer.length,buffer.sampleRate);
    let array=[];
    for(let i=0;i<this.tools.buffer.numberOfChannels;i++){
      revBuffer.copyToChannel(buffer.getChannelData(i),i,0);
    }
    return revBuffer;
  }
  playReversed(){
    var source = this.tools.context.createBufferSource();
    var revBuffer = this.copyAudioBuffer(this.tools.buffer);
    Array.prototype.reverse.call(revBuffer.getChannelData(0) );
    Array.prototype.reverse.call( revBuffer.getChannelData(1) );
    source.buffer = revBuffer;
    source.connect(this.tools.context.destination);
    this.tools.source = source;
    this.tools.source.addEventListener("ended",(function(){
      this.setState({
        audioState:'ready'
      });
    }).bind(this));
    this.setState({
      audioState:'playing'
    });
    if(this.tools.source)this.tools.source.start(0);
  }
  render(){
    return (
      <div>
      <Recorder style={{display:'table',width:'auto',margin:'40vh auto'}}
      startRecording={this.startRecording.bind(this)}
      stopRecording={this.stopRecording.bind(this)}
      play={this.play.bind(this)}
      stop={this.stop.bind(this)}
      playReversed={this.playReversed.bind(this)}
      state={this.state.audioState}
      recMeta={this.state.meta}/>
      </div>
    )
  }
}

export default addNavBar(RecordPage);
