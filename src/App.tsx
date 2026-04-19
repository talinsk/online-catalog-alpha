import './App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      {!isHomePage && (
        <nav>
          <Link to="/">Вернуться на главную</Link>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;