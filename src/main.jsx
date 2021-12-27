import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/App.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import GameContextProvider from "./contexts/GameContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
