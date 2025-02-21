import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser, setCredentials } from "../store/slices/auth/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const IsAuth = () => {
  const Token = useSelector(selectCurrentToken);
  const User = useSelector(selectCurrentUser);

  return Token && User ? true : false;
}
export const NavigationHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const userParam = queryParams.get('user');
  
    try {
      const user = userParam ? JSON.parse(userParam) : {};
      if (token) {
        dispatch(setCredentials({ accessToken: token, user }));
        navigate('/');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [dispatch, navigate]);

  return null;
}
export const useAuth = () => {
  const Token = useSelector(selectCurrentToken);
  const User = useSelector(selectCurrentUser);

  useEffect(() => {
    console.log(Token);
    console.log(User);
  }, [Token, User]);

  return { Token, User, isAuthed: Token && User ? true : false };
}