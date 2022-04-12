# Reminder io

##### The Project:
This is a fullstack application with a typescript react redux frontend and typescript node backend. You can create an account and then create reminders such as worktasks, shopping list or recipes.

##### Features:
This app uses socket.io so multiple users can interact with reminders.
This also allows for others to see changes in real-time.
The owner of a reminder has the capability to lock the reminder so no one can do edits and also set the visibility to private
so no one but the owner can access the reminder.

##### Reminder features:
You can create a reminder, each reminder has a task and a description. You can use markdown for the description. It converts to regular text when not in editmode. To  access a reminder, you can either find it in the list of all reminders or you can access it by /reminders/:reminderid. A reminder has also several categories that you can choose from to get exta features. Such as a recipe includes micronutrients or with a worktask you can set a deadline.
Once a reminder is created, you have an option to check off a reminder once its done, you can edit, lock and delete it.
The reminder comes also with subtasks. You can create an infinite amount of subtasks. These subtasks can be checked/deleted.
The subtasks has also the same categories and a cost input. You can see the sum of each subtask cost at the top of the reminder card. If the reminder has the category of recipe, you can see the sum of each food items nutrients at the top.
All of these happens in realtime so the user on the other end sees everything.

The app also has a list of all the reminders. Here you can check reminders off or delete them. In order to edit reminders you click on the view button which redirects you that that specific reminder.


##### User features:
You can register and login. The password gets encrypted for the safety of the users.
The user data gets stored in mongodb.



# Frontend

#### Routes

/Login, /register for logging in or registering

/reminders/create-reminder to create a reminder.
/reminders/all-reminders to see the list of all your reminders.
/reminder/:reminderid to go a specific card where you can make changes.

/404, you get redirected here when the reminder you are trying to access doesnt exist or if the id format is wrong. You also get redirected to /404 if the there are no routes matching your url.
/reminder-deleted When you delete a reminder, you and everyother user who are in that reminder gets rerouted to this link.
/unauthorized You get redirected here when you try to access a private reminder.


#### Folder setup
##### Service
These hold the two files for when you register/login
and when you create a reminder.
##### Redux
Here is where the app keeps its redux code. You have the actions, constants and the reducers. The app has three reducers. One for the user, the reminder that you are accessing and for the list of all reducers. 

##### Pages
Here is where the code for each page. It consists of three folders, the login, register and the reminders page.

##### Components
Here is where all the components gets stored such as the navbar, the taskform, reminderlist and the redirection files (404, private etc).


# Backend
Created with Node, Express, Socket.IO and TypeScript.

#### Features. 
This is the backend api that handles user & reminder creation and the reminder changes. It also handles that sockets that keeps a constant connection to the clientside for realtime collaborations.

#### Folder structure

##### Routes
This is where the routes for login/register and reminder creation.

##### Models
Here are the models for database. The three models are the user, the task(reminder) and the subtask.

##### Controllers
Here is where I keep all the logic for the database. It has the controller for the user where it handles login and registrations and a controller for reminders where the reminders get created/deleted/updated

