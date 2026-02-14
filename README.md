# AI Liver Cancer Detection System - Frontend Dashboard

A modern, responsive, and hospital-grade web dashboard for AI-based liver cancer detection. This frontend includes mock data integration, Chart.js analytics, and a realistic medical UI.

## 🚀 Quick Start

This project is built with standard HTML, Tailwind CSS (CDN), and vanilla JavaScript. No complex build step is required.

### Prerequisites

You need [Node.js](https://nodejs.org/) installed to run a local server easily.

### How to Run

1.  **Open a terminal** in the project folder:
    ```bash
    cd cancer_detection
    ```

2.  **Start a local server**:
    You can use `npx serve`, `python`, or any static file server.

    **Using Node.js (Recommended):**
    ```bash
    npx serve .
    ```
    OR
    ```bash
    npx http-server .
    ```

    **Using Python:**
    ```bash
    python3 -m http.server 8000
    ```

3.  **Open the App**:
    -   Go to `http://localhost:3000` (or the port shown in your terminal).
    -   **Login**: Enter any email (e.g., `dr.mehra@hospital.org`) and any password.

## 📂 Project Structure

-   `index.html`: Login page.
-   `dashboard.html`: Main overview with stats.
-   `analysis.html`: **Core Feature** - Upload scans for AI prediction.
-   `patients.html`: Patient reports and history.
-   `analytics.html`: Charts and data visualization.
-   `system.html`: Model info and disclaimer.
-   `js/mock-api.js`: Simulates backend API responses.
-   `css/styles.css`: Custom medical UI styling.

## 🧪 Features to Test

-   **AI Analysis**: Go to "AI Analysis", upload any image, and click "Analyze". Watch the mock loading state and result card.
-   **Responsive Design**: Resize your browser to mobile width to see the hamburger menu and mobile layout.
-   **Theme**: Clean, trustworthy medical blue/teal color scheme.
