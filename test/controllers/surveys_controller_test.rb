require "test_helper"

class SurveysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @survey = surveys(:one)
  end

  test "should get index" do
    get surveys_url, as: :json
    assert_response :success
  end

  test "should create survey" do
    assert_difference("Survey.count") do
      post surveys_url, params: { survey: { closes_at: @survey.closes_at, description: @survey.description, name: @survey.name, opens_at: @survey.opens_at } }, as: :json
    end

    assert_response :created
  end

  test "should show survey" do
    get survey_url(@survey), as: :json
    assert_response :success
  end

  test "should update survey" do
    patch survey_url(@survey), params: { survey: { closes_at: @survey.closes_at, description: @survey.description, name: @survey.name, opens_at: @survey.opens_at } }, as: :json
    assert_response :success
  end

  test "should destroy survey" do
    assert_difference("Survey.count", -1) do
      delete survey_url(@survey), as: :json
    end

    assert_response :no_content
  end
end
