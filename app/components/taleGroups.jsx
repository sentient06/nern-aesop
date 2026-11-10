import { useState } from "react";
import { TaleTextWrapper } from "./utils";
import { RadioGroup } from "./utils";

export function GreekSection({ title, paragraphs, setHoveredSentence, hoveredSentence }) {
    return (
      <div className="tale-box">
        <TaleTextWrapper
          title={title}
          paragraphs={paragraphs}
          setHoveredSentence={setHoveredSentence}
          hoveredSentence={hoveredSentence}
          translate={false}
        />
      </div>
    );
  }
  
  export function EnglishSection({ title, paragraphs, setHoveredSentence, hoveredSentence }) {
    return (
      <div className="tale-box">
        <TaleTextWrapper
          title={title}
          paragraphs={paragraphs}
          setHoveredSentence={setHoveredSentence}
          hoveredSentence={hoveredSentence}
          translate={true}
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
  
    const handleChangeScript = (event) => {
      setScriptType(event.target.value);
    };
  
    return (
      <>
        <RadioGroup
          groupname="scriptType"
          varname={scriptType}
          handleChange={handleChangeScript}
          options={[
            { value: 'beleriand', label: 'Tengwar Beleriand' },
            { value: 'tengwar', label: 'Tengwar' },
            { value: 'roman', label: 'Roman' },
            { value: 'gloss', label: 'Transliteration' }
          ]}
        />
        <div className="tale-box">
          { scriptType === 'beleriand' && (
            <TaleTextWrapper
              title={beleriand.title}
              paragraphs={beleriand.paragraphs}
              extraClass="beleriand"
              scriptClass="tengwar"
              setHoveredSentence={setHoveredSentence}
              hoveredSentence={hoveredSentence}
              translate={false}
            />
          )}
          { scriptType === 'tengwar' && (
            <TaleTextWrapper
              title={tengwar.title}
              paragraphs={tengwar.paragraphs}
              extraClass="tengwar"
              scriptClass="tengwar"
              setHoveredSentence={setHoveredSentence}
              hoveredSentence={hoveredSentence}
              translate={false}
            />
          )}
          { scriptType === 'roman' && (
            <TaleTextWrapper
              title={roman.title}
              paragraphs={roman.paragraphs}
              extraClass="roman"
              setHoveredSentence={setHoveredSentence}
              hoveredSentence={hoveredSentence}
              translate={false}
            />
          )}
          { scriptType === 'gloss' && (
            <TaleTextWrapper
              title={roman.title}
              paragraphs={roman.paragraphs}
              extraClass="roman"
              setHoveredSentence={setHoveredSentence}
              hoveredSentence={hoveredSentence}
              gloss={transliteration}   
              translate={true}
            />
          )}
        </div>
      </>
    );
  }