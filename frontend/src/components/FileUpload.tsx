import { Box, Button, Icon, Input, InputGroup, Text } from '@chakra-ui/react';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AiOutlineUpload } from 'react-icons/ai';

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = ({
  register,
  accept,
  multiple,
  children,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, onChange, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void | boolean>;
  };

  const [fileName, setFileName] = useState('');

  const handleClick = () => inputRef.current?.click();

  const myOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.target.files ? e.target.files[0].name : '');
    onChange(e);
  };

  return (
    <InputGroup onClick={handleClick}>
      <Input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        onChange={myOnChange}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>
        <Button
          size="md"
          minWidth="fit-content"
          leftIcon={<Icon as={AiOutlineUpload} />}
        >
          Upload
        </Button>
        <Box width="" ml="2" mt="auto" mb="auto" overflowX="hidden">
          <Text overflow="hidden">{fileName}</Text>
        </Box>
        {children}
      </>
    </InputGroup>
  );
};

export default FileUpload;
