require "test_helper"

class SurveyTest < ActiveSupport::TestCase
  test "a survey must have a name" do
    survey_with_no_name = Survey.new
    assert_not survey_with_no_name.valid?
    assert survey_with_no_name.errors.added? :name, :blank
  end
end
