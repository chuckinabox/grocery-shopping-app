FactoryBot.define do
  factory :user do
    sequence(:username) {|n| "foo#{n}" }
    sequence(:email){|n| "foo#{n}@bar.com"}
    password "abcdefghijkl"
  end
end
