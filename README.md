# Tide-Pool :ocean:

## About

Tide-pool is a sandbox BRX project, built in [Typescript 4.9](https://www.typescriptlang.org) using [React 18](https://reactjs.org/).

**Noteworthy Tooling Included:**

- [Vite](https://github.com/vitejs) - Build tool and dev server
- [Redux-Toolkit](https://redux-toolkit.js.org/) - React/Redux State Management
- [TailwindCSS](https://tailwindcss.com) - CSS utilities
- [React-Map-GL](https://visgl.github.io/react-map-gl/) - React Wrapper for [Mapbox-GL](https://docs.mapbox.com/mapbox-gl-js)

## Developing

The project requires Node 18 to be installed on your local machine, refer to npm for [download instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

1. Install project dependencies

```sh
npm install
```

2. Start the Dev Server

```sh
npm run dev
```

The dev server will launch in your browser at [localhost:4444](localhost:4444) and will automatically reload as you make changes.

# tide-pool

## API Wish List

- API should support pagination by allowing the client to give a page number as a query (or body) param i.e. `page={2}`. FE doesn't need to load in all of the data and doesn't have to keep track of pagination state i.e. page number, num pages, etc... At scale (100k entries), this app will likely fail.
- API should support the ability to pass filters in request i.e. `{ 'sortBy': 'asc', 'entry_id': 'RN' }` so that the FE doesn't have to filter for these attributes when receiving data from the API.
- API should send back necessary aggregate metadata on each request like `total_area`, `num_pages`, `num_hits`, etc... so that FE doesn't have to send a separate request or manually calculate all of that.

## With more time

- Build more filters. Clearly Platform, Data Processor Organization, Approved/Rejected, country select filters could help the user dig down to cruises that are most important.
- Collapsable table row that shows the full API JSON response for that cruise with all of the fields (including ones that might've not made the table).
- Ability to see a map and the area of where the cruise took place, either via Google Maps API or another geospatial tool
- Make a nice little loading animation for the table (probably with a small timeout) to clearly indicate to the user that the app is fetching and loading new data upon each new search.
- Play around with styling to make it look nicer!
- Fix this error at the top of my component files -- spent some time on it but couldn't get rid of the compiler errors https://dequeuniversity.com/rules/axe/4.7/select-name?application=axeAPI
