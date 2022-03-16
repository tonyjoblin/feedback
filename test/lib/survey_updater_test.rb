require "test_helper"

class SurveyBuilderTest < ActiveSupport::TestCase
  setup do
    @survey = surveys(:one)
  end

  test "should update survey" do
    updated = SurveyUpdater.new(@survey).update(
      ActionController::Parameters.new(
        closes_at: @survey.closes_at,
        description: @survey.description,
        name: @survey.name,
        opens_at: @survey.opens_at
      )
    )
    assert updated
  end

  test "update can update existing questions" do
    first_question = questions(:one)
    second_question = questions(:two)
    assert_difference("Question.count", 0) do
      SurveyUpdater.new(@survey).update(
        ActionController::Parameters.new(
          closes_at: @survey.closes_at,
          description: @survey.description,
          name: @survey.name,
          opens_at: @survey.opens_at,
          questions: [
            first_question.attributes.merge(text: 'updated text'),
            second_question.attributes
          ]
        )
      )
    end
    @survey.reload
    assert_equal 'updated text', @survey.questions.order(order: :asc).first.text
    assert_equal 2, @survey.questions.count
  end

  test "update can create new questions" do
    first_question = questions(:one)
    second_question = questions(:two)
    assert_difference("Question.count", 1) do
      SurveyUpdater.new(@survey).update(
        ActionController::Parameters.new(
          closes_at: @survey.closes_at,
          description: @survey.description,
          name: @survey.name,
          opens_at: @survey.opens_at,
          questions: [
            first_question.attributes,
            second_question.attributes,
            {
              text: 'new question',
              order: 3
            }
          ]
        )
      )
    end
    assert_equal 'new question', @survey.questions.order(order: :asc).third.text
    assert_equal 3, @survey.questions.count
  end

  test "update can delete questions" do
    first_question = questions(:one)
    assert_difference("Question.count", -1) do
      SurveyUpdater.new(@survey).update(
        ActionController::Parameters.new(
          closes_at: @survey.closes_at,
          description: @survey.description,
          name: @survey.name,
          opens_at: @survey.opens_at,
          questions: [
            first_question.attributes
          ]
        )
      )
    end
    assert_equal first_question.text, @survey.questions.order(order: :asc).first.text
    assert_equal 1, @survey.questions.count
  end
end
