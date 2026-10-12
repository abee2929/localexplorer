# Student Details Management System

This beginner-friendly model-lab project contains:
- AngularJS frontend
- Node.js + Express + MongoDB CRUD backend
- Selenium browser test
- XML and DTD sample files
- Git commands to push this folder to GitHub and clone it on another computer

## Folder contents

- `frontend/index.html` — Student Details page
- `backend/server.js` — REST API for adding, viewing, modifying and removing students
- `backend/package.json` — Node.js dependencies and start command
- `selenium/test_students.py` — Selenium test for the website
- `xml/students.xml` and `xml/students.dtd` — XML sample and its DTD
- `.gitignore` — files that should not be pushed to Git

## Requirements

Install these on the computer:
1. Node.js (LTS): https://nodejs.org/
2. MongoDB Community Server, and make sure the MongoDB service is running: https://www.mongodb.com/try/download/community
3. Python 3: https://www.python.org/downloads/
4. Google Chrome
5. Git: https://git-scm.com/downloads
6. VS Code (recommended)

## Command prompts before running the code

Open VS Code, choose **Terminal > New Terminal**, and run the commands below from the project folder.

### 1. Start the backend

In a terminal:

```powershell
cd backend
npm install
npm start
```

Expected message:
`Server running at http://localhost:3000`

Keep this terminal open. MongoDB must be running first.

### 2. Open the frontend

Open a second VS Code terminal from the project root:

```powershell
cd frontend
```

In VS Code, install the **Live Server** extension if it is not installed. Right-click `frontend/index.html` and select **Open with Live Server**. The page will normally open at:
`http://127.0.0.1:5500/frontend/index.html`

The frontend calls the API at `http://localhost:3000`.

### 3. Install Selenium

Open a third terminal from the project root:

```powershell
python -m pip install selenium
```

If `python` is not recognized, try:

```powershell
py -m pip install selenium
```

### 4. Run the Selenium test

Keep the backend running and the frontend open through Live Server. In a terminal from the project root:

```powershell
python selenium/test_students.py
```

If needed, use:

```powershell
py selenium/test_students.py
```

The test adds a temporary student with ID `901`, modifies the name, and removes that student. Selenium Manager usually handles ChromeDriver automatically.

## XML validation

Open `xml/students.xml` in an editor or XML formatter. The XML refers to `students.dtd` in the same folder. Use a DTD-aware XML validator to validate both files together.

## Push this folder to GitHub

First create an empty repository on https://github.com/new. Give it a name such as `Student-Details-Management-System`. Do not add a README there, because this folder already contains one.

Open a terminal in this project folder (the folder containing this README) and run:

```powershell
git init
git add .
git commit -m "Add Student Details Management System model lab"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Student-Details-Management-System.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and adjust the repository name if you chose a different one. If Git asks you to sign in, complete the browser sign-in flow.

If `git remote add origin` says the remote already exists, run:

```powershell
git remote set-url origin https://github.com/YOUR-USERNAME/Student-Details-Management-System.git
```

Then push again:

```powershell
git push -u origin main
```

## Clone on another computer

Install Git, Node.js, Python, MongoDB, and Chrome on the other computer. Then open a terminal in the folder where you want the project and run:

```powershell
git clone https://github.com/YOUR-USERNAME/Student-Details-Management-System.git
cd Student-Details-Management-System
cd backend
npm install
```

Start MongoDB, then start the backend:

```powershell
npm start
```

Open a second terminal in the cloned project folder, open `frontend/index.html` with Live Server, install Selenium with `python -m pip install selenium`, and run `python selenium/test_students.py`.

## Notes

- This is a learning project, not a production-ready application.
- Student data is stored in MongoDB database `StudentDB`, collection `students`.
- The backend validates required fields and prevents duplicate student IDs.
- The frontend includes sample data only when MongoDB has no students; it will attempt to save those examples to the database on first load.
