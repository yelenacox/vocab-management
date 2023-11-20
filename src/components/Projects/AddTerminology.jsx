import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTerminology.scss';
import { myContext } from '../../App';

export const AddTerminology = () => {
  const [terminology, setTerminology] = useState({});
  const { loading, setLoading, vocabUrl } = useContext(myContext);

  console.log('TERMINOLOGY: ', JSON.stringify(terminology));

  const navigate = useNavigate();

  const newTerminology = {
    codes: [
      {
        code: terminology.code,
        description: terminology.codeDescription,
      },
    ],
    name: terminology.name,
    description: terminology.description,
    url: terminology.url,
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${vocabUrl}/terminologies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTerminology),
    })
      .then(res => res.json())
      .then(() => navigate('/projects'));
  };

  return (
    <>
      <article className="form_container">
        <section>
          <form
            method="post"
            onSubmit={handleSubmit}
            className="terminology_add_form"
          >
            <fieldset>
              <div className="name">
                <label htmlFor="terminology_name">Name</label>
                <input
                  id="name"
                  className="name_input"
                  type="text"
                  value={terminology.name}
                  onChange={evt => {
                    setTerminology({
                      ...terminology,
                      name: evt.target.value,
                    });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="description">
                <label htmlFor="terminology_description">Description</label>
                <input
                  id="description"
                  className="description_input"
                  type="text"
                  value={terminology.description}
                  onChange={evt => {
                    setTerminology({
                      ...terminology,
                      description: evt.target.value,
                    });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="url">
                <label htmlFor="terminology_url">URL</label>
                <input
                  required
                  id="url"
                  className="url_input"
                  type="text"
                  value={terminology.url}
                  onChange={evt => {
                    setTerminology({
                      ...terminology,
                      url: evt.target.value,
                    });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="code">
                <label htmlFor="terminology_code">Code</label>
                <input
                  required
                  autoFocus
                  id="code"
                  className="code_input"
                  type="text"
                  value={terminology.code}
                  onChange={evt => {
                    setTerminology({ ...terminology, code: evt.target.value });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="code_description">
                <label htmlFor="terminology_code_description">
                  Code Description
                </label>
                <input
                  required
                  id="code_description"
                  className="code_description_input"
                  type="text"
                  value={terminology.codeDescription}
                  onChange={evt => {
                    setTerminology({
                      ...terminology,
                      codeDescription: evt.target.value,
                    });
                  }}
                />
              </div>
            </fieldset>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </section>
      </article>
    </>
  );
};
