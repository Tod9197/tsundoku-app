import { Flex, Heading, Box, Link } from "@chakra-ui/react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Header() {
  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        pt={50}
        pb={50}
        pl={100}
        pr={100}
        backgroundImage=" linear-gradient(64deg, rgba(4, 202, 255, 0.45), rgba(144, 245, 154, 0.22))"
      >
        <Heading
          as="h1"
          color="Orange.400"
          fontSize={40}
          letterSpacing="0.15em"
        >
          <MenuBookIcon
            style={{ marginRight: 20, fontSize: 45, paddingTop: 10 }}
          />
          積読アプリ
          <MenuBookIcon
            style={{ marginLeft: 10, fontSize: 45, paddingTop: 10 }}
          />
        </Heading>
        <Box style={{ display: "flex" }}>
          <Link
            href="#toread"
            fontSize={20}
            mr={10}
            _hover={{
              textDecoration: "none",
              color: "red.400",
            }}
          >
            読みたい本
          </Link>
          <Link
            href="#plantoread"
            fontSize={20}
            mr={10}
            _hover={{
              textDecoration: "none",
              color: "red.400",
            }}
          >
            読む予定の本
          </Link>
          <Link
            href="#done"
            fontSize={20}
            _hover={{
              textDecoration: "none",
              color: "red.400",
            }}
          >
            読んだ本
          </Link>
        </Box>
      </Flex>
    </>
  );
}
