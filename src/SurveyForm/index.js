import { useState } from 'react';

// TODO: validate presence and min length of name
// TODO: validate description
// TODO: handle opens at
// TODO: handle closes at

function SurveyForm({ data, handleSave, handleCancel }) {
  const [survey, setSurvey] = useState(data);

  const handleUpdate = (key, value) => {
    const updatedSurvey = { ...survey, [key]: value };
    setSurvey(updatedSurvey);
  }

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
            onChange={e => handleUpdate('name', e.target.value)}
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
            onChange={e => handleUpdate('description', e.target.value)}
            />
        </p>
        <p>
          <label htmlFor="opens">Opens at:</label><br/>
          {survey.opens_at || '<not set>'}
        </p>
        <p>
          <label htmlFor="closes">Closes at:</label><br/>
          {survey.closes_at || '<not set>'}
        </p>
      </fieldset>
      <input type="button" onClick={onCancel} value="Cancel" /> {' '}
      <input type="button" onClick={onSave} value="Save" />
    </form>
  );
}

export default SurveyForm;