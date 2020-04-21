import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Landing from './components/Landing'
import Header from './components/Header'
import Entry from './components/Entry'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Route exact path='/' component={Landing}/>
                <Route exact path='/entry' component={Entry}/>
            </div>
        )
    }
}

export default App