class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions, id: :uuid do |t|
      t.string :text, null: false
      t.string :subtext
      t.string :instructions
      t.integer :order, null: false
      t.timestamps
    end

    # rubocop:disable Rails/NotNullColumn
    add_reference :questions, :survey, foreign_key: true, type: :uuid, null: false
    # rubocop:enable Rails/NotNullColumn
  end
end
