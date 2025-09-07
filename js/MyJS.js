var userData = [];
var postData = [];
var commentData = [];

async function fetchAllData() {
    try {
        const savedUsers = localStorage.getItem('userData');
        const savedPosts = localStorage.getItem('postData');
        const savedComments = localStorage.getItem('commentData');

        if (savedUsers && savedPosts && savedComments) {
            userData = JSON.parse(savedUsers);
            postData = JSON.parse(savedPosts);
            commentData = JSON.parse(savedComments);
        } else {
            const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/comments')
            ]);

            if (!usersResponse.ok || !postsResponse.ok || !commentsResponse.ok) {
                throw new Error('One or more API requests failed');
            }

            userData = await usersResponse.json();
            postData = await postsResponse.json();
            commentData = await commentsResponse.json();

            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('postData', JSON.stringify(postData));
            localStorage.setItem('commentData', JSON.stringify(commentData));
            
        }

        
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        if (document.getElementById('posts-list')) {
            populatePosts();
        }

        if (document.getElementById('myTable')) {
            populateUserTable();
        }

        
        if (document.getElementById('usersCount')) {
            animateCount('usersCount', userData.length);
        }
        if (document.getElementById('postsCount')) {
            animateCount('postsCount', postData.length);
        }
        if (document.getElementById('commentsCount')) {
            animateCount('commentsCount', commentData.length);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('postData', JSON.stringify(postData));
    localStorage.setItem('commentData', JSON.stringify(commentData));
}

function populateUserTable() {
    
    if ($.fn.DataTable.isDataTable('#myTable')) {
        $('#myTable').DataTable().destroy();
    }
   
    $('#myTable tbody').empty();

    userData.forEach(user => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.website}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-btn" data-user-id="${user.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-btn" data-user-id="${user.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        $('#myTable tbody').append(row);
    });
    
    $('#myTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthMenu: [5, 10, 25, 50],
    });

    $(document).on('click', '.edit-btn', function() {
        const userId = $(this).data('user-id');
        editUser(userId);
    });

    $(document).on('click', '.delete-btn', function() {
        const userId = $(this).data('user-id');
        deleteUser(userId);
    });

    initializeAddUser();
}


function initializeAddUser() {
    const addUserBtn = document.querySelector('.add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            addNewUser();
        });
    }
}

function addNewUser() {
    const name = prompt("Enter user name:");
    const username = prompt("Enter username:");
    const email = prompt("Enter email:");
    const phone = prompt("Enter phone:");
    const website = prompt("Enter website:");
    
    if (name && username && email) {
        try {
            const newUser = {
                id: userData.length + 1,
                name: name,
                username: username,
                email: email,
                phone: phone || '',
                website: website || ''
            };
            
            userData.push(newUser);
            
            saveToLocalStorage();

            populateUserTable();
            
            toastr.success('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            toastr.error('Error adding user!');
        }
    } else {
        toastr.warning('Please fill in all required fields (Name, Username, Email)');
    }
}

function editUser(userId) {
    const user = userData.find(u => u.id == userId);
    if (!user) return;
    
    const name = prompt("Edit name:", user.name);
    const username = prompt("Edit username:", user.username);
    const email = prompt("Edit email:", user.email);
    const phone = prompt("Edit phone:", user.phone);
    const website = prompt("Edit website:", user.website);
    
    if (name && username && email) {
        try {
            
            const userIndex = userData.findIndex(u => u.id == userId);
            if (userIndex !== -1) {
                userData[userIndex] = {
                    id: userId,
                    name: name,
                    username: username,
                    email: email,
                    phone: phone || '',
                    website: website || ''
                };
            }
         
            saveToLocalStorage();

            populateUserTable();
            
            toastr.success('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            toastr.error('Error updating user!');
        }
    } else {
        toastr.warning('Please fill in all required fields (Name, Username, Email)');
    }
}

function deleteUser(userId) {
    const user = userData.find(u => u.id == userId);
    if (!user) return;
    
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        try {
            userData = userData.filter(u => u.id != userId);
     
            saveToLocalStorage();
            
            populateUserTable();
            
            toastr.success('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            toastr.error('Error deleting user!');
        }
    }
}

function populatePosts() {
    if (!document.getElementById('posts-list')) {
        return;
    }
    
    const postsContainer = document.getElementById('posts-list');
    
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    postData.forEach(post => {
        const user = userData.find(u => u.id === post.userId);
        const postComments = commentData.filter(c => c.postId === post.id);
        
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <i class="fas fa-user"></i>
                    ${user ? user.name : 'Unknown User'}
                </div>
                <div class="post-id">#${post.id}</div>
            </div>
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
            
            <div class="post-actions">
                <button class="comments-btn" onclick="toggleComments(${post.id})">
                    <i class="fas fa-comments"></i>
                    View Comments (${postComments.length})
                </button>
                <button class="edit-post-btn" onclick="editPost(${post.id})">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button class="delete-post-btn" onclick="deletePost(${post.id})">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
            
            <div class="comments-section" id="comments-${post.id}">
                <div class="comments-header">
                    <i class="fas fa-comment-dots"></i>
                    Comments (${postComments.length})
                </div>
                ${postComments.length > 0 ? 
                    postComments.map(comment => `
                        <div class="comment-item">
                            <div class="comment-header">
                                <span class="comment-name">${comment.name}</span>
                                <span class="comment-email">${comment.email}</span>
                            </div>
                            <div class="comment-body">${comment.body}</div>
                        </div>
                    `).join('') :
                    '<div class="no-comments">No comments available for this post.</div>'
                }
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    initializeSearch();
    initializeAddPost();
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    if (!searchInput || !clearButton) {
        return;
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterPosts(searchTerm);
        
        clearButton.style.display = searchTerm ? 'block' : 'none';
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        filterPosts('');
        this.style.display = 'none';
        searchInput.focus();
    });
}

function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        commentsSection.classList.toggle('show');
    }
}

function filterPosts(searchTerm) {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        const title = card.querySelector('.post-title').textContent.toLowerCase();
        const body = card.querySelector('.post-body').textContent.toLowerCase();
        const userName = card.querySelector('.post-user').textContent.toLowerCase();
        
        const commentItems = card.querySelectorAll('.comment-item');
        let commentText = '';
        commentItems.forEach(comment => {
            const commentName = comment.querySelector('.comment-name')?.textContent.toLowerCase() || '';
            const commentEmail = comment.querySelector('.comment-email')?.textContent.toLowerCase() || '';
            const commentBody = comment.querySelector('.comment-body')?.textContent.toLowerCase() || '';
            commentText += commentName + ' ' + commentEmail + ' ' + commentBody + ' ';
        });
        
        const isVisible = title.includes(searchTerm) || 
                         body.includes(searchTerm) || 
                         userName.includes(searchTerm) ||
                         commentText.includes(searchTerm);
        
        card.style.display = isVisible ? 'block' : 'none';
    });
}

function initializeAddPost() {
    const addPostBtn = document.querySelector('.add-post-btn');
    if (addPostBtn) {
        addPostBtn.addEventListener('click', function() {
            addNewPost();
        });
    }
}

function addNewPost() {
    const title = prompt("Enter post title:");
    const body = prompt("Enter post content:");
    const userId = prompt("Enter user ID:");
    
    if (title && body && userId) {
        try {
            const newPost = {
                id: postData.length + 1,
                title: title,
                body: body,
                userId: parseInt(userId)
            };
            
            postData.push(newPost);
            
            saveToLocalStorage();
            
            document.getElementById('posts-list').innerHTML = '';
            populatePosts();
            
            toastr.success('Post added successfully!');
        } catch (error) {
            console.error('Error adding post:', error);
            toastr.error('Error adding post!');
        }
    } else {
        toastr.warning('Please fill in all required fields (Title, Content, User ID)');
    }
}

function editPost(postId) {
    const post = postData.find(p => p.id === postId);
    if (!post) return;
    
    const title = prompt("Edit title:", post.title);
    const body = prompt("Edit content:", post.body);
    
    if (title && body) {
        try {
 
            const postIndex = postData.findIndex(p => p.id === postId);
            if (postIndex !== -1) {
                postData[postIndex] = {
                    id: postId,
                    title: title,
                    body: body,
                    userId: post.userId
                };
            }

            saveToLocalStorage();

            document.getElementById('posts-list').innerHTML = '';
            populatePosts();
            
            toastr.success('Post updated successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
            toastr.error('Error updating post!');
        }
    } else {
        toastr.warning('Please fill in all required fields (Title, Content)');
    }
}

function deletePost(postId) {
    const post = postData.find(p => p.id === postId);
    if (!post) return;
    
    if (confirm(`Are you sure you want to delete: "${post.title}"?`)) {
        try {
            
            postData = postData.filter(p => p.id !== postId);
            commentData = commentData.filter(c => c.postId !== postId);
           
            saveToLocalStorage();
            
            const postCard = document.querySelector(`#comments-${postId}`).closest('.post-card');
            if (postCard) {
                postCard.remove();
            }
            
            toastr.success('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
            toastr.error('Error deleting post!');
        }
    }
}
function resetAllData() {
    if (confirm('Are you sure you want to reset all data? This will reload fresh data from the API and cannot be undone.')) {
        try {
            
            localStorage.removeItem('userData');
            localStorage.removeItem('postData');
            localStorage.removeItem('commentData');
            
            userData = [];
            postData = [];
            commentData = [];
            
            fetchAllData();
            
            toastr.success('All data has been reset successfully!');
        } catch (error) {
            console.error('Error resetting data:', error);
            toastr.error('Error resetting data!');
        }
    }
}
function animateCount(id, end) {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 10);
    const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
            start = end;
            clearInterval(counter);
        }
        document.getElementById(id).textContent = Math.floor(start);
    }, 10);
}

const modeToggle = document.getElementById('modeToggle');
const body = document.body;

function applyDarkMode(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        modeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        modeToggle.checked = false;
    }
}

function loadDarkModePreference() {
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
       
        applyDarkMode(savedMode === 'true');
    } else {
        applyDarkMode(false);
    }
}

if (modeToggle) {
    modeToggle.addEventListener('change', () => {
        const isDark = modeToggle.checked;
        applyDarkMode(isDark);
        localStorage.setItem('darkMode', isDark.toString());
    });
}

loadDarkModePreference();

document.addEventListener('DOMContentLoaded', function() {
    loadDarkModePreference();
    fetchAllData();
});
