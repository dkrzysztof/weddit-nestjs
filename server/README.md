# Aplikacja wspomagająca organizowanie imprez weselnych - **Wedding Planner**

## Wprowadzenie
### Wymagania

#### Wymagania funkcjonalne
- użytkownik może się zalogować,
- uzytkownik może się zarejestrować,
- użytkownik może edytować swój profil,
- użytkownik może usunąć swój profil,
- użytkownik może utworzyć plany wesel,
- użytkownik może oglądać lub edytować udostępnione mu plany wesel,
- użytkownik może uzupełnić podstawowe informacje o weselu takie jak data, czy będą wyprawiane poprawiny, informacje podstawowe o zaproszonych gościach, rodzaj wynajętej obsługi,
- użytkownik może dodać maksymalny budżet przeznaczony na wyprawienie wesela,
- użytkownik uzyska informację i ilości wybranej do zakupienia rodzaju trunków,
- użytkownik będzie uzyskiwał informację o pozostałym do wykorzystania budżecie
- użytkownik zostanie poinformowany o przekroczeniu budżetu,
- użytkownik może dodać listę zadań, ich terminy realizacji oraz dane osoby odpowiedzialnej za nadzór tego zadania,
- użytkownik może utworzyć plan sali weselnej,
- użytkownik może przypisać gości do wybranych miejsc przy stolikach,

#### Wymagania niefunkcjonalne
- System w zamiarze ma być ergonomiczny w użyciu,
- Krótki czas wdrożenia do obsługi aplikacji,
- Średni czas odpowiedzi aplikacji serwerowej ma być przeciętny, 
- System będzie napisany w oparciu o architekturę RESTful,
- Część serwerowa będzie uruchamiana na środowisku `Nodejs`,
- Aplikacja kliencka będzie stworzona przy pomocy biblioteki `React.js`,
- System do będzie wykorzystywał tokeny "JSON Web Token" w celu bezpiecznej komunikacji aplikacji serwerowej z aplikacją kliencką,


## Przydatne instrukcje 

#### Generowanie migracji

```
typeorm migration:generate -n PostRefactoring
```

#### Uruchamianie migracji
```
typeorm migration:run
```

#### Utworznie migracji (nalezy samemu wygenerowac kwerende)

```
typeorm migration:create -n PostRefactoring
```