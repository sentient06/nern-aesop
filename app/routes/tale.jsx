import { useState } from 'react';
import { getTale } from "../lib/tales.server.js";
import { GreekSection, EnglishSection, SindarinSection, RefSection, RadioGroup, Glossary } from "../components/tale";

export async function loader({ params }) {
  const match = /^tale-(\d+)\.html$/.exec(
    params.filename ?? ""
  );

  if (!match) {
    throw new Response("Not found", { status: 404 });
  }

  return getTale(match[1]);
}

export function meta({ data }) {
  return [
    { title: data?.title ?? "Tale" },
    {
      name: "description",
      content: data?.description ?? ""
    }
  ];
}

export default function Tale({ loaderData }) {
  const tale = loaderData;

  const {
    greek,
    english,
    sindarin,
    chambry,
    perry
  } = tale;

  const [showGreek, setShowGreek] = useState('en');

  const handleChange = (event) => {
    setShowGreek(event.target.value);
  };

  const [hoveredSentence, setHoveredSentence] = useState(null);

  return (
    <div className="page-wrapper">
      <div className="tale-wrapper">
        <div className="tale-group">
          <RadioGroup
            groupname="showGreekText"
            varname={showGreek}
            handleChange={handleChange}
            options={[
              { value: 'gr', label: 'Greek' },
              { value: 'en', label: 'English' }
            ]}
          />
          { showGreek === 'gr' ? (
            <GreekSection
              {...greek.original}
              setHoveredSentence={setHoveredSentence}
              hoveredSentence={hoveredSentence}
            />
          ) : (
            <EnglishSection
              {...english.translation}
              setHoveredSentence={setHoveredSentence}
              hoveredSentence={hoveredSentence}
            />
          )}
        </div>
        <div className="tale-group">
          <SindarinSection
            {...sindarin}
            setHoveredSentence={setHoveredSentence}
            hoveredSentence={hoveredSentence}
          />
        </div>
        <div className="tale-image">
        </div>
      </div>
      <Glossary
        words={sindarin.glossary}
      />
      <RefSection
        chambry={chambry}
        perry={perry}
      />
    </div>
  );
}
