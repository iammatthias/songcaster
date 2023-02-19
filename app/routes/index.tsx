import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import styles from "./styles.module.css";

// Components
import Casts from "../components/casts";

export async function loader() {
  const url = `https://www.discove.xyz/api/feeds/iammatthias/SongCaster?p=1`;
  const res = await fetch(url);
  return json(await res.json());
}

export default function Index() {
  const response = useLoaderData<typeof loader>();

  const casts = response.feed.results;

  return (
    <div className={styles.root}>
      <h1>SongCaster</h1>
      <p>Your favorite casters' favorite songs.</p>
      <Casts data={casts} />
    </div>
  );
}
