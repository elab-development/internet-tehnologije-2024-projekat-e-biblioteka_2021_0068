import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meni from "./komponente/Meni";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pocetna from "./stranice/Pocetna";
import Knjige from "./stranice/Knjige";
import Onama from "./stranice/Onama";
import MojeKnjige from "./stranice/MojeKnjige";
import Admin from "./stranice/Admin";
import Login from "./stranice/Login";
import {Container} from "react-bootstrap";
import Footer from "./komponente/Footer";

function App() {
  return (
    <>
      <Meni />
        <div className="background" >
            <Container>
                <div className="main">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Pocetna />} />
                            <Route path="/knjige" element={<Knjige />} />
                            <Route path="/onama" element={<Onama />} />
                            <Route path="/moje-knjige" element={<MojeKnjige />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/login" element={<Login />} />

                        </Routes>
                    </BrowserRouter>
                </div>
            </Container>
        </div>

        <Footer />

    </>
  );
}

export default App;
