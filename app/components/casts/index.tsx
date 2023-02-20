import { Link } from "@remix-run/react";
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
        urls: cast.og.urls || [],
      };
    }
  );

  const renderCasts = casts.map((cast: any) => {
    const renderCastUrls = cast.urls.map((url: any) => {
      if (url.url.includes("open.spotify")) {
        return (
          <div key={url.url}>
            <iframe
              src={`${url.url.replace("spotify.com/", "spotify.com/embed/")}`}
              className={styles.spotifyEmbed}
              frameBorder='0'
              allow='autoplay; encrypted-media;'
              loading='lazy'
            />
            <p>{url.url}</p>
          </div>
        );
      } else if (url.url.includes("music.apple")) {
        return (
          <div key={url.url}>
            <iframe
              src={url.url.replace("https://", "https://embed.")}
              className={styles.appleMusicEmbed}
              frameBorder='0'
              allow='autoplay; encrypted-media;'
              loading='lazy'
            />
            <p>{url.url}</p>
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

    if (cast.urls.length > 0) {
      return (
        <div key={cast.hash}>
          <div className={styles.meta}>
            <h3>
              <a href={`https://www.discove.xyz/@${cast.username}`}>
                @{cast.username}
              </a>
            </h3>

            <p>{published_at}</p>
          </div>

          {renderCastUrls}
          <div className={styles.viewOnDiscove}>
            <a href={`https://www.discove.xyz/casts/${cast.hash}`}>
              View Cast on Discove
            </a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  });

  return <div className={styles.grid}>{renderCasts}</div>;
}
