import { useEffect, useState } from 'react';

function Survey({ data }) {
  return (
    <secion>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
    </secion>
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
        console.log(data);
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
      {surveys && surveys.map(survey => <Survey data={survey} />)}
      {!surveys && <p>No surveys, how sad</p>}
    </div>
  );
}

export default SurveyList;
