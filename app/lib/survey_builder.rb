class SurveyBuilder
  # survey_params is a ActionController::Parameters
  def build(survey_params)
    survey = Survey.new(safe_survey_params(survey_params))
    if survey_params[:questions].present?
      survey_params[:questions].each do |question|
        survey.questions.build safe_question_params(question)
      end
    end
    [survey.save, survey]
  end

  private

  def safe_question_params(question_params)
    question_params.permit(:text, :subtext, :instructions, :order)
  end

  def safe_survey_params(survey_params)
    survey_params.permit(:name, :description, :opens_at, :closes_at)
  end
end
