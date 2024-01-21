import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import { ProfilePage } from "./routes/ProfilePage";
import { Home } from "./routes/Home";
import Search from "./routes/Search";
import BookNow from "./components/BookNow";
import "./App.css";
import AiAssist from "./routes/AiAssist";

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
        <Route path="templates" />
      </Routes>
    </Router>
  );
}

export default App;
