# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171231053928) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "make_recipe_id"
    t.decimal "quantity"
    t.text "name", null: false
    t.boolean "check", default: false, null: false
    t.text "unit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["make_recipe_id"], name: "index_items_on_make_recipe_id"
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "make_recipes", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_make_recipes_on_user_id"
  end

  create_table "saved_recipes", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "recipe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_saved_recipes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "items", "make_recipes"
  add_foreign_key "items", "users"
  add_foreign_key "make_recipes", "users"
  add_foreign_key "saved_recipes", "users"
end
