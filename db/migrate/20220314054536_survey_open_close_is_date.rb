class SurveyOpenCloseIsDate < ActiveRecord::Migration[7.0]
  def up
    change_table :surveys, bulk: true do |t|
      t.change :surveys, :opens_at, :date
      t.change :surveys, :closes_at, :date
    end
  end

  def down
    change_table :surveys, bulk: true do |t|
      t.change :surveys, :opens_at, :datetime
      t.change :surveys, :closes_at, :datetime
    end
  end
end
