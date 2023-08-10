import { useContext } from 'react';
import InformationContext from '../context/InformationContext';

const Information = () => {
  const data = useContext(InformationContext);
  return (
    <>
      <div id="information-container" className="w-full h-[80vh]">
        <div
          id="information-text"
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <h1>{data.textObj.title}</h1>
          <p>{data.textObj.desc}</p>
        </div>
      </div>
    </>
  );
};

export default Information;
