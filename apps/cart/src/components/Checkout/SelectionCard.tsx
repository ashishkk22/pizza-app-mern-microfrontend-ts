import {
  Card,
  Radio,
  ScrollArea,
  Text,
  createStyles,
  rem,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

type SelectionCardProps = {
  name?: string;
  address?: string;
  isActive?: boolean;
  handleActive?: () => void;
  paymentType?: string;
  isTrash?: boolean;
  onTrashBtnAction?: () => void;
};

const useStyles = createStyles(() => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
  },
  selected: {
    position: 'absolute',
    right: rem(15),
  },
  trash: {
    position: 'absolute',
    right: rem(15),
    bottom: rem(15),
  },
}));

const SelectionCard = ({
  name,
  address,
  isActive = false,
  handleActive,
  paymentType,
  isTrash = false,
  onTrashBtnAction,
}: SelectionCardProps) => {
  const { classes } = useStyles();
  return (
    <Card
      onClick={handleActive}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={240}
      h={paymentType ? 70 : 210}
      style={isActive ? { borderColor: 'red' } : {}}
      className={classes.card}
    >
      <Radio
        className={classes.selected}
        size="xs"
        checked={isActive}
        readOnly
      />
      {name && address && (
        <>
          <Text weight={500}>{name}</Text>

          <Text size="sm" color="dimmed">
            {address}
          </Text>
        </>
      )}
      {paymentType && <Text>{paymentType}</Text>}
      {isTrash && (
        <IconTrash
          className={classes.trash}
          width={16}
          color="red"
          onClick={onTrashBtnAction}
        />
      )}
    </Card>
  );
};

export default SelectionCard;
