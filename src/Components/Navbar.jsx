import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import logo_dark from "../img/logo_dark.png";
import {
  Input,
  InputLeftElement,
  InputGroup,
  useColorModeValue,
  useColorMode,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import {
  IoSearch,
  IoMoon,
  IoSunny,
  IoAdd,
  IoLogOutOutline,
} from "react-icons/io5";
const Navbar = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100vw"}
      p={4}
    >
      <Link to={"/"}>
        <Image src={colorMode === "light" ? logo_dark : logo} width={"180px"} />
      </Link>
      <InputGroup mx={6} width="60vw">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch fontSize={25} />}
        />
        <Input
          type="text"
          placeholder="Search..."
          fontSize={18}
          fontWeight="medium"
          variant="filled"
        />
      </InputGroup>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Flex
          width={"50px"}
          height={"50px"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
          borderRadius="5px"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <IoMoon fontSize={25} />
          ) : (
            <IoSunny fontSize={25} />
          )}
        </Flex>
        <Link to={"/create"}>
          <Flex
            alignItems={"center"}
            bg={bg}
            justifyContent={"center"}
            width={"40px"}
            height={"40px"}
            borderRadius={"5px"}
            mx={"6"}
            cursor={"pointer"}
            _hover={{ shadow: "md" }}
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={25}
              color={`${colorMode === "dark" ? "#111" : "#f1f1f1"} `}
            />
          </Flex>
        </Link>
        <Menu>
          <MenuButton>
            <Image
              src={user?.photoURL}
              width={"40px"}
              height={"40px"}
              rounded={"full"}
            />
          </MenuButton>
          <MenuList shadow={"lg"}>
            <MenuItem>
              <Link to="">My Profile</Link>
            </MenuItem>
            <MenuItem flexDirection={"row"} alignItems={"center"} gap={"4"}>
              Logout <IoLogOutOutline fontSize={"20px"} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
