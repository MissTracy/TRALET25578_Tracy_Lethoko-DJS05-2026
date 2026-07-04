

import styles from "../App.module.css";
import { genres } from "../data";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import GenreFilter from "../components/GenreFilter";
import PodcastGrid from "../components/PodcastGrid";
import Pagination from "../components/Pagination";

/**
 * Home page component.
 *
 * Displays the podcast catalogue along with search, sorting,
 * filtering, pagination, and loading/error states.
 *
 * @param {{loading: boolean, error: string | null}} props
 * @returns {JSX.Element}
 */
export default function Home({ loading, error })  {

  return (
    <>
      <Header />

        <main className={styles.main}>
          <section className={styles.controls}>
            <SearchBar />
            <GenreFilter genres={genres} />
            <SortSelect />
          </section>

          {loading && (
            <div className={styles.messageContainer}>
              <div className={styles.spinner}></div>
              <p>Loading podcasts...</p>
            </div>
          )}

          {error && (
            <div className={styles.message}>
              <div className={styles.error}>
                Error occurred while fetching podcasts: {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              <PodcastGrid genres={genres} />
              <Pagination />
            </>
          )}
        </main>
    </>
  );
}

