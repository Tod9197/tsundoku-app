import { FaStar } from "react-icons/fa";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Star = ({ selected = false, onSelect = () => {} }) => (
  <FaStar
    color={selected ? "gold" : "gray"}
    size={30}
    onClick={onSelect}
    style={{ cursor: "pointer" }}
  />
);

export default function StarRating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(3);

  return (
    <>
      <ChakraProvider>
        <Flex gap={3}>
          {[...Array(totalStars)].map((n, i) => (
            <Star
              key={i}
              selected={selectedStars > i}
              onSelect={() => setSelectedStars(i + 1)}
            />
          ))}
        </Flex>
      </ChakraProvider>
    </>
  );
}
