import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import styled from 'styled-components';

const RecordBlock = styled.div`
position: relative;
margin: 0 auto;
max-width: ${props => props.theme.container[props.type]};
width: 100%;
display: flex;
.recordDate {
  flex: 0;
  min-width: 20%;
}
.recordMain {
  flex-grow: 1;
  aside {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }
}
`;
const Wrapper = styled.div`
& > p {
  margin-top: 0;
}
p {
  letter-spacing: -0.018em;
  line-height: 1.58;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
}
text-align: left !important;
`;
const RightCv = ({ data }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  return <Wrapper>
    <p>{data.site.siteMetadata.authorCv.shortBio[language]}</p>
    {data.site.siteMetadata.authorCv.records.map((recordCategory, i) =>
      <div key={i}>
        <h1>{recordCategory.title[language]}</h1>
        {recordCategory.list.map((record, j) =>
          <RecordBlock key={j}>
            <p className={"recordDate"}>
              {record.to ? `${record.from} — ${record.to}` : record.from}
            </p>
            <div className={"recordMain"}>
              <div>{record.title[language]}</div>
              <aside>
                <span>{record.etablishment}</span>
                <span>{record.location}</span>
              </aside>
              <p className={"recordDescription"}>
                {record.description && record.description[language]}
              </p>
            </div>
          </RecordBlock>
        )}
      </div>
    )}
  </Wrapper>
}

export default RightCv;
