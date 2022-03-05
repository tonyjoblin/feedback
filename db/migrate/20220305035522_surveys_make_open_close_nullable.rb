class SurveysMakeOpenCloseNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :surveys, :opens_at, true
    change_column_null :surveys, :closes_at, true
  end
end
