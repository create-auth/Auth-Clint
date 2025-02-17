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
      const user = JSON.parse(queryParams.get('user') || '{}');
      console.log(token, user);
      if (token) {
        dispatch(setCredentials({ accessToken: token, user: user }));
        navigate('/');
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