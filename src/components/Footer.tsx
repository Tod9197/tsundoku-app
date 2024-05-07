import { Flex, Box, Text } from "@chakra-ui/react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export default function Footer() {
  return (
    <>
      <Box
        pt={10}
        pb={10}
        pr={100}
        pl={100}
        bg="aliceblue"
        backgroundImage="linear-gradient(90deg, rgba(242, 237, 237, 0.36), rgba(238, 126, 115, 0.36) 98%)"
      >
        <Box width={20} margin="auto">
          <LocalLibraryIcon style={{ fontSize: 40 }} />
        </Box>
      </Box>
    </>
  );
}
