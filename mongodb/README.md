# Podatkovna baza MongoDB

Podatkovna baza je ustvarjena s pomočjo MongoDB verzija 8.0.3

## Kako prekopirati bazo v lokalno okolje

### 1. Korak
	- MongoDB Command Line Database Tools Download ==> MSI installer   https://www.mongodb.com/try/download/bi-connector

### 2. Korak
	- Pojdi pod lokacijo MongoDB instalacije (C:/...), mapo tools in pojdi v bin ==> kopiraj pot
	- Dodaj novo spremeljivko pod PATH od SYSTEM VARIABLES ==> funkcija za okoljske spremenljivke v Win 10

### 3. Korak
	- odpreš bash v mapi kjer želiš shraniti vnose
	- shranis v to mapo z ukazom: mongodump --db=imePodatkovneBaze --out=potDoMapeKamorŽelišShranitiVnose


## Kako shraniti bazo v svoj MongoDB

### 1. Korak
	- dodas z ukazom: mongorestore --db=imePodatkovneBaze potKjerImasShranjeneVnose
												

