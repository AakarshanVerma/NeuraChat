'use client';
/* eslint-disable */

import {
  Flex,
  List,
  ListItem,
  Text,
  Icon,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import Link from '@/components/link/Link';

export default function Footer() {
  const textColor = useColorModeValue('gray.600', 'white');
  const iconColor = useColorModeValue('gray.600', 'white');

  return (
    <Flex
      zIndex="3"
      flexDirection={{ base: 'column', xl: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      px={{ base: '30px', md: '50px' }}
      py="30px"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderTop="1px solid"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
    >
      {/* Left: Copyright */}
      <Text
        color={textColor}
        fontSize={{ base: 'xs', md: 'sm' }}
        textAlign={{ base: 'center', xl: 'start' }}
        fontWeight="500"
        mb={{ base: '10px', xl: '0px' }}
      >
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="600" ms="4px">
          VridhHub. All Rights Reserved.
        </Text>
      </Text>

      {/* Middle: Links */}
      <List display="flex" mb={{ base: '10px', xl: '0px' }}>
        <ListItem me={{ base: '10px', md: '44px' }}>
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="/"
          >
            Homepage
          </Link>
        </ListItem>
        <ListItem me={{ base: '10px', md: '44px' }}>
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="/terms"
          >
            Terms of Use
          </Link>
        </ListItem>
        <ListItem me={{ base: '10px', md: '44px' }}>
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </ListItem>
      </List>

      {/* Right: Social Icons */}
      <HStack spacing={4}>
        <Link href="https://facebook.com" isExternal>
          <Icon as={FaFacebook} w={5} h={5} color={iconColor} />
        </Link>
        <Link href="https://twitter.com" isExternal>
          <Icon as={FaTwitter} w={5} h={5} color={iconColor} />
        </Link>
        <Link href="https://instagram.com" isExternal>
          <Icon as={FaInstagram} w={5} h={5} color={iconColor} />
        </Link>
        <Link href="https://github.com/yourusername" isExternal>
          <Icon as={FaGithub} w={5} h={5} color={iconColor} />
        </Link>
      </HStack>
    </Flex>
  );
}
