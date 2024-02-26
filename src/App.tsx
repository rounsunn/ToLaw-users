import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import { ProfilePage } from "./routes/ProfilePage";
import { Home } from "./routes/Home";
import Search from "./routes/Search";
import BookNow from "./components/BookNow";
import "./App.css";
import AiAssist from "./routes/AiAssist";
import Template from "./routes/Template";
import Footer from "./components/Footer";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  return (
    <Router>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="lawyers">
          <Route path=":_id" element={<ProfilePage />} />
        </Route>
        <Route path="search">
          <Route index element={<Search />} />
          <Route path="book">
            <Route path=":_id" element={<BookNow />}/>
          </Route>
        </Route>
        <Route path="aiassist" element={<AiAssist />} />
        <Route path="templates" element={<Template />}/>
        <Route path="/payment/success" element={<Success />} />
        <Route path="/payment/canceled" element={<Cancel />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
