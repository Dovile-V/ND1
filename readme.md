# Restoranų rekomendacijų sistema

## Projekto aprašymas
Tai MERN modeliu sukurta restoranų rekomendacijų web aplikacija. 
Projektą sudaro viešas restoranų puslapis, React administravimo sistema 
ir MongoDB duomenų bazė.

Vartotojai gali:
- peržiūrėti restoranus,
- filtruoti pagal miestus,
- ieškoti restoranų,
- matyti detalų restorano puslapį su žemėlapiu,
- siūlyti naujus restoranus.

Administratorius gali:
- prisijungti prie admin sistemos,
- kurti restoranus,
- redaguoti restoranus,
- trinti restoranus,
- peržiūrėti lankytojų pasiūlymus.

---

# Projekto funkcijos

## Vieša puslapio dalis
- Restoranų kortelės
- Filtravimas pagal miestą
- Restoranų paieška
- Responsive dizainas
- Tamsi tema
- Restoranų detalus puslapis
- Google Maps žemėlapis
- Restoranų rekomendacijų lentelė
- Forma restoranų pasiūlymui

## Admin sistema
- Prisijungimas
- Restoranų kūrimas
- Restoranų redagavimas
- Restoranų trynimas
- Pasiūlymų peržiūra
- CRUD operacijos

---

# Naudotos technologijos

## Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap
- React
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

# Projekto struktūra

## Vieša puslapio dalis
- client/
  - index.html
  - rekomendacijos.html
  - siulyti.html
  - restoranas.html
  - css/
  - js/
  - img/

## React administravimo sistema
- client-react/
  - src/
  - components/

## Backend serveris
- server/
  - controllers/
  - models/
  - routes/
  - server.js

---

# Kaip paleisti projektą

## 1. Paleisti backend serverį

```bash
cd server
npm start

```

Serveris paleidžiamas adresu:

http://localhost:5050

---

## 2. Paleisti React admin aplikaciją

```bash
cd client-react
npm run dev
```

React aplikacija paleidžiama adresu:

http://localhost:5173

---

# Pagrindiniai puslapiai

## Viešas puslapis
http://localhost:5050

## Rekomendacijos
http://localhost:5050/rekomendacijos.html

## Siūlyti restoraną
http://localhost:5050/siulyti.html

## Admin sistema
http://localhost:5173

---

# Papildomi funkcionalumai

- Tamsi tema (dark mode)
- Restoranų paieška
- Filtravimas pagal miestus
- Responsive dizainas telefonams ir planšetėms
- Dinaminis restoranų užkrovimas iš MongoDB
- Dinaminis detalus restorano puslapis
- Google Maps žemėlapis pagal adresą
- React administravimo sistema
- Admin prisijungimas
- Restoranų CRUD operacijos
- Lankytojų pasiūlymų sistema
- Formų validacija
- Kortelių animacijos ir hover efektai

---

# Papildoma informacija

Projektas sukurtas Interneto technologijų modulio ND1, ND2 ir ND3 užduotims atlikti.

Projektas naudoja:
- responsive dizainą,
- Flexbox ir Grid,
- Bootstrap CSS karkasą,
- MERN architektūrą,
- MongoDB duomenų bazę,
- CRUD operacijas.

---

# Autorius

Dovilė Viršilienė