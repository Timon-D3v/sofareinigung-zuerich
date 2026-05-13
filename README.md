# sofareinigung-zuerich

Codebase for **sofareinigung-zuerich.ch** — a website for on-site sofa & upholstery cleaning in Zurich and surrounding areas.

> Project status: **Done / Completed** ✅

---

## Overview

This repository contains the server + website implementation for **Sofareinigung Zürich**.

Core messaging used on the homepage:

- **Professionell** – Reinigung einer gelernten Fachkraft  
- **Vor Ort** – Wir kommen zu Ihnen (Zürich & Umgebung)  
- **Nachhaltig** – Reinigen statt neu kaufen  

The site guides visitors through:
- What sofa/upholstery cleaning is and why it matters
- A “how it works” section (Sprüh-Extraktion / Waschsauger)
- Before/after comparisons
- Contact form (with image upload)
- Reviews/comments workflow

---

## Tech Stack

- **Node.js** (ESM / `"type": "module"`)
- **Express** (web server)
- **EJS** (templating)
- **MySQL** (data storage: comments, editable options)
- **File uploads** via `multer` (e.g. contact images, profile pictures)
- **Sessions** via `express-session`
- **Email** via Mailjet (`node-mailjet`)
- **Auth/Hashing** via `bcrypt`
- **Docker** (containerization)
- **Dev setup** via Docker Compose (+ `nodemon`)

---

## Requirements

- Node.js + npm  
  **or**
- Docker / Docker Compose

---

## Getting Started (Node)

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

---

## Development (Docker Compose + Nodemon)

A dev environment uses Docker Compose for dependencies (MySQL + DelivAPI) and `nodemon` for hot-reload.

Start dev stack + app watcher:

```bash
npm run dev
```

The compose file used for development (as provided) includes:

- MySQL (`mysql:8.0.43`) exposed on `8081`
- DelivAPI (`timond3v/delivapi:2.0.0`) exposed on `8082`
- A dedicated bridge network with fixed IPs

---

## Docker (Application Image)

Build image:

```bash
npm run docker:build
```

Run container (requires a `docker.env` file):

```bash
npm run docker:run
```

Stop container:

```bash
npm run docker:stop
```

Tag & push:

```bash
npm run docker:tag
npm run docker:push
```

Multi-arch buildx:

```bash
npm run docker:buildx
npm run docker:buildx:push
```

Docker image:
- `timond3v/sofareinigung-zuerich`

---

## Configuration (Environment Variables)

Create an environment file (e.g. `.env` / `docker.env`) with the following variables:

```dotenv
# Environment
ENV="dev" # dev or prod
PORT=8080
HOST="0.0.0.0"

# Session
SESSION_SECRET_KEY=<Random Hash>

# MySQL
MYSQL_HOST=<MySQL host>
MYSQL_USER="root"
MYSQL_PW=<database-password>
MYSQL_DB="zaki"
MYSQL_PORT=8081

# Mailjet
MAILJET_PUBLIC_KEY=<mailjet key>
MAILJET_PRIVATE_KEY=<mailjet key>

# DelivAPI Token
DELIVAPI_URL=<delivapi endpoint>
DELIVAPI_USER=<delivapi user>
DELIVAPI_KEY=<delivapi key>

# Origin
ORIGIN=<origin>

# HTTPS Settings
HTTPS_ACTIVE="true"
HTTPS_PORT=8083
HTTPS_CERT_PASSPHRASE=<https cert passphrase>
```

Notes:
- `ENV` switches between dev/prod behavior.
- Configure `ORIGIN` properly (important for CORS / session behavior depending on implementation).
- HTTPS variables are required if HTTPS is enabled in your runtime configuration.

---

## Database Setup (MySQL)

Create schema:

```sql
CREATE SCHEMA `zaki` ;
```

### `comments` table

```sql
CREATE TABLE `zaki`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `family_name` VARCHAR(45) NOT NULL,
  `review` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL DEFAULT '/img/logo.jpg',
  `date` VARCHAR(45) NOT NULL,
  `rating` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
COMMENT = 'This table holds all the comments for the website sofareinigung-zuerich.ch';
```

Apply the recommended alterations:

```sql
ALTER TABLE `zaki`.`comments` 
CHANGE COLUMN `email` `email` VARCHAR(128) NOT NULL ,
CHANGE COLUMN `name` `name` VARCHAR(32) NOT NULL ,
CHANGE COLUMN `family_name` `family_name` VARCHAR(64) NOT NULL ,
CHANGE COLUMN `review` `review` VARCHAR(4096) NOT NULL ,
CHANGE COLUMN `image` `image` VARCHAR(1024) NOT NULL DEFAULT '/img/logo.jpg' ,
CHANGE COLUMN `date` `date` DATE NOT NULL ,
CHANGE COLUMN `rating` `rating` INT NOT NULL ;
```

### `options` table

```sql
CREATE TABLE `zaki`.`options` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` LONGTEXT NOT NULL,
  `value` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
COMMENT = 'This table holds all the information that needs to be able to be changed.';
```

---

## Content / Copy (Homepage)

Example text blocks used:

- Hero: “Ihr Spezialist für die Reinigung von Sofas und Polstern vor Ort”
- Explanation section: why cleaning matters, how spray-extraction works, pricing guidance
- Contact section: request includes sofa dimensions + at least one photo

(These texts are stored/served from the project content configuration depending on implementation.)

---

## License

MIT — see `LICENSE` (if present in the repository) or the package metadata.

---

## Author

**Timon Fiedler**  
Repository: `Timon-D3v/sofareinigung-zuerich`