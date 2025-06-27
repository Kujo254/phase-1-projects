# Gift Idea Generator 🎁

## Author
Kurui Joshua

## Description
The Gift Idea Generator is a simple and interactive web application built with HTML, CSS, and JavaScript. It allows users to select an occasion and age group, then fetches and displays personalized gift ideas based on those inputs. Users can save their favorite gift suggestions and toggle between light and dark mode.

This app fetches data from a local `json-server`, using asynchronous `fetch()` calls and renders content dynamically with DOM manipulation.

## Features
- Select occasion and age group to get tailored gift ideas
- Save your favorite gift suggestions
- Clear saved list
- Responsive UI with Dark Mode toggle
- Runs entirely on a single page with no redirects
- Uses `json-server` to mock backend API

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Kujo254/phase-1-Project.git
   cd phase-1-Project/Phase-1-Project
   ```

2. Install `json-server` globally if not already installed:
   ```bash
   npm install -g json-server
   ```

3. Start the JSON server:
   ```bash
   npx json-server --watch db.json
   ```

4. Open `index.html` in your browser to use the app.

## Live Demo
[View on GitHub Pages](https://kujo254.github.io/phase-1-Project/Phase-1-Project)

## License
This project is licensed under the MIT License.

© 2025 Kurui Joshua