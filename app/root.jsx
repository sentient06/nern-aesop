import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches
} from "react-router";
import "./styles/main.scss";


export function Layout({ children }) {
  const matches = useMatches();

  const tale = matches.find(
    match => match.id === "routes/tale"
  )?.loaderData;

  const image = tale?.image;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Meta />
        <Links />
      </head>

      <body>
        <header>
          <nav>
            <Link to="/">
              <span className="tengwar page-title" translate="no">
                 
              </span>
            </Link>
            {" | "}
            <Link to="/about.html">About</Link>
          </nav>
        </header>
        <div
          className="page-background"
          style={{
            "--page-image": image
              ? `url("${image}")`
              : "none"
          }}
        >
          <main>{children}</main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
