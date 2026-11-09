import { index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.jsx"),
  route("about.html", "./routes/about.jsx"),
  route(":filename", "./routes/tale.jsx")
];
