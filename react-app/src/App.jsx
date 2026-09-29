import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import HealthBar from './HealthBar'
import CharacterInfo from './characterInfo'

function App() {

  return (
    <>
      <CharacterInfo
      name={"Lexa"}
      characterClass={"unemployed"}
      lvl={20}
      weapon = {"didlo"}
      />

      <HealthBar maxHealth = {100}/>
       
    </>
  )
}

export default App


