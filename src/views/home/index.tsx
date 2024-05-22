import React from 'react';
import './style.css';
import PostList from 'components/post_list';

const Home: React.FC = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="container">
                    <h1>Welcome to My Blog</h1>
                    <p>Sharing insights and stories from my journey.</p>
                </div>
            </section>
            <section className="recent-posts">
                <div className="container">
                    <h2>Recent Posts</h2>
                    <PostList />
                </div>
            </section>
        </div>
    );
};

export default Home;
