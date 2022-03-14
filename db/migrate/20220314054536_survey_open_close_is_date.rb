class SurveyOpenCloseIsDate < ActiveRecord::Migration[7.0]
  def change
    change_column :surveys, :opens_at, :date
    change_column :surveys, :closes_at, :date
  end
end
