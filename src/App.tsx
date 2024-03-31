import GenerateMap from './components/GenerateMap/GenerateMap'

// styles
import g from "./App.module.scss";

const App = () =>  {
 
  return (

    <>
        <header>
          <div className={g.headerContainer}>
            OceanTempMap
          </div>
        </header>
        <main>
          <GenerateMap />
        </main>
        <footer className={g.footerContainer}>
            <p className={g.title}>2024</p>
        </footer>
    </>
   
  )
}

export default App;