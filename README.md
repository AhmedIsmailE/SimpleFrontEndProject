# SimpleFrontEndProject
A modern, responsive web-based admin dashboard for managing users and posts with real-time data manipulation and persistent local storage.
---------------
User Manual & How it works 

All navigation is done from the navbar buttons:

Admin Dashboard (main page): Overview with statistics and quick access

Users (users table and modifications): Complete user management interface

Posts (posts and comments view): Post management with comment viewing

Reset All Data: to reset the changes that happened and to restore the api fetched data to the local storage

Theme Toggle: Switch between dark/light modes

---------------
Dashboard Operations

View Statistics: See total counts of users, posts, and comments

Animated Counters: Numbers animate on page load

Quick Navigation: Access Users and Posts from dashboard

---------------
User Management

Adding a New User

Navigate to Users page

Click "Add New User" button

Fill in the required information:

Name (required)

Username (required)

Email (required)

Phone (optional)

Website (optional)

Confirm to save
---------------
Editing a User

Locate the user in the table

Click "Edit" button in the Actions column

Modify the information in the prompts

Confirm to save changes
---------------
Deleting a User

Locate the user in the table

Click "Delete" button in the Actions column

Confirm the deletion in the dialog
---------------
Table Features

Search: Use the built-in search box to find users

Sorting: Click column headers to sort data

Pagination: Navigate through pages using controls

Entries: Change number of entries per page (5, 10, 25, 50)
---------------
Post Management

Adding a New Post

Navigate to Posts page

Click "Add New Post" button

Enter the required information:

Title (required)

Content (required)

User ID (required, 1-10)

Confirm to save

Viewing Comments

Find the desired post

Click "View Comments" button

Comments section will expand/collapse
---------------
Editing a Post

Locate the post

Click "Edit" button

Modify title and/or content

Confirm to save changes
---------------
Deleting a Post

Locate the post

Click "Delete" button

Confirm deletion (this will also delete all associated comments)
---------------
Search Functionality

Use the search box to find posts by:

Post title

Post content

Author name

Comment content


Click the "X" button to clear search
---------------
Features  

Core Functionality

User Management: Add, edit, delete, and view users in a DataTable

Post Management: Create, update, delete posts with comments viewing

Data Persistence: All changes saved to localStorage

Search Functionality: Real-time search across posts and comments

Dark/Light Mode: Toggle between themes with persistent preference

Responsive Design: Works seamlessly on desktop and mobile devices
---------------
Advanced Features 

Real-time Notifications: Toast notifications for all operations

Comment Management: View post comments with automatic deletion on post removal

Background Customization: Dashboard-specific background image

Sticky Navigation: Always visible navigation bar

Animated Statistics: Smooth counting animations for dashboard stats

Data Validation: Form validation with user-friendly error messages
---------------
Technologies Used

HTML5: Semantic markup and modern web standards

CSS3:

Custom properties (CSS variables) for theming

Flexbox and Grid layouts

Smooth transitions and animations

Responsive design principles

JavaScript:

Async/await for API calls

Modern array methods (filter, map, find)

Local storage management

Event handling and DOM manipulation
---------------
Libraries & Frameworks

Bootstrap 5.3.8: UI framework for responsive design and components

jQuery 3.7.1: DOM manipulation and event handling

DataTables 2.3.3: Advanced table features (pagination, search, sorting)

Font Awesome 7.0.1: Icon library for UI elements

Toastr.js: Non-blocking notification system
---------------
External APIs

JSONPlaceholder API: Mock REST API for initial data fetching

https://jsonplaceholder.typicode.com/users

https://jsonplaceholder.typicode.com/posts

https://jsonplaceholder.typicode.com/comments
---------------
Project Structure

dashboard/

├── css/

│   └── MyCss.css              # Custom styles and theme variables

├── imgs/

│   └── background.jpg         # Dashboard background image

├── js/

│   └── MyJS.js               # Main JavaScript functionality

├── Dashboard.html            # Main dashboard with statistics

├── Users.html               # User management page

├── Posts.html               # Post management 

└── README.md               # Project documentation
---------------
Theme Management

Toggle Switch: Located in the top navigation

Persistence: Theme preference is saved automatically

Instant Switch: Changes apply immediately across all pages
---------------
Data Management

Data Persistence

All changes are saved to browser's localStorage

Data persists between browser sessions

Changes are local to your browser only

Data Reset

To reset all data to original state
---------------
Technical Implementation

Data Flow Architecture:

Initial Load: Fetch data from JSONPlaceholder API

Local Storage: Save fetched data to localStorage

Subsequent Loads: Use localStorage data for faster loading

CRUD Operations: Modify local data and update localStorage

UI Updates: Refresh interface to reflect changes
---------------
Key JavaScript Functions:

javascriptfetchAllData()        // Initial API data fetching

saveToLocalStorage()  // Persist data changes

populateUserTable()   // Render user DataTable

populatePosts()       // Render post cards

addNewUser()         // Create new user

editUser()           // Update existing user

deleteUser()         // Remove user

addNewPost()         // Create new post

editPost()           // Update existing post

deletePost()         // Remove post and associated comments
---------------
CSS Architecture

CSS Variables: Centralized theming system

Component-based: Modular styles for reusability

Responsive Design: Mobile-first approach

Theme Support: Light/dark mode implementation
---------------
Local Storage Schema

javascript{

  "userData": [...],      // Array of user objects
	
  "postData": [...],      // Array of post objects
	
  "commentData": [...],   // Array of comment objects
	
  "darkMode": "true/false" // Theme preference
	
}
---------------
Styling

Modify css/MyCss.css for custom styling

Bootstrap classes available for quick styling

Font Awesome icons for consistent iconography
