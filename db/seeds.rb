# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

if Rails.env.development?
  require 'active_record/fixtures'
  ActiveRecord::FixtureSet.create_fixtures("#{Rails.root}/test/fixtures", "surveys")
  ActiveRecord::FixtureSet.create_fixtures("#{Rails.root}/test/fixtures", "questions")
end
