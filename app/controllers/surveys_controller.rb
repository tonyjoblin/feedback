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
    saved, @survey = SurveyBuilder.new.build(required_params)

    if saved
      render json: @survey, status: :created, location: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /surveys/1
  def update
    if SurveyUpdater.new(@survey).update(required_params)
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

  def required_params
    params.require(:survey)
  end
end
