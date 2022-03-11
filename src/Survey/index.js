import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

// TODO: pretty format date/TimeRanges
// TODO: allow edit/save name
// TODO: allow edit/save description
// TODO: method to open the suvey either now or at date/time
// TODO: method to close the survey either now or at date/time
// TODO: method to delete the survey

function SurveyDetails({ survey }) {
  return (
    <>
      <h2>{survey.name}</h2>
      <p>{survey.description}</p>
      <p>Opens at: {survey.opens_at || '<not set>'}</p>
      <p>Closes at: {survey.closes_at || '<not set>'}</p>
    </>
  );
}

function Survey() {
  const [survey, setSurvey] = useState();
  const params = useParams();
  const navigate = useNavigate();

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

  const deleteSurvey = () => {
    fetch(
      `/surveys/${params.surveyId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }).then(response => {
        if (response.ok) {
          navigate('/surveys');
        } else {
          console.error(response.status);
          console.error(response.statusText);
        }
      }).catch(error => console.error(error));
  };

  return (
    <div>
      {survey && (
        <>
          <Link to={`/surveys/${params.surveyId}/edit`} >Edit</Link>
          <SurveyDetails survey={survey} />
          <input type="button" onClick={deleteSurvey} value="Delete survey" />
        </>)}
      {!survey && (<><p>Something went wrong, we don't have a survey here!</p></>)}
    </div>
  );
}

export default Survey;
