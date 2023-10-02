import { Heading, Input, Center, Box, Text, Select, VStack } from '@chakra-ui/react';
import CruisesTable from './CruisesTable';
import { useState, useEffect } from 'react';
import { Cruise, SortByOption } from '@/types';
import { useDispatch } from 'react-redux';
import { mainSlice } from '@/MainSlice';

export default function CruisesContent() {
  const [sortByOption, setSortByOption] = useState<SortByOption>(SortByOption.None);
  const [filterText, setFilterText] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCruises();
  }, [sortByOption, filterText]);

  async function fetchCruises() {
    const response = await fetch('https://www.gmrt.org/services/GmrtCruises.php');
    let cruises = (await response.json()) as Cruise[];

    if (filterText) {
      cruises = cruises.filter((cruise: Cruise) => {
        return (
          (cruise.device_make &&
            cruise.device_make.toLowerCase().includes(filterText.toLowerCase())) ||
          (cruise.device_model &&
            cruise.device_model.toLowerCase().includes(filterText.toLowerCase())) ||
          (cruise.entry_id && cruise.entry_id.toString().includes(filterText))
        );
      });
    }

    if (sortByOption === SortByOption.DateAscending) {
      cruises.sort((a: Cruise, b: Cruise) => {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      });
    } else if (sortByOption === SortByOption.DateDescending) {
      cruises.sort((a: Cruise, b: Cruise) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
    }

    dispatch(mainSlice.actions.setCruises(cruises));
  }

  return (
    <Box>
      <VStack margin={20}>
        <Center>
          <Heading>GMRT Cruises 🚢</Heading>
        </Center>
        <Text> powered by the GMRT API </Text>
      </VStack>

      <Center margin={10}>
        <Select
          width={200}
          title='Sort By'
          value={sortByOption}
          onChange={(e) => {
            setSortByOption(e.target.value as SortByOption);
          }}
        >
          {[SortByOption.None, SortByOption.DateAscending, SortByOption.DateDescending].map(
            (sortByOption) => (
              <option key={sortByOption} value={sortByOption}>
                {sortByOption}
              </option>
            ),
          )}
        </Select>
        <Input
          width={400}
          placeholder='Search by ship name or entry_id'
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        ></Input>
      </Center>

      <CruisesTable />
    </Box>
  );
}
