import {
  Button,
  Card,
  Container,
  Flex,
  Image,
  Input,
  Loader,
  Modal,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import PromosList from './PromosList';
import AddPromo from './AddPromo';
import { useQuery } from '@tanstack/react-query';
import { displayErrorMsg, getCoupons } from '../../utils/api';
const initialValues = {
  name: '',
  id: '',
  status: '',
  percentage: 0,
};

const Promos = () => {
  const [search, setSearch] = useState('');

  const [currentCoupon, setCurrentCoupon] = useState(initialValues);

  const [opened, { open, close }] = useDisclosure(false);

  //to set and update the page in table
  const [page, setPage] = useState(1);

  //to fetch the data based on the page
  const { data, error } = useQuery(['coupons', page], () => getCoupons(page), {
    keepPreviousData: true,
  });

  //to reset empty the search state
  const filterResetHandler = () => {
    setSearch('');
  };

  //if entire last page is deleted then reduce the page number
  if (data?.data?.coupons?.length === 0 && page > 1) {
    setPage((page) => page - 1);
  }

  //if error from backend then display the toast
  if (error) {
    displayErrorMsg(error);
  }

  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <Flex align="center" gap={16} justify="space-between" wrap="wrap">
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/Coupon-icon.svg"
              width={34}
            />
            <Text fz="md">Promos</Text>
          </Flex>
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Input
              icon={<IconSearch />}
              placeholder="Search promos by name ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="subtle" onClick={filterResetHandler}>
              Reset
            </Button>
            <Button
              onClick={() => {
                setCurrentCoupon(initialValues);
                open();
              }}
            >
              + Create coupon
            </Button>
          </Flex>
        </Flex>
      </Card>
      {data?.data?.coupons ? (
        <PromosList
          data={data.data.coupons}
          totalPage={data.data?.totalPages}
          setCurrentPage={(page: number) => setPage(page)}
          currentPage={page}
          currentQuery={search}
          tableHeading={[
            'Coupon Name',
            'Off percentage',
            'Status',
            'Created At',
          ]}
          setCurrentCoupon={(
            name: string,
            id: string,
            percentage: number,
            status: string
          ) => {
            setCurrentCoupon({ name, id, status, percentage });
            open();
          }}
        />
      ) : (
        <Flex justify="center">
          <Loader />
        </Flex>
      )}
      {/* <PromosList currentQuery={search} /> */}
      <Modal opened={opened} onClose={close} title="Add Address" centered>
        <AddPromo
          closeModel={close}
          totalPage={data?.data?.totalDoc}
          currentCoupon={currentCoupon}
          currentPage={page}
        />
      </Modal>
    </Container>
  );
};

export default Promos;
