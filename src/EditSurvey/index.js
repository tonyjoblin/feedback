import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SurveyForm from "../SurveyForm";

function EditSurvey() {
  const [survey, setSurvey] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch(
        `/surveys/${params.surveyId}`, {
        headers: { 'Content-Type': 'application/json' }
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

  const handleSave = (updatedSurvey) => {
    fetch(
      `/surveys/${params.surveyId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: updatedSurvey.name,
          description: updatedSurvey.description,
          opens_at: updatedSurvey.opens_at,
          closes_at: updatedSurvey.closes_at
        }),
        cache: 'no-cache'
      }).then(response => {
        if (response.ok) {
          navigate(`/surveys/${params.surveyId}`);
        } else {
          console.error(response.status);
          console.error(response.statusText);
        }
      }).catch(error => console.error(error));
  };

  const handleCancel = () => {
    navigate(`/surveys/${params.surveyId}`);
  };

  return (
    <>
      {!survey && <p>loading...</p>}
      {survey && <SurveyForm data={survey} handleSave={handleSave} handleCancel={handleCancel} />}
    </>
    
  );
}

export default EditSurvey;
