import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomeRouter() {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    } else {
      navigate('/reminders/all-reminders');
    }
  }, []);

  return (
    <div>HomeRouter</div>
  );
}

export default HomeRouter;
