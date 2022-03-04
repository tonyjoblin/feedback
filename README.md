# Feedback webapp

## About

A feedback survey website that asks users a series of questions. Users typically
answer by selecting a value on a scale that represents how strongly they agree
with the posed question. Users may also be allowed free text responses.

## TODO

- list survey
- create survey
- edit survey
- delete survey
- copy survey
- add question
- delete question
- reorder questions
- edit question
- take survey page
- record survey answers
- survey results page
- users module, add survey author role
- restrict survey management to survey owner
- management of access to survey results
- allow survey to be invite only
- manage access to survey (open, close, expire links)
- scripts to seed dev environment
- survey respondent demographics (country, postcode, age band, sex, education, occupation)

## API

/survey
/survey/{id}
/survey/{id}/response/{id}
/survey/{id}/results

## Tables

surveys
- id
- name
- description
- owner
- opens_at
- closes_at

survey_invites
- survey_id
- email
- ???

question
- id
- text
- type {free type, agreement, multi choice}

choices
- question_id
- text

response
- id
- survey_id
- submitted
- user

answer
- id
- question_id
- response

respondee_demographics
- response_id
- demographics ???

## UI Routes

TODO