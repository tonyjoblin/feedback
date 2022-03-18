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
    assert_difference("Question.count") do
      assert_difference("Survey.count") do
        post(
          surveys_url,
          params: {
            survey: {
              description: @survey.description,
              name: @survey.name,
              questions: [
                {
                  text: 'question text',
                  order: 1
                }
              ]
            }
          },
          as: :json
        )
      end
    end

    assert_response :created
  end

  test "should show survey" do
    get survey_url(@survey), as: :json
    assert_response :success
  end

  test "show should show questions" do
    get survey_url(@survey), as: :json
    assert_match 'On a scale of 1-5 how are you feeling about work overall right now?', @response.body
    assert_match 'On a scale of 1-5 how are you feeling about your wellbeing right now?', @response.body
  end

  test "survey questions should be in order" do
    get survey_url(@survey), as: :json

    response_survey = JSON.parse(@response.body)
    assert_equal 1, response_survey['questions'][0]['order']
    assert_equal 2, response_survey['questions'][1]['order']
  end

  test "should update survey" do
    first_question = questions(:one)
    second_question = questions(:two)
    patch(
      survey_url(@survey),
      params: {
        survey: {
          closes_at: @survey.closes_at,
          description: @survey.description,
          name: @survey.name,
          opens_at: @survey.opens_at,
          questions: [
            first_question.attributes.merge(text: 'updated text'),
            second_question.attributes
          ]
        }
      },
      as: :json
    )
    assert_response :success
  end

  test "should destroy survey" do
    assert_difference("Survey.count", -1) do
      delete survey_url(@survey), as: :json
    end

    assert_response :no_content
  end

  test "destroy should destroy questions" do
    assert_difference("Question.count", -2) do
      delete survey_url(@survey), as: :json
    end

    assert_response :no_content
  end
end
