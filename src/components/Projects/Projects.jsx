import { useContext, useEffect, useState } from 'react';
import './Projects.scss';
import { myContext } from '../../App';
import Background from '../../../assets/Background.png';
import { TerminologyList } from './Terminologies/TerminologyList';
import { TableList } from './Tables/TableList';
import { DDList } from './DataDictionaries/DDList';
import { StudyList } from './Studies/StudyList';

export const Projects = () => {
  const { loading, setLoading } = useContext(myContext);

  return (
    <>
      <div className="projects_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <div>
          <StudyList />
        </div>
        <div>
          <DDList />
        </div>
        <div>
          <TableList />
        </div>
        <div>
          <TerminologyList />
        </div>
      </div>
    </>
  );
};
