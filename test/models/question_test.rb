require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  test "a question must have text" do
    question = Question.new
    assert_not question.valid?
    assert question.errors.added? :text, :blank
  end

  test "a question must have an order text" do
    question = Question.new
    assert_not question.valid?
    assert question.errors.added? :order, :blank
  end
end
