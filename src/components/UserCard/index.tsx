import React from 'react';
import { User } from '../../types';
import $ from './style.module.css'


interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = React.memo(({ user }) => {
  return (
    <div className={$.userCard}>
      <div className={$.avatarWrap}>
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className={$.avatarBg}/>
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className={$.avatar}/>
      </div>  
      <section className={$.content}>
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </section>
    </div>
  );
});

export default UserCard;
