import { useState } from 'react';
import { getTale } from "../lib/tales.server.js";
import { findWordsInGlossary } from "../lib/glossary.server.js";
import { RefSection, RadioGroup, Glossary } from "../components/utils";
import { GreekSection, EnglishSection, SindarinSection } from "../components/taleGroups";

export async function loader({ params }) {
  const match = /^tale-(\d+)\.html$/.exec(
    params.filename ?? ""
  );

  if (!match) {
    throw new Response("Not found", { status: 404 });
  }

  const tale = await getTale(match[1]);
  const words = await findWordsInGlossary(tale.sindarin?.glossary ?? []);

  return { ...tale, words };
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
    perry,
    words
  } = tale;

  const [showGreek, setShowGreek] = useState('en');

  const handleChange = (event) => {
    setShowGreek(event.target.value);
  };

  const [hoveredSentence, setHoveredSentence] = useState(null);

  return (
    <div className="page-wrapper">
      <div className="tale-wrapper">
        <div className="tale-columns">
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
        </div>
        <div className="tale-image">
        </div>
      </div>
      <Glossary
        words={words}
      />
      <RefSection
        chambry={chambry}
        perry={perry}
      />
    </div>
  );
}
