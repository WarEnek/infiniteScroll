import React, { useState, useEffect, useCallback } from 'react';
import UserCard from './components/UserCard';
import { User } from './types';
import $ from './InfiniteScroll.module.css';

/**
 * Component for implementing infinite scroll functionality.
 * It fetches and displays user data from an API as the user scrolls down.
 */
const InfiniteScroll: React.FC = () => {
  // State to store an array of user data
  const [users, setUsers] = useState<User[]>([]);

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(false);

  // State to keep track of the current page of the API
  const [page, setPage] = useState<number>(0);

  /**
   * Scroll event handler. Increases the page number to load additional user data.
   */
  const handleScroll = useCallback(() => {
    if (loading) return;
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(prev => prev + 1);
  }, [loading]);

  // Set the initial page number
  useEffect(() => {
    setPage(1);
  }, []);
  
  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Fetch user data and set the state
  useEffect(() => {
    let isCancelled = false;
  
    /**
     * Asynchronous function to fetch user data.
     * Checks if the component was unmounted before updating the state.
     */
    const load = async () => {
      if (page === 0 || isCancelled) return;
      setLoading(true);
      try {
        const response = await fetch(`https://randomuser.me/api/?results=18&page=${page}`);
        const data = await response.json();
        if (!isCancelled) {
          setUsers(prev => [...prev, ...data.results]);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
  
    load();
  
    return () => {
      isCancelled = true;
    };
  }, [page]);

  return (
    <div className={$.wrap}>
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
      <div>{loading && <p>Loading...</p>}</div>
    </div>
  );
};

export default InfiniteScroll;
