class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true, on: :create
  validates :password, length: {minimum: 8}, on: :create
  validates :username, presence: true, on: :create
  validates_confirmation_of :password, on: :create
end
