
import React from 'react'
import {Route, Switch, BrowserRouter } from 'react-router-dom' //use Link to create links
import MainPage from 'pages/Main'
import RecordPage from 'pages/Record'
import ChoosePage from 'pages/Choose'
import GuessPage from 'pages/Guess'

class MainRouter extends React.Component{
   render(){
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/welcome"     component={MainPage}  history={this.props.history}/>
            <Route path="/record"      component={RecordPage}history={this.props.history}/>
            <Route path="/choose"      component={ChoosePage}history={this.props.history}/>
            <Route path="/re-record"   component={MainPage}  history={this.props.history}/>
            <Route path="/guess"       component={GuessPage} history={this.props.history}/>

            <Route path="/"   component={MainPage}/>1
          </Switch>
      </BrowserRouter>
    );
  }

};

export default MainRouter;
