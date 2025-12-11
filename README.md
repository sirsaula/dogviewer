
---


# Dog Viewer 🐶

Web app that fetches random dog images from the [Dog CEO API](https://dog.ceo/dog-api/) and then allows you to

- Browse a set of random dog pictures   
- Select a main image from thumbnails
- On Hover enlarges the image 
- Build and manage a list of favorites  

Built with Vite for a fast dev experience and simple deployment.

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ (recommended)  
- **npm**: v9+ (or whatever ships with your Node version)

You can check your versions with:

```bash
node -v
npm -v


### Install Dependencies

From the project root dog-viewer

```bash
npm install
```


### Run the App in Development

```bash
npm run dev
```

Vite will:

* Start a dev server (typically on `http://localhost:5173`)


## Architecture & Design Decisions

### 1. Separation of Concerns

* **Page vs. Components**:

  * `DogViewer` (in `src/pages`) is the smart/container component:

    * Fetches data
    * Holds UI state
    * Orchestrates interactions between smaller components
  * `MainImage`, `Thumb`, and `Favorites` (in `src/components`) are presentational:

    * Stateless UI building blocks
    * Receive data via props
    * Communicate changes via callbacks
* **Utilities**:

  * `dogApi.ts` separates the HTTP calls and data transformations:

    * If the API base URL, response structure, or fetching strategy changes only this file needs to be updated
    * The UI is only concerned with `Dog[]` array and does not know about the underlying API shape

### 2. Local State Instead of Global State

* All app state lives in the `DogViewer` page component:
  * No Redux, Zustand, or Context needed for an app of this size to reduce the complexity
  * If the app grows a global store or React Context could be added later without breaking the existing components

### 3. Simple Data Model

* The `Dog` type is intentionally minimal:

  * `url` → what image to show
  * `breed` → display-friendly breed name parsed from the URL
* Parsing the breed from the image URL:
  * Avoids extra API calls

### 4. Error Handling & Loading States

* Booleans and nullable strings (`isLoading`, `errorMessage`) are used for simple state management
* Allows the UI to clearly represent:

  * Loading state
  * Error message when fetch fails
  * Normal state when data is loaded
* This separation keeps the render logic clear and easy to extend 

### 6. Accessibility Considerations

* Thumbnails and controls are implemented using `<button>` elements and `aria-label` attributes where appropriate
* Images include `alt` text based on the parsed breed
* This improves keyboard navigation and screen reader support with almost no extra complexity


