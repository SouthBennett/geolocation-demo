# What's Around Me - Project Plan

## Project Goal

Create a React application that uses the browser's geolocation API to determine the user's location and display nearby places based on a selected category.

The application will be built incrementally and hosted as a frontend-only application.

---

# User Story 1 - Get User Location

## Description

As a user, I want to share my location so the application can find places near me.

## Acceptance Criteria

* A "Use My Location" button is displayed.
* Clicking the button requests location permission from the browser.
* If permission is granted, the user's latitude and longitude are stored in state.
* A success message is displayed when the location is retrieved.
* An error message is displayed if permission is denied or location retrieval fails.

---

# User Story 2 - Select a Category

## Description

As a user, I want to choose what type of place I am looking for.

## Acceptance Criteria

* Category buttons are displayed.
* Categories include:

  * Restaurants
  * Cafes
  * Parks
  * Shops
* Only one category can be selected at a time.
* The selected category is visually highlighted.

---

# User Story 3 - Retrieve Nearby Places

## Description

As a user, I want to see nearby places based on my selected category.

## Acceptance Criteria

* A search is performed after a category is selected.
* The search uses the user's current coordinates.
* Nearby places are returned from an external API.
* Results are stored in React state.
* An empty-state message is displayed if no results are found.

---

# User Story 4 - Display Places

## Description

As a user, I want nearby places displayed in a readable format.

## Acceptance Criteria

* Results are displayed in a list.
* Each result is rendered using a BusinessCard component.
* Each card displays:

  * Business name
  * Category
* Cards are generated dynamically from API data.

---

# User Story 5 - Loading and Error States

## Description

As a user, I want feedback while data is loading or when something goes wrong.

## Acceptance Criteria

* A loading indicator is displayed while searching.
* API errors are handled gracefully.
* User-friendly error messages are displayed.

---

# User Story 6 - Map Display (Stretch Goal)

## Description

As a user, I want to view nearby places on a map.

## Acceptance Criteria

* A map component is displayed.
* User location is shown on the map.
* Nearby places are represented by markers.
* Clicking a marker displays information about the place.

---

# Component Responsibilities

## App

* Owns application state
* Coordinates communication between components

## Header

* Displays application title

## LocationButton

* Requests user location

## CategoryButtons

* Displays available categories
* Handles category selection

## BusinessList

* Renders collection of businesses
* Maps business data to BusinessCard components

## BusinessCard

* Displays a single business

## Map

* Displays location and markers (future enhancement)

---

# Definition of Done (MVP)

The project is considered complete when:

* User can obtain their location.
* User can select a category.
* Nearby places are retrieved from an API.
* Results are displayed using BusinessCard components.
* Loading and error states are handled.
* Application runs locally without errors.
* Application is deployable to GitHub Pages.
