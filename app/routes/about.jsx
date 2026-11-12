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
        This website is a collection of the 6th century BCE Greek fables attributed to Aesop, framed in Arda, translated into Neo-Sindarin.
      </p>
    </tale>
  );
}
