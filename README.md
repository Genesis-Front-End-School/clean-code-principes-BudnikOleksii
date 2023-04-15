# Courses app

## Demo links:
- [Netlify DEMO LINK](https://coruscating-conkies-890f1a.netlify.app/)

### Technologies used:
- React with Typescript
- Redux Toolkit, Redux-Saga
- UI Library: MaterialUI
- Axios

### Project description
A  web application for e-learning purposes. The application has two main pages, the courses page, and the course page.

The courses page displays a list of available courses, and when the user hovers over a course title, a popover with a video preview is shown. If the user wants to know more details about a specific course, they can click on a link labeled "details," which will redirect them to the course page.

On the course page, all the lessons for the current course are displayed. The lessons can be videos, articles, or quizzes, and some of them are locked. The course page has a video player that allows the user to watch the video lessons and change the video speed by pressing the keyboard.
If the lesson is an article or a quiz, the application will open it in a new tab. The video progress is saved locally, and the user can return to the previous video without losing their progress.

### Instructions how to run application locally:
1. Clone the repository to your local machine, open terminal and clone repo with command bellow:
```bash 
git clone https://github.com/BudnikOleksii/courses-app.git
```
2. Open project in terminal:
```bash 
cd courses-app
```
3. Set up dependencies:
```bash 
npm install
```
4. Run project by command:
```bash 
npm start
```
5. Open application in your browser `http://localhost:3000/`
