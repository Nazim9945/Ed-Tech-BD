import { Route, Routes} from "react-router";
import HomePage from "./Pages/HomePage";
import LoginPage from "./components/LoginPage";



function App(){
  return (
    <main className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
      {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </main>
  );
}
export default App;
