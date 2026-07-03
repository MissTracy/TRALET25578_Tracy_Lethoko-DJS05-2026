


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastDetails.module.css";
import { formatDate } from "../utils/formatDate";

export default function PodcastDetails() {
    const { id } = useParams();
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    

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
      const genreTags = podcast.genres
        .filter((genre) => genre !== "All" && genre !== "Featured")
        .map((genre) => (
            <span key={genre} className={styles.genreTag}>
            {genre}
            </span>
      ));


    //   console.log(podcast);
    //   console.log(podcast.genres);


      return (
        <main className={styles.container}>
      
          <button onClick={() => navigate(-1)}>
            ← Back to Podcasts
          </button>
      
          <section className={styles.hero}>
      
            <img
              className={styles.image}
              src={podcast.image}
              alt={podcast.title}
            />
      
            <div className={styles.content}>
      
              <h1>{podcast.title}</h1>
      
              <p>{podcast.description}</p>
      
              <div>
                <h3>Genres</h3>
                {genreTags}
              </div>
      
              <p>
                <strong>Last Updated:</strong>
                {" "}
                {formatDate(podcast.updated)}
              </p>
      
              <p>
                <strong>Total Seasons:</strong>
                {" "}
                {podcast.seasons.length}
                {" Seasons"}
             </p>
      
              <p>
                <strong>Total Episodes:</strong>
                {" "}
                {totalEpisodes}
                {" Episodes"}
              </p>
      
            </div>
      
          </section>
      
        </main>
      );
}