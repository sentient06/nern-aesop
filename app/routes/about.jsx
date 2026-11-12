export function meta() {
  return [
    { title: "Nern Aesop | About" },
    {
      name: "description",
      content: "About this website."
    }
  ];
}

export default function About() {
  return (
    <tale>
      <h1>About</h1>
      <p>
        This website is built using React Router,
        static HTML generation and JSON files.
      </p>
    </tale>
  );
}
