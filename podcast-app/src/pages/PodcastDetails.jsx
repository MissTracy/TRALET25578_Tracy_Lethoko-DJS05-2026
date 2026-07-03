


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./PodcastDetails.module.css";

export default function PodcastDetails() {
    const { id } = useParams();
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

      return (
        <main className={styles.container}>
          <section className={styles.hero}>
            <img
              className={styles.image}
              src={podcast.image}
              alt={podcast.title}
            />
      
            <div className={styles.content}>
              <h1 className={styles.title}>{podcast.title}</h1>
      
              <p>{podcast.description}</p>
      
              <p>
                <strong>Seasons:</strong> {podcast.seasons.length}
              </p>
            </div>
          </section>
        </main>
      );
}