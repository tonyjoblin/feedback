class SurveyUpdater
  def initialize(survey)
    @survey = survey
  end

  # survey_params is an ActionController::Parameters
  def update(survey_params)
    params = safe_survey_params(survey_params)
    if survey_params[:questions].present?
      params[:questions] = survey_params[:questions].map do |question_params|
        if question_params[:id].present?
          updated_question(question_params)
        else
          build_new_question(question_params)
        end
      end
    end
    @survey.update(params)
  end

  private

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
