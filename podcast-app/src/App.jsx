import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Home from "./pages/Home";
import PodcastDetails from "./pages/PodcastDetails";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <PodcastProvider initialPodcasts={podcasts}>
      <Routes>
        <Route
          path="/"
          element={<Home loading={loading} error={error} />}
        />
        <Route
          path="/show/:id"
          element={<PodcastDetails />}
        />
      </Routes>
    </PodcastProvider>
  );
}