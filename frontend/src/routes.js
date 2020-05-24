import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileBooks from './pages/ProfileBooks';
import Friends from './pages/Friends';
import Users from './pages/Users';
import ProfileUser from './pages/ProfileUser';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/books' component={ProfileBooks}/>
                <Route path='/friends' component={Friends}/>
                <Route path='/users' component={Users}/>
                <Route path='/user/profile' component={ProfileUser}/>
            </Switch>
        </BrowserRouter>
    );
}