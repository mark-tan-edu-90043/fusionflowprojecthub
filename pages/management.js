import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Management() {
  // Handle search input, possibly with state for controlled input
  const handleSearch = (event) => {
    event.preventDefault();
    // Implement search functionality
  };

  return (
    <main style={{ padding: '1rem', backgroundColor: '#E7E7E7', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <nav>
          <Link href="/profile" legacyBehavior>
            <a style={{ marginRight: '0.5rem' }}>Hi, Cheelix</a>
          </Link>
          <Link href="/logout" legacyBehavior>
            <a>Sign out</a>
          </Link>
        </nav>
      </header>
      
      <section aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
        Home &gt; Admin &gt; User Management
      </section>
      
      <section aria-label="search section" style={{ marginBottom: '1rem' }}>
        <form style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="search" 
            placeholder="Enter the name or ID number" 
            aria-label="Search User"
          />
          <button type="submit">Search User</button>
        </form>
      </section>

      <section aria-label="user table" style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
        {/* ... Table of users ... */}
      </section>
      
      <footer style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/admin-sign-in" legacyBehavior>
          <a>Admin Sign in</a>
        </Link>
        <div>
          <span>Copy Right 2023</span>
          <Link href="/report" legacyBehavior>
            <a>Report</a>
          </Link>
        </div>
      </footer>
    </main>
  );
}
