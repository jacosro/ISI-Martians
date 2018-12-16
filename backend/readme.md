# API description

- [API description](#api-description)
  - [URL](#url)
  - [Endpoints](#endpoints)
    - [Motherships](#motherships)
    - [Spaceships](#spaceships)
    - [Passengers](#passengers)
    - [Inspections](#inspections)

## URL
- `http://localhost:3000/api`

## Endpoints

### Motherships

Root: 
- `/motherships`

Paths:
- `/`:
  - **GET**: Gets all motherships
  - **POST**: Creates a new mothership
    - Params:
      - _id_
      - _name_ (The name of the mothership)
- `/{id}`:
  - **GET**: Gets a mothership by its id

### Spaceships

Root:
- `/spaceships`:

Paths:
- `/`:
  - **GET**: Gets all motherships
  - **POST**: Creates a new spaceship
    - Params:
      - _id_
      - _name_ (The name of the spaceship)
      - _maxPassengers_ (The number of maximum passengers of the spaceship)
      - _fromMothership_id_ (The id of the mothership from which the spaceship will take off)
      - _toMothership_id_ (The id of the mothership the spaceship will land on)
- `/{id}`:
  - **GET**: Gets a spaceship by its id
- `/{id}/getPassengers`:
  - **GET**: Gets all passengers inside the spaceship at the moment

### Passengers
Root:
- `/passengers`

Paths:
- `/`:
  - **GET**: Gets all passengers
  - **POST**: Creates a new passenger
    - Params:
      - _id_
      - _name_
      - _spaceship_id_ **(optional)**
- `/{id}`:
  - **GET**: Gets a passenger by its id
- `/{id}/board`:
  - **POST**: Embarks a passenger into a spaceship
    - Params:
      - _spaceshipId_ (The id of the spaceship)
- `/{id}/land`:
  - **POST**: Disembarks a passenger from a spaceship
    - Params:
      - _spaceshipId_ (The id of the spaceship)

### Inspections
Root:
- `/inspections`

Paths:
- `/`:
  - **GET**: Gets all motherships
  - **POST**: Creates a new inspection 
    - Params:
      - _id_
      - _inspector_ (The name of the inspector)
      - _spaceshipId_ (The id of the spaceship)
      - _passengersIds_ (An array of ids of numbers)
- `/{id}`:
  - **GET**: Gets an inspection by its id