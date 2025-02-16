import waspLogo from './waspLogo.png'
import './Main.css'

import { Message } from 'wasp/entities'
import { useEffect } from 'react';
import { getMessages, useQuery } from 'wasp/client/operations'
import { useNavigate } from 'react-router-dom';
import { AuthUser } from 'wasp/auth'

const MainPage = ({ user }: { user: AuthUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return null;
}

export default MainPage;