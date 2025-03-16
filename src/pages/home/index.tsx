import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useGetProductsQuery } from '../../store/slices/product/productApi';
import { useDispatch } from "react-redux";
import { useRefreshMutation, useSendLogOutMutation } from "../../store/slices/auth/authApi";
import { logOut, selectCurrentUser, setCredentials } from "../../store/slices/auth/auth";
import { useSelector } from "react-redux";

const Home = () => {
    const [isTopBar, setIsTopBar] = useState(false);
    const { data: products } = useGetProductsQuery();
    const [sendLogOut] = useSendLogOutMutation();
    const [refresh] = useRefreshMutation();
    const user = useSelector(selectCurrentUser);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        sendLogOut();
        dispatch(logOut());
    }
    const handleRefresh = async () => {
        const result = await refresh();

        if ("data" in result && result.data) {
            dispatch(setCredentials({ accessToken: result.data.accessToken, user }));
        } else {
            console.error("Refresh failed:", result.error);
        }
    }
    useEffect(() => {
        if (products) {
            console.log(products);
        }
        const timer = setTimeout(() => {
            setIsTopBar(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: isTopBar ? "fixed" : "relative",
                top: isTopBar ? 0 : "auto",
                left: 0,
                width: "100%",
                height: isTopBar ? "60px" : "100vh",
                transition: "all 1s ease",
                zIndex: -1,
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: -1,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        ...(isTopBar && {
                            clipPath: "none",
                            zIndex: -1,
                        }),
                    }}
                    bgcolor="primary.main"
                />
                <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems={"center"}
                    borderRadius={4}
                    height={"60px"}
                >
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
                        bgcolor: "#E5E5E5",
                        transition: "all 1s ease",
                        zIndex: -1,
                        ...(isTopBar && {
                            clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)",
                        }),
                    }}
                    bgcolor={"divider"}
                />
            </Box>
            <Box display={"flex"} flexDirection={"column"} height={"100vh"} bgcolor={"divider"} borderTop={1} borderColor={"secondary.dark"} padding={2}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    width: '100%',
                    mt: -40,
                    fontSize: 50,
                    color: theme.palette.primary.main,
                }}>You Are Now logged in</Box>
                <Button onClick={handleRefresh} sx={{ fontSize: 20, color: theme.palette.primary.main, height: "20px" }}>Refresh</Button>
                <Button onClick={handleLogOut} sx={{ fontSize: 20, color: theme.palette.primary.main, height: "20px" }}>LogOut</Button>
            </Box>
        </Box>
    );
};

export default Home;