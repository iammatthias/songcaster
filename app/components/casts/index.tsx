import { Spotify } from "react-spotify-embed";
import styles from "./styles.module.css";

export default function Casts({ data }: any) {
  const casts = data.map(
    (cast: {
      username: string;
      hash: string;
      published_at: string;
      og: any;
    }) => {
      return {
        username: cast.username,
        hash: cast.hash,
        published_at: cast.published_at,
        urls: cast.og.urls,
      };
    }
  );

  const renderCasts = casts.map((cast: any) => {
    const renderCastUrls = cast.urls.map((url: any) => {
      if (url.url.includes("open.spotify")) {
        return (
          <div key={url.url}>
            <Spotify wide link={url.url} />
          </div>
        );
      } else if (url.url.includes("music.apple")) {
        return (
          <div key={url.url}>
            <iframe
              allow='autoplay *; encrypted-media *;'
              className={styles.appleMusicEmbed}
              frameBorder='0'
              sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation'
              src={url.url.replace("https://", "https://embed.")}
            />
          </div>
        );
      } else if (url.url.includes("tidal.com/browse")) {
        return (
          <div key={url.url}>
            <p>{url.url}</p>
          </div>
        );
      } else {
        return null;
      }
    });

    const published_at = new Date(cast.published_at).toLocaleDateString(
      "en-US"
    );

    return (
      <div key={cast.hash}>
        <div className={styles.meta}>
          <h3>{cast.username}</h3>
          <p>{published_at}</p>
        </div>

        {renderCastUrls}
      </div>
    );
  });

  return <div className={styles.grid}>{renderCasts}</div>;
}
