import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { useEffect, useReducer } from 'react';
import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Center,
} from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Cruise } from '@/types';

const columnHelper = createColumnHelper<Cruise>();

const columns = [
  columnHelper.accessor('entry_id', {
    cell: (info) => info.getValue(),
    header: 'Entry ID',
  }),
  columnHelper.accessor('entry_type', {
    cell: (info) => info.getValue(),
    header: 'Entry Type',
  }),
  columnHelper.accessor('platform_id', {
    cell: (info) => info.getValue(),
    header: 'Platform ID',
  }),
  columnHelper.accessor('chief', {
    cell: (info) => info.getValue(),
    header: 'Chief',
  }),
  columnHelper.accessor('year', {
    cell: (info) => info.getValue(),
    header: 'Year',
  }),
  columnHelper.accessor('flag_alt', {
    cell: (info) => info.getValue(),
    header: 'Flag Alt',
  }),
  columnHelper.accessor('created', {
    cell: (info) => info.getValue(),
    header: 'Created',
  }),
  columnHelper.accessor('device_make', {
    cell: (info) => info.getValue(),
    header: 'Device Make',
  }),
  columnHelper.accessor('device_model', {
    cell: (info) => info.getValue(),
    header: 'Device Model',
  }),
  columnHelper.accessor('total_area', {
    cell: (info) => info.getValue(),
    header: 'Total Area',
  }),
];

interface CruisesTableState {
  pageNumber: number;
  pageSize: number;
  allResults: Cruise[];
  currentResults: Cruise[];
  numPages: number;
  totalAreaCurrentResults: number;
}

type Action =
  | { type: 'SET_PAGE'; payload: { pageNumber: number } }
  | { type: 'SET_RESULTS'; payload: Cruise[] }
  | { type: 'SET_PAGE_SIZE'; payload: { pageSize: number } };

const initialState: CruisesTableState = {
  pageNumber: 0,
  pageSize: 10,
  allResults: [],
  currentResults: [],
  numPages: 0,
  totalAreaCurrentResults: 0,
};

function cruisesReducer(state: CruisesTableState, action: Action): CruisesTableState {
  if (action.type === 'SET_PAGE') {
    const { pageNumber } = action.payload;
    const startIndex = (pageNumber - 1) * state.pageSize;
    const endIndex = startIndex + state.pageSize;
    const currentResults = state.allResults.slice(startIndex, endIndex);

    const totalAreas = currentResults.map((cruise) => Number(cruise.total_area));
    const totalArea = totalAreas.reduce((a: number, b: number) => a + b, 0);

    return { ...state, pageNumber, currentResults, totalAreaCurrentResults: totalArea };
  } else if (action.type === 'SET_RESULTS') {
    const numPages = Math.ceil(action.payload.length / state.pageSize);
    return { ...state, allResults: action.payload, numPages };
  } else if (action.type === 'SET_PAGE_SIZE') {
    const { pageSize } = action.payload;
    const numPages = Math.ceil(state.allResults.length / pageSize);
    const currentResults = state.allResults.slice(0, pageSize);
    const totalAreas = currentResults.map((cruise) => Number(cruise.total_area));
    const totalArea = totalAreas.reduce((a: number, b: number) => a + b, 0);
    return {
      ...state,
      pageSize: pageSize,
      numPages,
      currentResults,
      pageNumber: 1,
      totalAreaCurrentResults: totalArea,
    };
  } else {
    return state;
  }
}

type CruisesTableProps = {
  cruises: Cruise[];
};

export default function CruisesTable(props: CruisesTableProps) {
  const { cruises } = props;
  const [state, dispatch] = useReducer(cruisesReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_RESULTS', payload: cruises });
    dispatch({ type: 'SET_PAGE', payload: { pageNumber: 1 } });
  }, [cruises]);

  function goToPage(pageNumber: number) {
    dispatch({ type: 'SET_PAGE', payload: { pageNumber } });
  }

  function setPageSize(pageSize: number) {
    dispatch({ type: 'SET_PAGE_SIZE', payload: { pageSize } });
  }

  if (state.allResults.length === 0) {
    return (
      <Center>
        <Text>No results found</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Center marginBottom={10}>
        <Text>
          {' '}
          Total Area covered by cruises on this page:{' '}
          {state.totalAreaCurrentResults.toLocaleString('en-US')} sq km
        </Text>
      </Center>
      <DataTable columns={columns} data={state.currentResults} />
      <Flex justifyContent='space-between' m={4} alignItems='center'>
        <Flex>
          <Tooltip label='First Page'>
            <IconButton
              onClick={() => goToPage(1)}
              isDisabled={state.pageNumber <= 1}
              icon={<ArrowLeftIcon h={3} w={3} />}
              aria-label='First Page'
              mr={4}
            />
          </Tooltip>
          <Tooltip label='Previous Page'>
            <IconButton
              onClick={() => goToPage(state.pageNumber - 1)}
              isDisabled={state.pageNumber <= 1}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label='Previous Page'
            />
          </Tooltip>
        </Flex>

        <Flex alignItems='center'>
          <Text flexShrink='0' mr={8}>
            Page{' '}
            <Text fontWeight='bold' as='span'>
              {state.pageNumber}
            </Text>{' '}
            of{' '}
            <Text fontWeight='bold' as='span'>
              {state.numPages}
            </Text>
          </Text>
          <Text flexShrink='0'>Go to page:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={state.numPages}
            value={state.pageNumber}
            onChange={(value) => {
              if (value) {
                goToPage(parseInt(value));
              }
            }}
            defaultValue={state.pageNumber}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            title={'Page Size'}
            value={state.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label='Next Page'>
            <IconButton
              onClick={() => goToPage(state.pageNumber + 1)}
              isDisabled={state.pageNumber >= state.numPages}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label='Next Page'
            />
          </Tooltip>
          <Tooltip label='Last Page'>
            <IconButton
              onClick={() => goToPage(state.numPages)}
              isDisabled={state.pageNumber >= state.numPages}
              icon={<ArrowRightIcon h={3} w={3} />}
              aria-label='Last Page'
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
}