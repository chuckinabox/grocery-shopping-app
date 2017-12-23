FactoryBot.define do
  factory :user do
    sequence(:username) {|n| "foo#{n}" }
    sequence(:email){|n| "foo#{n}@bar.com"}
    password "abcdefghijkl"
  end
  factory :saved_recipe do
    association :user, factory: :user
    recipe_ids [1, 2, 3]
  end
end
