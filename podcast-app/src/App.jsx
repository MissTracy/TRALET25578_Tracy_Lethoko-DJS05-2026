import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Home from "./pages/Home";
import PodcastDetails from "./pages/PodcastDetails";


/**
 * Root component
 *
 * Fetches the podcast preview data on initial load and provides it
 * to the app through the PodcastContext. It also defines
 * the application's routes
 *
 * @returns {JSX.Element} The root application
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all podcast previews when the app first mounts
   */
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