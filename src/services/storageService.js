// LocalStorage service for managing users, posts, comments, and interactions
class StorageService {
    constructor() {
        this.USERS_KEY = 'facecrook-users';
        this.POSTS_KEY = 'facecrook-posts';
        this.COMMENTS_KEY = 'facecrook-comments';
        this.LIKES_KEY = 'facecrook-likes';
        this.CURRENT_USER_KEY = 'facecrook-user';
    }

    // ==================== USERS ====================
    
    getAllUsers() {
        try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
                return [];
            }
            const users = localStorage.getItem(this.USERS_KEY);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error getting all users:', error);
            return [];
        }
    }

    getUserById(userId) {
        const users = this.getAllUsers();
        return users.find(user => user.id === userId);
    }

    getUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(user => user.email === email.toLowerCase() || user.email === email);
    }

    createUser(userData) {
        try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
                throw new Error('localStorage not available');
            }

            const users = this.getAllUsers();
            
            // Check if user already exists by email
            if (userData.email && this.getUserByEmail(userData.email)) {
                throw new Error('User already exists');
            }

            const newUser = {
                id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: userData.name,
                email: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '')}@facecrook.com`,
                identity: userData.identity || 'Member',
                profilePicture: userData.profilePicture || '/default-avatar.jpg',
                createdAt: new Date().toISOString(),
                bio: userData.bio || ''
            };

            users.push(newUser);
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    updateUser(userId, updates) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        return users[userIndex];
    }

    // ==================== CURRENT USER ====================
    
    getCurrentUser() {
        try {
            if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
                return null;
            }
            const user = localStorage.getItem(this.CURRENT_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    setCurrentUser(user) {
        try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
            }
        } catch (error) {
            console.error('Error setting current user:', error);
        }
    }

    logout() {
        try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                localStorage.removeItem(this.CURRENT_USER_KEY);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    // ==================== POSTS ====================
    
    getAllPosts() {
        const posts = localStorage.getItem(this.POSTS_KEY);
        return posts ? JSON.parse(posts) : [];
    }

    getPostById(postId) {
        const posts = this.getAllPosts();
        return posts.find(post => post.id === postId);
    }

    savePost(post) {
        const posts = this.getAllPosts();
        const existingIndex = posts.findIndex(p => p.id === post.id);
        
        if (existingIndex >= 0) {
            posts[existingIndex] = post;
        } else {
            posts.unshift(post);
        }
        
        localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
        return post;
    }

    savePosts(postsArray) {
        localStorage.setItem(this.POSTS_KEY, JSON.stringify(postsArray));
    }

    // ==================== COMMENTS ====================
    
    getAllComments() {
        const comments = localStorage.getItem(this.COMMENTS_KEY);
        return comments ? JSON.parse(comments) : [];
    }

    getCommentsByPostId(postId) {
        const comments = this.getAllComments();
        return comments.filter(comment => comment.postId === postId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    addComment(postId, userId, content) {
        const comments = this.getAllComments();
        const user = this.getUserById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        const newComment = {
            id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            postId,
            userId,
            author: user.name,
            avatar: user.profilePicture,
            content,
            createdAt: new Date().toISOString(),
            likes: 0,
            likedBy: []
        };

        comments.push(newComment);
        localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments));

        // Update post comment count
        const post = this.getPostById(postId);
        if (post) {
            post.comments = (post.comments || 0) + 1;
            this.savePost(post);
        }

        return newComment;
    }

    deleteComment(commentId) {
        const comments = this.getAllComments();
        const commentIndex = comments.findIndex(c => c.id === commentId);
        
        if (commentIndex === -1) {
            throw new Error('Comment not found');
        }

        const comment = comments[commentIndex];
        comments.splice(commentIndex, 1);
        localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments));

        // Update post comment count
        const post = this.getPostById(comment.postId);
        if (post) {
            post.comments = Math.max(0, (post.comments || 0) - 1);
            this.savePost(post);
        }

        return true;
    }

    // ==================== LIKES ====================
    
    getAllLikes() {
        const likes = localStorage.getItem(this.LIKES_KEY);
        return likes ? JSON.parse(likes) : [];
    }

    getLikesByPostId(postId) {
        const likes = this.getAllLikes();
        return likes.filter(like => like.postId === postId);
    }

    hasUserLikedPost(postId, userId) {
        const likes = this.getLikesByPostId(postId);
        return likes.some(like => like.userId === userId);
    }

    togglePostLike(postId, userId) {
        const likes = this.getAllLikes();
        const existingLikeIndex = likes.findIndex(
            like => like.postId === postId && like.userId === userId
        );

        if (existingLikeIndex >= 0) {
            // Unlike
            likes.splice(existingLikeIndex, 1);
            localStorage.setItem(this.LIKES_KEY, JSON.stringify(likes));

            // Update post like count
            const post = this.getPostById(postId);
            if (post) {
                post.likes = Math.max(0, (post.likes || 0) - 1);
                this.savePost(post);
            }

            return { liked: false, likeCount: post?.likes || 0 };
        }

        // Like
        const newLike = {
            id: `like_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            postId,
            userId,
            createdAt: new Date().toISOString()
        };

        likes.push(newLike);
        localStorage.setItem(this.LIKES_KEY, JSON.stringify(likes));

        // Update post like count
        const post = this.getPostById(postId);
        if (post) {
            post.likes = (post.likes || 0) + 1;
            this.savePost(post);
        }

        return { liked: true, likeCount: post?.likes || 0 };
    }

    toggleCommentLike(commentId, userId) {
        const comments = this.getAllComments();
        const comment = comments.find(c => c.id === commentId);
        
        if (!comment) {
            throw new Error('Comment not found');
        }

        comment.likedBy = comment.likedBy || [];
        const userIndex = comment.likedBy.indexOf(userId);

        if (userIndex >= 0) {
            // Unlike
            comment.likedBy.splice(userIndex, 1);
            comment.likes = Math.max(0, (comment.likes || 0) - 1);
        } else {
            // Like
            comment.likedBy.push(userId);
            comment.likes = (comment.likes || 0) + 1;
        }

        localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments));
        return { liked: userIndex < 0, likeCount: comment.likes };
    }

    // ==================== REACTIONS ====================
    
    addReaction(postId, userId, reactionType) {
        const post = this.getPostById(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        post.reactions = post.reactions || { fire: 0, heart: 0 };
        
        if (reactionType === '🔥') {
            post.reactions.fire = (post.reactions.fire || 0) + 1;
        } else if (reactionType === '❤️') {
            post.reactions.heart = (post.reactions.heart || 0) + 1;
        }

        this.savePost(post);
        return post.reactions;
    }

    // ==================== UTILITY ====================
    
    clearAllData() {
        localStorage.removeItem(this.USERS_KEY);
        localStorage.removeItem(this.POSTS_KEY);
        localStorage.removeItem(this.COMMENTS_KEY);
        localStorage.removeItem(this.LIKES_KEY);
    }

    getStats() {
        return {
            users: this.getAllUsers().length,
            posts: this.getAllPosts().length,
            comments: this.getAllComments().length,
            likes: this.getAllLikes().length
        };
    }
}

export const storageService = new StorageService();
export default storageService;


