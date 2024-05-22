# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_05_22_083438) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "difficulties", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gender_high_notes", force: :cascade do |t|
    t.bigint "gender_id", null: false
    t.bigint "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gender_id", "note_id"], name: "index_gender_high_notes_on_gender_id_and_note_id", unique: true
    t.index ["gender_id"], name: "index_gender_high_notes_on_gender_id"
    t.index ["note_id"], name: "index_gender_high_notes_on_note_id"
  end

  create_table "gender_low_notes", force: :cascade do |t|
    t.bigint "gender_id", null: false
    t.bigint "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gender_id", "note_id"], name: "index_gender_low_notes_on_gender_id_and_note_id", unique: true
    t.index ["gender_id"], name: "index_gender_low_notes_on_gender_id"
    t.index ["note_id"], name: "index_gender_low_notes_on_note_id"
  end

  create_table "genders", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "modes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.integer "frequency"
    t.string "ja_note_name"
    t.string "en_note_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "scores", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "mode_id", null: false
    t.bigint "difficulty_id", null: false
    t.integer "score", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["difficulty_id"], name: "index_scores_on_difficulty_id"
    t.index ["mode_id"], name: "index_scores_on_mode_id"
    t.index ["user_id", "mode_id", "difficulty_id"], name: "index_scores_on_user_id_and_mode_id_and_difficulty_id", unique: true
    t.index ["user_id"], name: "index_scores_on_user_id"
  end

  create_table "user_high_notes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["note_id"], name: "index_user_high_notes_on_note_id"
    t.index ["user_id"], name: "index_user_high_notes_on_user_id"
  end

  create_table "user_low_notes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["note_id"], name: "index_user_low_notes_on_note_id"
    t.index ["user_id"], name: "index_user_low_notes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "gender_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["gender_id"], name: "index_users_on_gender_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "gender_high_notes", "genders"
  add_foreign_key "gender_high_notes", "notes"
  add_foreign_key "gender_low_notes", "genders"
  add_foreign_key "gender_low_notes", "notes"
  add_foreign_key "scores", "difficulties"
  add_foreign_key "scores", "modes"
  add_foreign_key "scores", "users"
  add_foreign_key "user_high_notes", "notes"
  add_foreign_key "user_high_notes", "users"
  add_foreign_key "user_low_notes", "notes"
  add_foreign_key "user_low_notes", "users"
  add_foreign_key "users", "genders"
end
