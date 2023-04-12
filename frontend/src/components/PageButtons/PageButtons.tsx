import { Box, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { PageButtonsProps } from './types';

export const PageButtons = ({
  children,
  onPreviousClick,
  onNextClick,
  prevDisabled,
  nextDisabled,
}: PageButtonsProps) => {
  return (
    <ButtonGroup isAttached mt="10px">
      <IconButton
        aria-label="Previous page"
        onClick={onPreviousClick}
        icon={<Icon as={AiOutlineLeft} />}
        isDisabled={prevDisabled}
      />
      <Box className="page-number-container">
        <Box className="page-number">{children}</Box>
      </Box>
      <IconButton
        aria-label="Next page"
        onClick={onNextClick}
        icon={<Icon as={AiOutlineRight} />}
        isDisabled={nextDisabled}
      />
    </ButtonGroup>
  );
};
