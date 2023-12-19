import { useContext, useEffect, useState } from 'react';
import './Projects.scss';
import { myContext } from '../../App';
import { Spinner } from '../Manager/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../../assets/Background.png';
import { DeleteTerminology } from './Terminologies/DeleteTerminology';
import { TerminologyList } from './Terminologies/TerminologyList';
import { TableList } from './Tables/TableList';

export const Projects = () => {
  const { loading, setLoading } = useContext(myContext);

  return (
    <>
      <div className="projects_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
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
