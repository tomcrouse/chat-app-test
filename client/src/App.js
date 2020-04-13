import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './components/Join/Join.component'
import Chat from './components/Chat/Chat.component'
import './App.scss'

export default function App() {
    return (
        <div className="container">
            <Router>
                <Route path='/' exact component={Join} />
                <Route path='/chat' component={Chat} />
            </Router>
        </div>
    )
}
