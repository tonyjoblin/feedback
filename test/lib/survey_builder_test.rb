require "test_helper"

class SurveyBuilderTest < ActiveSupport::TestCase
  setup do
    @survey = surveys(:one)
  end

  test "creates a new survey" do
    assert_difference("Survey.count") do
      SurveyBuilder.new.build(
        ActionController::Parameters.new(
          name: 'name',
          description: 'description',
          opens_at: '2022-03-15',
          closes_at: '2022-03-25'
        )
      )
    end
  end

  test "returns a success flag and the survey" do
    ok, survey = SurveyBuilder.new.build(
      ActionController::Parameters.new(name: 'name', description: 'description')
    )

    assert_equal true, ok
    assert_instance_of Survey, survey
  end

  test "will create questions" do
    assert_difference("Question.count") do
      created, survey = SurveyBuilder.new.build(
        ActionController::Parameters.new(
          name: 'name',
          description: 'description',
          questions: [
            {
              text: 'question text',
              order: 1
            }
          ]
        )
      )
      assert_equal 1, survey.questions.count
    end
  end
end
