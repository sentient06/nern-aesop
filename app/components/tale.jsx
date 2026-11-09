import { useState } from 'react';

function DefaultText({ title, paragraphs, extraClass, scriptClass, setHoveredSentence, hoveredSentence }) {
  const spanClassesArray = ['tale-text'];
  if (extraClass) spanClassesArray.push(extraClass);
  if (scriptClass) spanClassesArray.push(scriptClass);
  const spanClasses = spanClassesArray.join(' ');

  return (
    <div className={`tale-text-wrapper ${scriptClass}`}>
      <h1>
        {title}
      </h1>
      {paragraphs.map((paragraph, paragraphIndex, arr) => {
        const isMoral = arr.length - 1 === paragraphIndex;
        return (
          <p key={paragraphIndex} className={isMoral ? 'moral' : ''}>
          {paragraph.map((sentence, sentenceIndex) => {
            const id = `${paragraphIndex}-${sentenceIndex}`;

            return (
              <span
                key={sentenceIndex}
                className={`${spanClasses} idx-${id} ${
                  hoveredSentence === id ? 'highlight' : ''
                }`}
                onMouseEnter={() => setHoveredSentence(id)}
                onMouseLeave={() => setHoveredSentence(null)}
              >
                {sentence}
              </span>
            );
          })}
          </p>
        );
      })}
    </div>
  );
}


export function RadioSelector({ checked, handleChange, name, value, label }) {
  return (
    <label>
      <input 
        type="radio" 
        name={name}
        value={value} 
        checked={checked}
        onChange={handleChange} 
      /> {label}
    </label>
  );
}

export function RadioGroup({ varname, groupname, handleChange, options }) {
  return (
    <div className="radio-group">
      {options.map((option, idx) => (
        <RadioSelector
          checked={varname === option.value} 
          handleChange={handleChange}
          name={groupname} 
          value={option.value}
          label={option.label}
          key={`radio-group-${groupname}-${idx}`}
        />
      ))}
    </div>
  );
}

export function GreekSection({ title, paragraphs, setHoveredSentence, hoveredSentence }) {
  return (
    <div className="tale-box">
      <DefaultText
        title={title}
        paragraphs={paragraphs}
        setHoveredSentence={setHoveredSentence}
        hoveredSentence={hoveredSentence}
      />
    </div>
  );
}

export function EnglishSection({ title, paragraphs, setHoveredSentence, hoveredSentence }) {
  return (
    <div className="tale-box">
      <DefaultText
        title={title}
        paragraphs={paragraphs}
        setHoveredSentence={setHoveredSentence}
        hoveredSentence={hoveredSentence}
      />
    </div>
  );
}

export function SindarinSection({
  transliteration,
  roman,
  tengwar,
  beleriand,
  setHoveredSentence,
  hoveredSentence
}) {
  const [scriptType, setScriptType] = useState('beleriand');
  const [showGloss, setShowGloss] = useState('true');

  const handleChangeScript = (event) => {
    setScriptType(event.target.value);
  };

  const handleToggleGloss = (event) => {
    setShowGloss(event.target.value);
  };

  return (
    <>
      <RadioGroup
        groupname="scriptType"
        varname={scriptType}
        handleChange={handleChangeScript}
        options={[
          { value: 'beleriand', label: 'Beleriand' },
          { value: 'tengwar', label: 'Tengwar' },
          { value: 'roman', label: 'Roman' }
        ]}
      />
      <div className="tale-box">
        { scriptType === 'beleriand' && (
          <DefaultText
            title={beleriand.title}
            paragraphs={beleriand.paragraphs}
            extraClass="beleriand"
            scriptClass="tengwar"
            setHoveredSentence={setHoveredSentence}
            hoveredSentence={hoveredSentence}
          />
        )}
        { scriptType === 'tengwar' && (
          <DefaultText
            title={tengwar.title}
            paragraphs={tengwar.paragraphs}
            extraClass="tengwar"
            scriptClass="tengwar"
            setHoveredSentence={setHoveredSentence}
            hoveredSentence={hoveredSentence}
          />
        )}
        { scriptType === 'roman' && (
          <DefaultText
            title={roman.title}
            paragraphs={roman.paragraphs}
            extraClass="roman"
            setHoveredSentence={setHoveredSentence}
            hoveredSentence={hoveredSentence}
          />
        )}
      </div>
    </>
  );
}

export function RefSection({ chambry, perry }) {
  return (
    <div class="reference">
      <ul>
        <li>
          Chambry {chambry}
        </li>
        <li>
          Perry {perry}
        </li>
      </ul>
    </div>
  );
}

export function Glossary({ words }) {
  if (words.length === 0) return null;
  return (
    <div class="glossary">
      <ul>
      { words.map((word) => {
        return (
          <li>
            {word}
          </li>
        );
      })}
      </ul>
    </div>
  );
}
