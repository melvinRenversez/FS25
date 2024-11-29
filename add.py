import json

file_path = "data.json"

def load_data():
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_data(data):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def display_data():
    data = load_data()
    if data:
        print("\nListe des éléments existants :")
        for item in data:
           print(   f"ID: {item['id']}\n"
                    f"Nom: {item['name']}\n"
                    f"Image: {item['image']}\n"
                    f"Prix: {item['price']} centimes\n"
                    f"Mois: {item['month']}\n"
                    f"Courbe: {item['courbe']}\n")

    else:
        print("\nAucun élément trouvé.")

def add_item():
    data = load_data()
    
    # Saisie des informations par l'utilisateur
    name = input("Entrez le nom : ")
    price = input("Entrez le prix (en centimes, ex: 2750 pour 27,50€) : ")
    month = input("Entrez le mois : ")
    
    
    # Vérification des doublons
    if any(item['name'].lower() == name.lower() for item in data):
        print("Un élément avec ce nom existe déjà.")
        return

    # Création d'un nouvel élément
    new_item = {
        "id": data[-1]['id'] + 1 if data else 1,  # Gestion des IDs
        "name": name,
        "image": "img/"+ name + "png",
        "price": int(price),  # Conversion en entier
        "month": month,
        "courbe": "courbe/"+ name + ".jpg"
    }

    # Ajout aux données existantes
    data.append(new_item)
    save_data(data)
    print(f"L'élément a été ajouté avec succès ! (ID: {new_item['id']})")

def delete_item():
    data = load_data()
    if not data:
        print("Aucun élément à supprimer.")
        return

    try:
        item_id = int(input("Entrez l'ID de l'élément à supprimer : "))
        item_to_delete = next((item for item in data if item['id'] == item_id), None)

        if item_to_delete:
            data.remove(item_to_delete)
            save_data(data)
            print(f"L'élément avec l'ID {item_id} a été supprimé.")
        else:
            print(f"Aucun élément trouvé avec l'ID {item_id}.")
    except ValueError:
        print("Veuillez entrer un ID valide.")

def main():
    while True:
        print("\nOptions :")
        print("1. Afficher les éléments")
        print("2. Ajouter un élément")
        print("3. Supprimer un élément par ID")
        print("4. Quitter")

        choice = input("Choisissez une option : ")

        if choice == "1":
            display_data()
        elif choice == "2":
            add_item()
        elif choice == "3":
            delete_item()
        elif choice == "4":
            break
        else:
            print("Option invalide. Essayez à nouveau.")

if __name__ == "__main__":
    main()
