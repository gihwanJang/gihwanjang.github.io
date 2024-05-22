import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const posts = [
    { title: "Post 1", excerpt: "This is the first post.", link: "/post/1" },
    { title: "Post 2", excerpt: "This is the second post.", link: "/post/2" },
    { title: "Post 3", excerpt: "This is the third post.", link: "/post/3" }
];

const PostList: React.FC = () => {
    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post.link} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link to={post.link}>Read More</Link>
                </div>
            ))}
        </div>
    );
};

export default PostList;
