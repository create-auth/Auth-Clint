import { Box } from '@mui/material'
import React from 'react'

export default function CodeWindow({setCodeWindow}: {setCodeWindow: any}) {
  return (
    <Box
        bgcolor={"red"}
        position={"absolute"}
        left={"50%"}
        top={"50%"}
        sx={{ transform: "translate(-50%, -50%)", zIndex: "1" }}
        borderRadius={"30px"}
        width={"500px"}
        height={"300px"}
        p={"30px"}
        display={"flex"}
        zIndex={10}
        
      >
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box
              fontSize={"20px"}
              fontWeight={"bold"}
              textAlign={"center"}
              mb={"20px"}
            >
              Enter the code
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                width={"calc(100% - 100px)"}
                height={"50px"}
                border={"1px solid black"}
                borderRadius={"10px"}
                pl={"10px"}
              ></Box>
              <Box
                width={"100px"}
                height={"50px"}
                bgcolor={"black"}
                color={"white"}
                borderRadius={"10px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Submit
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"white"}
            bgcolor={"black"}
            borderRadius={"10px"}
            height={"40px"}
            onClick={() => setCodeWindow(false)}
          >
            Close
          </Box>
        </Box>
      </Box>
  )
}
