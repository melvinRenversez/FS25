import json

# Chemin vers le fichier JSON
file_path = "data.json"

# Fonction pour charger les données depuis le fichier JSON
def load_data():
    try:
        with open(file_path, "r") as f:
            return json.load(f)  # Charger les données JSON existantes
    except FileNotFoundError:
        return []  # Si le fichier n'existe pas, on crée une liste vide

# Fonction pour sauvegarder les données dans le fichier JSON
def save_data(data):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)  # Sauvegarder les données avec une indentation

# Fonction pour ajouter un élément
def add_item():
    data = load_data()  # Charger les données actuelles

    # Demander les informations à l'utilisateur
    nom = input("Entrez le nom : ")
    lien = input("Entrez le lien : ")
    image = input("Entrez le chemin de l'image : ")

    # Créer un nouvel élément avec un id unique
    new_item = {
        "id": data[-1]['id'] + 1 if data else 1,  # Si data n'est pas vide, l'ID sera basé sur le dernier élément + 1, sinon l'ID sera 1
        "nom": nom,
        "lien": "pages/" + lien + "/" + lien,
        "image": image
    }

    # Ajouter le nouvel élément aux données existantes
    data.append(new_item)

    # Sauvegarder les données mises à jour
    save_data(data)

    print(f"L'élément a été ajouté avec succès ! (ID: {new_item['id']})")

# Fonction pour supprimer un élément par ID
def delete_item():
    data = load_data()  # Charger les données actuelles

    try:
        item_id = int(input("Entrez l'ID de l'élément à supprimer : "))
        
        # Trouver l'élément avec l'ID
        item_to_delete = next((item for item in data if item['id'] == item_id), None)
        
        if item_to_delete:
            data.remove(item_to_delete)  # Supprimer l'élément trouvé
            save_data(data)  # Sauvegarder les données mises à jour
            print(f"L'élément avec l'ID {item_id} a été supprimé.")
        else:
            print(f"Aucun élément trouvé avec l'ID {item_id}.")
    
    except ValueError:
        print("Veuillez entrer un ID valide.")

# Menu principal
def main():
    while True:
        print("\nOptions :")
        print("1. Ajouter un élément")
        print("2. Supprimer un élément par ID")
        print("3. Quitter")

        choice = input("Choisissez une option : ")

        if choice == "1":
            add_item()  # Ajouter un élément
        elif choice == "2":
            delete_item()  # Supprimer un élément par ID
        elif choice == "3":
            break  # Quitter le programme
        else:
            print("Option invalide. Essayez à nouveau.")

if __name__ == "__main__":
    main()
