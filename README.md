# 🎯 Web Testing Playground

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Testing](https://img.shields.io/badge/QA-Manual_%26_Automation-239120?style=for-the-badge)

A intentionally designed, complex React web application built specifically to serve as a comprehensive target for **Quality Assurance (QA) Practice, Manual Testing, and End-to-End (E2E) Automation Testing**. 

🌍 **Live Demo:** [Link to your GitHub Pages URL e.g., https://username.github.io/web-testing-playground]

## 💡 Purpose
This project is created to simulate real-world web application behaviors, including both standard functionalities and "tricky" edge cases that challenge test automation scripts. It serves as a personal portfolio piece to demonstrate testing methodologies, bug documentation, and automation scripting capabilities.

## 🚀 Key Features for Testing

The application is divided into several modules, each designed to test specific QA skills:

* **🔐 Authentication Flow (`/register` & `/login`)**
    * Form validations (empty fields, format mismatch).
    * Simulated network delays and loading states (perfect for practicing Explicit Waits).
* **📊 Dashboard & Data Management (`/dashboard`)**
    * Data Table with Pagination, Sorting, and Search functionalities.
    * Protected routing (requires mock authentication).
* **🧩 Complex UI Elements (`/ui-elements`)**
    * Modals/Dialogs with overlay handling.
    * Drag and Drop functionality.
    * Hover-triggered Tooltips and hidden elements.
* **⏳ Dynamic & Asynchronous Elements (`/dynamic-elements`)**
    * **Dynamic IDs:** Elements whose IDs change on every refresh to practice advanced CSS/XPath selectors.
    * **Delayed Rendering:** Elements that only appear in the DOM after a set timeout.
    * **Disappearing Elements:** Auto-dismissing notification toasts.
* **📝 Complex Forms (`/complex-form`)**
    * File Upload handling.
    * Interdependent/Cascading Dropdowns (e.g., Country -> State -> City).

## 🛠️ Testing Approach

### 1. Manual Testing & Bug Reporting
This playground is perfect for exploratory testing. Expected deliverables from testing this app include:
* Writing comprehensive Positive and Negative Test Cases.
* Documenting UI/UX inconsistencies and functional defects using standard bug reporting formats (Title, Steps to Reproduce, Expected vs. Actual Result, Severity) as if reporting in tools like Jira.

### 2. Automation Testing 
The repository is optimized for E2E tools like **Katalon Studio**, Selenium, or Cypress. 
* **`data-testid` Implementation:** Most elements utilize `data-testid` attributes for stable and reliable element mapping.
* **Exception handling:** Specific dynamic elements intentionally omit test IDs to force the use of advanced relative locators or text-based selectors.

## 💻 How to Run Locally

If you want to run this application on your local machine:

1. Clone this repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/web-testing-playground.git](https://github.com/YOUR_USERNAME/web-testing-playground.git)