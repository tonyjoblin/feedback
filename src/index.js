import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import SurveyList from './SurveyList';
import Survey from './Survey';
import NewSurvey from './NewSurvey';
import EditSurvey from './EditSurvey';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="surveys" element={<SurveyList />} />
          <Route path="surveys/new" element={<NewSurvey />} />
          <Route path="surveys/:surveyId" element={<Survey />} />
          <Route path="surveys/:surveyId/edit" element={<EditSurvey />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
