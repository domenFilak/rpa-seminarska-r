import bcrypt

# Geslo, ki ga želimo šifrirati
password = 'test'

# Generiranje "soli" in šifriranje gesla
salt = bcrypt.gensalt(rounds=10)  # rounds določa, koliko časa bo trajalo generiranje hasha
encrypted_password = bcrypt.hashpw(password.encode('utf-8'), salt)
print(encrypted_password)
print(f"Šifrirano geslo: {encrypted_password.decode('utf-8')}")

# Preverjanje, če geslo ustreza shranjenemu hashu
if bcrypt.checkpw(password.encode('utf-8'), encrypted_password):
    print("Geslo se ujema!")
else:
    print("Geslo se ne ujema.")
