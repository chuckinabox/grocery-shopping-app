FactoryBot.define do
  factory :item do
    association :user, factory: :user
    association :make_recipe, factory: :make_recipe
    sequence(:quantity){ |n| n * 0.1 }
    sequence(:name){ |n| "ingredient#{n}"}
    unit "tbsp"
  end

  factory :user do
    sequence(:username) {|n| "foo#{n}" }
    sequence(:email){|n| "foo#{n}@bar.com"}
    password "abcdefghijkl"
  end
  factory :saved_recipe do
    association :user, factory: :user
    sequence(:recipe_id) {|n| 175913 + n}
  end
  factory :make_recipe do
    association :user, factory: :user
    sequence(:recipe_id) { |n| 175913 + n}
  end
end
