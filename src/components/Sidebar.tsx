import { Flex, Box, Text } from "@chakra-ui/react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

type SidebarProps = {
  donesLength: number;
};

export default function Sidebar({ donesLength }: SidebarProps) {
  const now = new Date();
  const year = String(now.getFullYear()); //年を取得
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const CurrentDate = `${year}年${month}月${day}日`;

  return (
    <>
      <Box
        width="25%"
        height="20vh"
        p={7}
        bg="cornsilk"
        borderRadius={20}
        position={"sticky"}
        right={10}
        top={30}
      >
        <Text
          textAlign="center"
          fontSize={22}
          fontWeight="bold"
          lineHeight="2"
          letterSpacing="0.15em"
        >
          {CurrentDate}現在
          <br />
          <span
            style={{
              fontSize: 30,
              color: "red",
              fontWeight: "bold",
              marginRight: 5,
            }}
          >
            {donesLength}冊
          </span>
          読了!!
        </Text>
      </Box>
    </>
  );
}
