import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import TextInput from '../TextInput';

// TODO: pretty format date/TimeRanges
// TODO: allow edit/save name
// TODO: allow edit/save description
// TODO: method to open the suvey either now or at date/time
// TODO: method to close the survey either now or at date/time
// TODO: method to delete the survey

function SurveyForm({ survey, handleUpdate }) {
  return (
    <form>
      <fieldset>
        <h2>
          <label htmlFor="name"><strong>Survey Name:</strong> </label>
          <TextInput
            value={survey.name}
            placeholder="Write a name for the survey"
            name="name"
            size="60"
            onChange={e => handleUpdate('name', e.target.value)}
            />
        </h2>
        <p>
          <label htmlFor="description"><strong>Description:</strong> </label>
          <TextInput
            value={survey.description}
            placeholder="Write a description for the survey"
            name="description"
            size="60"
            onChange={e => handleUpdate('description', e.target.value)}
            />
        </p>
        <p><strong>Opens:</strong> {survey.opens_at || '<not set>'}</p>
        <p><strong>Closes:</strong> {survey.closes_at || '<not set>'}</p>
        <p><strong>Created at:</strong> {survey.created_at}</p>
        <p><strong>Last updated:</strong> {survey.updated_at}</p>
      </fieldset>
    </form>
  );
}

function Survey() {
  const [survey, setSurvey] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch(
        `/surveys/${params.surveyId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      const data = await response.json();
      if (response.ok) {
        setSurvey(data);
      } else {
        console.error(response.status);
        console.error(response.statusText);
        console.error(data);
      }
    };
    fetchSurveys().catch(console.error);
  }, [params.surveyId]);

  const updateSurvey = (key, value) => {
    const updatedSurvey = { ...survey, [key]: value };
    fetch(
      `/surveys/${params.surveyId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: updatedSurvey.name,
          description: updatedSurvey.description
        }),
        cache: 'no-cache'
      }).then(response => {
        if (response.ok) {
          setSurvey(updatedSurvey);
        } else {
          console.error(response.status);
          console.error(response.statusText);
        }
      }).catch(error => console.error(error));
  }

  return (
    <div>
      {survey && (<SurveyForm survey={survey} handleUpdate={updateSurvey} />)}
      {!survey && (<><p>Something went wrong, we don't have a survey here!</p></>)}
    </div>
  );
}

export default Survey;
