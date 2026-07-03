

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PodcastDetails from "./pages/PodcastDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show/:id" element={<PodcastDetails />} />
    </Routes>
  );
}