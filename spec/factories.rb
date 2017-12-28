FactoryBot.define do
  factory :item do
    user nil
    make_recipe nil
    quantity "9.99"
    name "MyText"
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
