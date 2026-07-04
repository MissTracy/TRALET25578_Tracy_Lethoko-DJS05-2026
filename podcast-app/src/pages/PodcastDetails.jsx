

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastDetails.module.css";
import { formatDate } from "../utils/formatDate";
import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { genres } from "../data";

export default function PodcastDetails() {
    const { id } = useParams();
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { allPodcasts } = useContext(PodcastContext);
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(null);
 
    

    useEffect(() => {
        async function fetchPodcast() {
          try {
            const response = await fetch(
              `https://podcast-api.netlify.app/id/${id}`
            );
      
            if (!response.ok) {
              throw new Error("Failed to fetch podcast.");
            }
      
            const data = await response.json();
            setPodcast(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
      
        fetchPodcast();
      }, [id]);

      if (loading) {
        return <p>Loading podcast...</p>;
      }
      
      if (error) {
        return <p>{error}</p>;
      }
      
      if (!podcast) {
        return <p>Podcast not found.</p>;
      }

      const totalEpisodes = podcast.seasons.reduce(
        (total, season) => total + season.episodes.length,
        0
      );

      const previewPodcast = allPodcasts.find(
        (p) => p.id === podcast.id
      );


      console.log("Podcast:", podcast);
      console.log("4j:", podcast.genres);
      console.log("Keys:", Object.keys(podcast));


      return (
        <main className={styles.container}>
      
          <button  className={styles.backButton} onClick={() => navigate(-1)}>
            ←
          </button>

          <section className={styles.hero}>

            <img
                src={podcast.image}
                alt={podcast.title}
                className={styles.cover}
            />

            <div className={styles.info}>
                <h1 className={styles.title}>{podcast.title}</h1>

                <p className={styles.description}>
                {podcast.description}
                </p>

                <div className={styles.metaGrid}>

                <div>
                    <p className={styles.label}>Genres</p>

                    <div className={styles.genreContainer}>
                    {(previewPodcast?.genres || []).map((genreId) => {
                        const genre = genres.find((g) => g.id === genreId);

                        return (
                        <span key={genreId} className={styles.genreTag}>
                            {genre?.title}
                        </span>
                        );
                    })}
                    </div>

                    
                </div>

                <div>
                    <p className={styles.label}>Last Updated</p>
                    <strong>{formatDate(podcast.updated)}</strong>
                </div>

                <div>
                    <p className={styles.label}>Total Seasons</p>
                    <strong>{podcast.seasons.length} Seasons</strong>
                </div>

                <div>
                    <p className={styles.label}>Total Episodes</p>
                    <strong>{totalEpisodes} Episodes</strong>
                </div>

                </div>
            </div>
            </section>  
            <section className={styles.seasons}>
            <div className={styles.seasonHeader}>
              <h2>Current Seasons</h2>

              <select
                value={selectedSeasonIndex ?? ""}
                onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
              >
                <option value="">Select a season</option>

                {podcast.seasons.map((season, index) => (
                  <option key={season.season} value={index}>
                    {season.title}
                  </option>
                ))}
              </select>
            </div>

            {podcast.seasons.map((season, index) => (
              <div key={season.season}>

                <div
                  className={styles.seasonCard}
                  onClick={() =>
                    setSelectedSeasonIndex(
                      selectedSeasonIndex === index ? null : index
                    )
                  }
                >
                  <img
                    src={season.image}
                    alt={season.title}
                    className={styles.seasonImage}
                  />

                  <div>
                    <h3 className={styles.seasonTitle}>
                      {season.title}</h3>
                    <p>{season.episodes.length} Episodes</p>
                  </div>
                </div>

              {selectedSeasonIndex === index && (
                <div className={styles.episodeList}>
                  {season.episodes.map((episode) => (
                    <div key={episode.episode} className={styles.episodeCard}>
                      <img
                        src={season.image}
                        alt={season.title}
                        className={styles.episodeImage}
                      />

                      <div>
                        <h4  className={styles.episodeTitle}>
                          Episode {episode.episode}: {episode.title}
                        </h4>

                        <p>
                          {episode.description.length > 150
                            ? episode.description.slice(0, 150) + "..."
                            : episode.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
                         
        </main>
      );
}