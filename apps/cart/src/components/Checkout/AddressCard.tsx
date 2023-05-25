import {
  Card,
  Text,
  Badge,
  createStyles,
  rem,
  Group,
  Image,
  Button,
} from '@mantine/core';

type AddressCardProps = {
  name: string;
  address: string;
  isActive?: boolean;
  handleActive: () => void;
};

const AddressCard = ({
  name,
  address,
  isActive = false,
  handleActive,
}: AddressCardProps) => {
  return (
    <Card
      onClick={handleActive}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={210}
      style={isActive ? { borderColor: 'red' } : {}}
    >
      <Text weight={500}>{name}</Text>
      <Text size="sm" color="dimmed">
        {address}
      </Text>
    </Card>
  );
};

export default AddressCard;
