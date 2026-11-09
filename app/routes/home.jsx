import { Link } from "react-router";
import { listTales } from "../lib/tales.server.js";

export function meta() {
  return [
    { title: "Home | My Website" },
    {
      name: "description",
      content: "Browse all tales."
    }
  ];
}

export async function loader() {
  return listTales();
}

export default function Home({ loaderData }) {
  return (
    <>
      <h1>Sindarin Aesop</h1>
      <p>Choose an tale to read.</p>

      <ul>
        {loaderData.map(tale => (
          <li key={tale.id}>
            <Link to={`/tale-${tale.id}.html`}>
              {tale.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
