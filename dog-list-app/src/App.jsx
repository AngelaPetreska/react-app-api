import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <p>Dog List</p>
      <Outlet/>
    </div>
  )
}

export default App;