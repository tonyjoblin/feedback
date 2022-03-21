require "test_helper"

class SurveyTest < ActiveSupport::TestCase
  test "a survey must have a name" do
    survey_with_no_name = Survey.new
    assert_not survey_with_no_name.valid?
    assert survey_with_no_name.errors.added? :name, :blank
  end

  test "can create a survey with questions" do
    assert_difference("Question.count") do
      assert_difference("Survey.count") do
        Survey.create(
          name: 'name',
          description: 'description',
          questions_attributes: [
            {
              text: 'question text',
              order: 1
            }
          ]
        )
      end
    end
  end

  test "can update a survey and it's questions" do
    survey = surveys(:one)

    ok = survey.update(
      name: 'updated name',
      questions_attributes: [
        survey.questions.first.attributes.merge(text: 'updated text'),
        survey.questions.second.attributes.merge(_destroy: true),
        {
          text: 'new question',
          order: 2
        }
      ]
    )

    assert_equal true, ok
    assert_equal 'updated name', survey.name
    assert_equal 2, survey.questions.count
    assert_equal 'updated text', survey.questions.first.text
    assert_equal 'new question', survey.questions.second.text
  end
end
