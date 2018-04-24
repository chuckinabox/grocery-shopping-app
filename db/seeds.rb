# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'foo', password: 'password', email: 'foo@bar.com')
5.times do |n|
  SavedRecipe.create(user: User.first, recipe_id: 1176096 + n)
end
