
# HateGuard 

HateGuard is an AI-powered automated content moderation ecosystem designed to protect online communities from toxic interactions. By bridging advanced natural language processing microservices with persistent chat applications, HateGuard shifts moderation from a broken, reactive reporting model into a proactive, near-zero latency mitigation layer.

The system intercepts harmful content, parses linguistic patterns, and executes automated moderation actions in under a second.

---

## The Core Problem

Manual community moderation cannot scale with modern internet chat volume. Community managers and human moderators face thousands of incoming text payloads daily, leading to delayed enforcement, toxic channel build-up, and burnout. 

**HateGuard solves this by:**
* **Processing at Ingestion:** Text data is flagged right at the entry layer before it can propagate or impact active communities.
* **Context-Aware Analysis:** Moving past rigid keyword blacklists to interpret semantic patterns and high-tempered contextual nuances.
* **Instant Mitigation:** Removing toxic messages and dispatching self-cleaning warnings automatically to keep channels clean without manual intervention.

---

## Tech Stack & Architecture

HateGuard is designed as a decoupled, microservices-driven architecture built to handle high throughput with minimal overhead.

### Core Ecosystem
* **Frontend:** React, Vite, Tailwind CSS (A streamlined, responsive dashboard tracking metrics and analytics).
* **Backend:** Node.js, Express.js (Manages payload constraints, secure API routing, and system telemetry).
* **Database:** MongoDB (Immutable data storage for tracking incident histories and audit logging).
* **AI Engine:** Python, Flask, scikit-learn, NLTK (An unlinked microservice hosting a customized text classification pipeline).
* **Integration Worker:** Discord.js / Discord Bot API (Listens to live server channels and applies deterministic actions).

---

## System Workflow

```text
[ User / Chat Input ] ──> [ Discord Bot / React Frontend Ingestion ]
                                          │
                                          ▼
                         [ Node.js / Express API Gateway ]
                                          │  (Payload Validation)
                                          ▼
                       [ Python Flask NLP Classification Core ]
                                          │  (Vectorization & Token Matching)
                                          ▼
                       [ MongoDB Logging & Live Metric Sync ]
                                          │
                                          ▼
               [ Automated Enforcement: Instant Deletion & Cleansing Warning ]

```

1. **Ingestion:** Text data flows instantly from active client touchpoints (such as an authorized Discord channel listener).
2. **Pre-processing:** The Node.js layer validates data structures, sanitizes whitespace, and packages the telemetry tokens.
3. **Model Evaluation:** The text payload is processed through custom NLP vectors to evaluate confidence distributions against strict classification thresholds.
4. **Database Audit:** Immutable infraction events are written directly to MongoDB, making historical telemetry available for admin auditing.
5. **Enforcement:** If a policy violation occurs, the Discord bot performs a soft deletion alongside an automated, self-cleaning channel warning.

---

## Environment Configuration

To configure and run the HateGuard application locally, create a `.env` file in your root directories with the following structure:

### Frontend Config (`/Frontend/.env`)

```env
# Client ID for your authorized Discord Bot instance
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here

```

### Backend Config (`/Backend/.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DISCORD_BOT_TOKEN=your_discord_bot_token
FLASK_API_URL=http://localhost:8000

```

---

## Local Installation & Setup

Ensure you have **Node.js (v18+)**, **Python (3.9+)**, and a running **MongoDB** instance before starting.

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/HateGuard.git](https://github.com/your-username/HateGuard.git)
cd HateGuard

```

### 2. Setup the Python ML Microservice

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py

```

### 3. Setup the Node.js Backend Engine

```bash
cd ../Backend
npm install
npm run dev

```

### 4. Run the User Dashboard Frontend

```bash
cd ../Frontend
npm install
npm run dev

```

---
