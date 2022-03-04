class CreateSurveys < ActiveRecord::Migration[7.0]
  def change
    create_table :surveys, id: :uuid do |t|
      t.string :name, limit: 100
      t.text :description, limit: 500
      t.datetime :opens_at
      t.datetime :closes_at

      t.timestamps
    end
  end
end
