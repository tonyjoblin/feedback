class Survey < ApplicationRecord
  validates :name, presence: true

  has_many :questions, dependent: :destroy, autosave: true

  scope :with_questions, -> { includes(:questions).order('questions.order asc') }
end
