// pages/index.js

import Link from 'next/link';

const IndexPage = () => {
  return (
    <div className="container">
      <h1>Welcome to FlowFusion Project Hub</h1>
      <Link href="/Login">
        <button>Log In</button>
      </Link>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .login-button {
          padding: 1rem 2rem;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-size: 1.2rem;
          transition: background-color 0.3s ease;
        }
        .login-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;