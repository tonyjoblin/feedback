class SurveysMakeNameNotNull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :surveys, :name, false
  end
end
