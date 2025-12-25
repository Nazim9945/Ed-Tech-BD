import { Route, Routes} from "react-router";
import HomePage from "./Pages/HomePage";



function App(){
  return (
    <main className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </main>
  );
}
export default App;
