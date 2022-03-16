class Question < ApplicationRecord
  validates :text, :order, presence: true

  belongs_to :survey
end
