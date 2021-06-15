# Server explorer

## Requirements

- Node v12.13.0 (LTS)

## Project instalation

- create a copy of the `.env.examle` file and add the `API_URL` key
- use `npm start` to start the development server
- use `npm run build` to create a minified bundle for production

## Known issues

- there are some issues on IE11 due to the fact that tailwind.css uses css vars which cannot be properly shimmed
- there is an console error when running tests due to the fact `HTMLFormElement.prototype.submit` is not implemented in `react-testing-library`

## TODOS

- increase test coverage
