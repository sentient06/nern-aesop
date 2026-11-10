import { Fragment } from 'react';

const makeTitle = (title, showGloss, glossTitle, translate) => {
  if (showGloss) {
    const bases = title.split(' ');
    const annotations = (
      glossTitle ?? ''
    ).split(' ');

    return (
      <h1>
      {bases.map((base, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <ruby>
            <span translate="no">
              {base.replaceAll('_', ' ')}
            </span>
            <rt translate={translate ? 'yes' : 'no'}>{annotations[i].replaceAll('_', ' ') ?? ''}</rt>
          </ruby>
        </Fragment>
      ))}
      </h1>
    );
  }
  return (
    <h1 translate={translate ? 'yes' : 'no'}>
      {title}
    </h1>
  )
};

export function TaleTextWrapper({
  title,
  paragraphs,
  extraClass,
  scriptClass,
  setHoveredSentence,
  hoveredSentence,
  gloss,
  translate
}) {
  const spanClassesArray = ['tale-text'];
  if (extraClass) spanClassesArray.push(extraClass);
  if (scriptClass) spanClassesArray.push(scriptClass);
  const spanClasses = spanClassesArray.join(' ');
  const showGloss = Boolean(gloss);

  const titleObj = makeTitle(title, showGloss, gloss?.title, translate);

  return (
    <div className={`tale-text-wrapper ${scriptClass}`}>
      {titleObj}
      {paragraphs.map((paragraph, paragraphIndex, arr) => {
        const isMoral = arr.length - 1 === paragraphIndex;
        return (
          <p key={paragraphIndex} className={isMoral ? 'moral' : ''} translate={translate ? 'yes' : undefined}>
          {paragraph.map((sentence, sentenceIndex) => {
            const id = `${paragraphIndex}-${sentenceIndex}`;

            if (showGloss) {
              const bases = sentence.split(' ');
              const annotations = (
                gloss?.paragraphs?.[paragraphIndex]?.[sentenceIndex] ?? ''
              ).split(' ');

              return (
                <span
                  key={sentenceIndex}
                  className={`${spanClasses} idx-${id} ${
                    hoveredSentence === id ? 'highlight' : ''
                  }`}
                  onMouseEnter={() => setHoveredSentence(id)}
                  onMouseLeave={() => setHoveredSentence(null)}
                  translate={translate ? 'yes' : 'no'}
                >
                  {bases.map((base, i) => (
                    <Fragment key={i}>
                      {i > 0 && ' '}
                      <ruby>
                        <span translate="no">
                          {base.replaceAll('_', ' ')}
                        </span>
                        <rt translate={translate ? 'yes' : 'no'}>
                          {annotations[i].replaceAll('_', ' ') ?? ''}
                        </rt>
                      </ruby>
                    </Fragment>
                  ))}
                </span>
              );
            }

            return (
              <span
                key={sentenceIndex}
                className={`${spanClasses} idx-${id} ${
                  hoveredSentence === id ? 'highlight' : ''
                }`}
                onMouseEnter={() => setHoveredSentence(id)}
                onMouseLeave={() => setHoveredSentence(null)}
              >
                {sentenceIndex > 0 && ' '}
                {sentence.replaceAll('_', ' ')}
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

function GlossaryLink({ href, children }) {
  if (!href) return children;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function sourceMeta(source) {
  return [source.language, source.type].filter(Boolean).join(' · ');
}

export function Glossary({ words }) {
  if (!words || words.length === 0) return null;

  return (
    <section className="glossary">
      <details>
        <summary>
          <span className="glossary-toggle">Glossary</span>
        </summary>
        <dl className="glossary-list">
        {words.map((entry) => (
          <div className="glossary-entry" key={entry.word}>
            <dt>
              <span className="glossary-word">{entry.word}</span>
              {entry.type ? (
                <span className="glossary-pos">{entry.type}</span>
              ) : null}
            </dt>
            <dd>
              {entry.meaning ? (
                <p className="glossary-meaning">{entry.meaning}</p>
              ) : null}
              {entry.comment ? (
                <p className="glossary-comment">{entry.comment}</p>
              ) : null}
              {entry.compound?.name ? (
                <p className="glossary-compound">
                  <span className="glossary-label">compound</span>
                  <GlossaryLink href={entry.compound.url}>
                    {entry.compound.name}
                  </GlossaryLink>
                </p>
              ) : null}
              {entry.sources?.length ? (
                <ul className="glossary-sources">
                  {entry.sources.map((source, index) => (
                    <li key={`${source.name}-${index}`}>
                      <span className="glossary-source-name">
                        <GlossaryLink href={source.url}>
                          {source.name}
                        </GlossaryLink>
                      </span>
                      {sourceMeta(source) ? (
                        <span className="glossary-source-meta">
                          {sourceMeta(source)}
                        </span>
                      ) : null}
                      {source.meaning ? (
                        <span className="glossary-source-meaning">
                          {source.meaning}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </div>
        ))}
        </dl>
      </details>
    </section>
  );
}
