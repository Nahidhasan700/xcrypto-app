import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './componants/Header';
import Home from './componants/Home';
import Coins from './componants/Coins';
import Exchanges from './componants/Exchanges';
import CoinDetails from './componants/CoinDetails';
import Footer from "./componants/Footer";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins' element={<Coins />} />
        <Route path='/exchanges' element={<Exchanges />} />
        <Route path='/coin/:id' element={<CoinDetails />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
