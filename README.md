# eBiblioteka

Repozitorijum sa dva dela:
- **server/** – Laravel API
- **ebiblioteka-ui/** – React klijent

Ovaj README pokriva instalaciju i pokretanje prvo **servera**, zatim **klijenta**.

---

## Prerekviziti
- **PHP** 8.1+ (preporučeno 8.2)
- **Composer** 2+
- **Node.js** 18+ i **npm** 9+
- **MySQL/MariaDB** ili **SQLite**
- **Git**

> Tip: Ako nemate lokalnu bazu, za početak možete koristiti SQLite.

---

## 1) Backend – Laravel (folder `server/`)

### 1.1 Kloniranje i instalacija zavisnosti
```bash
# iz korenskog foldera projekta
cd server
composer install
```

### 1.2 Kreiranje `.env` fajla i app key-a
**Linux/macOS**
```bash
cp .env.example .env
php artisan key:generate
```
**Windows (PowerShell)**
```powershell
copy .env.example .env
php artisan key:generate
```

### 1.3 Podesi bazu
Otvorite `.env` i podesite konekciju (primer za MySQL):
```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ebiblioteka
DB_USERNAME=root
DB_PASSWORD=
```

**SQLite (opciono):**
```bash
# kreiraj prazan fajl baze
touch database/database.sqlite
```
U `.env` postavite:
```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=/apsolutna/putanja/do/server/database/database.sqlite
```

### 1.4 Migracije i seederi
```bash
php artisan migrate --seed
```
> Ovo će kreirati tabele i upisati početne podatke.

### 1.5 Pokretanje Laravel servera
```bash
php artisan serve
```
Podrazumevano API radi na: `http://127.0.0.1:8000`

> Ako želite drugi port: `php artisan serve --port=8001`

---

## 2) Frontend – React (folder `ebiblioteka-ui/`)

### 2.1 Instalacija zavisnosti
```bash
cd ../ebiblioteka-ui
npm i
```

### 2.2 (Opciono) API URL konfiguracija
Ako je potrebno, kreirajte `.env` u `ebiblioteka-ui/` sa adresom backend-a (za Create React App):
```dotenv
REACT_APP_API_URL=http://127.0.0.1:8000
```

### 2.3 Pokretanje klijenta
```bash
npm start
```
Podrazumevano klijent radi na: `http://localhost:3000`

---

## Brzi start (ukratko)
```bash
# 1) Backend
cd server
composer install
cp .env.example .env   # (Windows: copy .env.example .env)
php artisan key:generate
# Podesi .env (DB_*)
php artisan migrate --seed
php artisan serve  # http://127.0.0.1:8000

# 2) Frontend
cd ../ebiblioteka-ui
npm i
npm start           # http://localhost:3000
```

---

## Korisne komande
- Reset baze sa seed-om:
```bash
php artisan migrate:fresh --seed
```
- Čišćenje keša:
```bash
php artisan config:clear && php artisan cache:clear && php artisan route:clear
```

---

## Struktura projekta (sažetak)
```
/ (root)
├─ server/              # Laravel API
│  ├─ app/
│  ├─ config/
│  ├─ database/
│  └─ ...
└─ ebiblioteka-ui/      # React klijent
   ├─ src/
   └─ ...
```

Srećan rad! Uzivajte u nasoj aplikaciji! 📚

