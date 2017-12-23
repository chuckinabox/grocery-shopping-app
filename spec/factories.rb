FactoryBot.define do
  factory :user do
    sequence(:username) {|n| "foo#{n}" }
    sequence(:email){|n| "foo#{n}@bar.com"}
    password "abcdefghijkl"
  end
  factory :saved_recipe do
    association :user, factory: :user
    sequence(:recipe_id) {|n| n}
  end
  factory :make_recipe do
    association :user, factory: :user
    sequence(:recipe_id) {|n| n}
  end
end
