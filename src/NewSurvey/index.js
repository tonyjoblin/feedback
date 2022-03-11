import { useNavigate } from "react-router-dom";
import SurveyForm from "../SurveyForm";

const newSurvey = {
  name: '',
  description: '',
  opens_at: null,
  closes_at: null,
}

function NewSurvey() {
  const navigate = useNavigate();

  const handleSave = (survey) => {
    fetch(
      '/surveys.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(survey),
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

  const handleCancel = () => {
    navigate('/surveys');
  }

  return (
    <SurveyForm data={newSurvey} handleSave={handleSave} handleCancel={handleCancel} />
  );
}

export default NewSurvey;
