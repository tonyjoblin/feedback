import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// #TODO: method to create a new survey

function Survey({ data }) {
  return (
    <section>
      <h3><Link to={`/surveys/${data.id}`}>{data.name}</Link></h3>
      <p>{data.description}</p>
    </section>
  )
}

function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch(
        '/surveys', {
          headers: { 
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSurveys(data);
      } else {
        console.error(response.status);
        console.error(response.statusText);
        console.error(data);
      }
    };
    fetchSurveys().catch(console.error);
  }, []);

  return (
    <div>
      <h2>Survey List</h2>
      {surveys && surveys.map(survey => <Survey key={survey.id} data={survey} />)}
      {!surveys && <p>No surveys, how sad</p>}
    </div>
  );
}

export default SurveyList;
