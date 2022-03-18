class SurveyUpdater
  def initialize(survey)
    @survey = survey
  end

  # survey_params is an ActionController::Parameters
  def update(survey_params)
    params = safe_survey_params(survey_params)
    params[:questions] = build_questions(survey_params[:questions]) if survey_params[:questions].present?
    @survey.update(params)
  end

  private

  def build_questions(questions)
    questions.map do |params|
      params[:id].present? ? updated_question(params) : build_new_question(params)
    end
  end

  def updated_question(question_params)
    question = @survey.questions.find(question_params[:id])
    question.update(safe_question_params(question_params))
    question
  end

  def build_new_question(question_params)
    Question.new(safe_question_params(question_params))
  end

  def safe_question_params(question_params)
    question_params.permit(:text, :subtext, :instructions, :order)
  end

  def safe_survey_params(survey_params)
    survey_params.permit(:name, :description, :opens_at, :closes_at)
  end
end
