class SurveysController < ApplicationController
  before_action :set_survey, only: %i[show update destroy]

  # GET /surveys
  def index
    @surveys = Survey.all

    render json: @surveys
  end

  # GET /surveys/1
  def show
    render json: serialize_survey
  end

  # POST /surveys
  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      render json: @survey, status: :created, location: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /surveys/1
  def update
    if @survey.update(survey_params)
      render json: serialize_survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # DELETE /surveys/1
  def destroy
    @survey.destroy
  end

  private

  def serialize_survey
    @survey.serializable_hash(include: :questions)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_survey
    @survey = Survey.with_questions.find(params[:id])
  end

  def survey_params
    params.require(:survey).permit(
      :name,
      :description,
      :opens_at,
      :closes_at,
      questions: [:text, :subtext, :instructions, :order]
    ).transform_keys { |key| key == 'questions' ? 'questions_attributes' : key }
  end
end
