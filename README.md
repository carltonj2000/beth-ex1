# beth-ex1

Fullstack dev with

- B un : javascript runner and packager
- E lysia : web server framework
- T urso: db
- H TMX : front end framework. And HyperScript companion

```bash
bun run --watch --hot index.tsx
bunx drizzle-kit push:sqlite
bunx tailwindcss -i ./src/input.css -o ./src/tyles.css --watch
docker build -t carltonj2000/beth-ex1 .
docker run -evn-file .env -d -p 3000:3000 carltonj2000/beth-ex1
# for debug below. replace enterypoint with /bin/sh and start manually
docker run --env-file .env -p 3000:3000 carltonj2000/beth-ex1
```

## Code History

The code in this repository is based on the
[The BETH Stack: Build Hypermedia-Driven Web Apps with Great DX and Performance](https://youtu.be/cpzowDDJj24?si=SE5Qvf3WLgcbW5IH)
video.

## Creation History

```bash
cd /renderws/carltonData/cj2024/code/beth/beth-ex1/
bun init
bun add elysia
bun run --watch index.ts
bun add @elysiajs/html
bun add -d typed-html # update tsconfig
```

Db related stuff. Install turso cli first.

```bash
turso db create beth-ex1-db
turso db show beth-ex1-db
turso db tokens create beth-ex1-db
```

Db ORM setup.

```bash
bun add drizzle-orm @libsql/client
bun add -d drizzle-kit
bunx drizzle-kit push:sqlite
bunx drizzle-kit studio
```

Tailwind CSS CLI setup.

```bash
bun install -d tailwindcss
bunx tailwindcss init
bunx tailwindcss -i ./src/input.css -o ./src/tyles.css --watch
```
