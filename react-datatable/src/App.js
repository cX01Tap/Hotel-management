import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KeeperPage from './keeper';
import CustomerPage from './Customer';
import Navbar from './Navbar';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div>
		<Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/homepage' element={<HomePage />} />
			      <Route path='/keeper' element={<KeeperPage />} />
			      <Route path='/Customer' element={<CustomerPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
