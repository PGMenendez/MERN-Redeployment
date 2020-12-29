import { Router } from '@reach/router';
import './App.css';
import ShowAll from './components/ShowAll';
import ShowOne from './components/ShowOne';
import Edit from './components/Edit';
import New from './components/New';




function App() {
  return (
    <div className="App">
    <Router>
      <ShowAll path="/" />
      <ShowOne path="/Projects/:id" />
      <New path="/Projects/new" />
      <Edit path="/Projects/:id/edit"/>
    </Router>
    </div>
  );
}

export default App;
