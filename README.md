# SIAK PWA

PWA App for SIAK-NG, powered by [siak-rest](https://github.com/kambi-ng/siak-rest).

## Developing

1. You will need to run an instance of siak-rest, with the allowed origin of `http://localhost:5173`.
2. Create an `.env` file with the value `VITE_API_URL=SIAK_REST_INSTANCE_URL` (Example: `VITE_API_URL=http://127.0.0.1:3000`)
3. Install dependencies with `npm i`
4. Run the development server with `npm run dev`
