import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// TODO: pretty format date/TimeRanges
// TODO: allow edit/save name
// TODO: allow edit/save description
// TODO: method to open the suvey either now or at date/time
// TODO: method to close the survey either now or at date/time
// TODO: method to delete the survey

function ManageSurvey() {
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

  return (
    <div>
      <h2>{survey.name}</h2>
      <p>{survey.description}</p>
      <p><strong>Opens:</strong> {survey.opens_at || '<not set>'}</p>
      <p><strong>Closes:</strong> {survey.closes_at || '<not set>'}</p>
      <p><strong>Created at:</strong> {survey.created_at}</p>
      <p><strong>Last updated:</strong> {survey.updated_at}</p>
    </div>
  );
}

export default ManageSurvey;
