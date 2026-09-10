import json

file_path = "./data/favorites.json"


def read_favorites():
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data


def write_favorites(data):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)


def get_user_by_name(data, name):
    for user in data:
        if user["name"] == name:
            return user


def get_favorite_by_id(data, id):
    for favorite in data:
        if favorite["id"] == id:
            return favorite


def create_new_favorite(all_favorites, user_name):
    new_user = {"name": user_name, "favorites": []}
    all_favorites.append(new_user)
    write_favorites(all_favorites)


def update_favorite(all_favorites, new_data, user):
    user["favorites"].append(new_data)
    write_favorites(all_favorites)


def delete_favorite(all_favorites, id, user):
    user["favorites"] = [f for f in user["favorites"] if f["id"] != id]
    write_favorites(all_favorites)
