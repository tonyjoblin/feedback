import { useState } from 'react';

// TODO: validate presence and min length of name
// TODO: validate description
// TODO: handle opens at
// TODO: handle closes at

function SurveyForm({ data, handleSave, handleCancel }) {
  const [survey, setSurvey] = useState(data);

  const handleUpdateName = (event) => {
    setSurvey({ ...survey, name: event.target.value });
  };

  const handleUpdateDescription = (event) => {
    setSurvey({ ...survey, description: event.target.value });
  };

  const handleUpdateOpensAt = (event) => {
    setSurvey({
      ...survey,
      opens_at: event.target.value,
      closes_at: event.target.value === '' ? '' : survey.closes_at
    })
  }

  const handleUpdateClosesAt = (event) => {
    setSurvey({ ...survey, closes_at: event.target.value });
  };

  const onSave = () => handleSave(survey);
  const onCancel = () => handleCancel();

  return (
    <form>
      <fieldset>
        <p>
          <label htmlFor="name">Survey Name:</label><br/>
          <input
            type='text'
            value={survey.name}
            placeholder="Write a name for the survey"
            name="name"
            size="60"
            onChange={handleUpdateName}
            />
        </p>
        <p>
          <label htmlFor="description">Description:</label><br/>
          <textarea
            type='text'
            value={survey.description}
            placeholder="Write a description for the survey"
            name="description"
            cols="100"
            rows="6"
            onChange={handleUpdateDescription}
            />
        </p>
        <p>
          <label htmlFor="opens">Opens at:</label><br/>
          <input
            type="date"
            value={survey.opens_at || ''}
            onChange={handleUpdateOpensAt}
            />
        </p>
        {survey.opens_at &&
          <p>
            <label htmlFor="closes">Closes at:</label><br/>
            <input
              type="date"
              value={survey.closes_at || ''}
              onChange={handleUpdateClosesAt}
              />
          </p>
        }
      </fieldset>
      <input type="button" onClick={onCancel} value="Cancel" /> {' '}
      <input type="button" onClick={onSave} value="Save" />
    </form>
  );
}

export default SurveyForm;
