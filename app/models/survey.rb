class Survey < ApplicationRecord
  validates :name, presence: true

  has_many :questions, dependent: :destroy, autosave: true

  accepts_nested_attributes_for :questions, allow_destroy: true

  scope :with_questions, -> { includes(:questions).order('questions.order asc') }
end
