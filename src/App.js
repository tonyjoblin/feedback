import { Link, Outlet } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Survey webapp</h1>
      </header>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
        >
        <Link to="/">Home</Link> | {' '}
        <Link to="/surveys">Surveys</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
