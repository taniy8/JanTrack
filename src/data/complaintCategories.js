import roadDamage from '../assets/categories/road-damage.svg';
import streetLight from '../assets/categories/street-light.svg';
import waterSupply from '../assets/categories/water-supply.svg';
import garbage from '../assets/categories/garbage.svg';
import electricity from '../assets/categories/electricity.svg';
import drainage from '../assets/categories/drainage.svg';
import illegalConstruction from '../assets/categories/illegal-construction.svg';
import transport from '../assets/categories/transport.svg';
import governmentOffice from '../assets/categories/government-office.svg';
import other from '../assets/categories/other.svg';

export const complaintCategories = [
  {
    id: 'road-damage',
    title: 'Road Damage',
    value: 'Road Damage',
    description: 'Potholes, damaged roads, and broken surfaces.',
    image: roadDamage,
  },
  {
    id: 'street-light',
    title: 'Street Light',
    value: 'Street Light',
    description: 'Broken street lamps and failed public lighting.',
    image: streetLight,
  },
  {
    id: 'water-supply',
    title: 'Water Supply',
    value: 'Water Supply',
    description: 'Low pressure, leaks, or missing water services.',
    image: waterSupply,
  },
  {
    id: 'garbage-collection',
    title: 'Garbage Collection',
    value: 'Garbage Collection',
    description: 'Overflowing bins and missed waste pickup.',
    image: garbage,
  },
  {
    id: 'electricity',
    title: 'Electricity',
    value: 'Electricity',
    description: 'Power outages and damaged electrical infrastructure.',
    image: electricity,
  },
  {
    id: 'drainage',
    title: 'Drainage',
    value: 'Drainage',
    description: 'Blocked drains and water logging issues.',
    image: drainage,
  },
  {
    id: 'illegal-construction',
    title: 'Illegal Construction',
    value: 'Illegal Construction',
    description: 'Unauthorized buildings and unsafe site activity.',
    image: illegalConstruction,
  },
  {
    id: 'transport',
    title: 'Transport',
    value: 'Transport',
    description: 'Bus, traffic, and public transport concerns.',
    image: transport,
  },
  {
    id: 'government-office',
    title: 'Government Office',
    value: 'Government Office',
    description: 'Service delays or administrative issues at offices.',
    image: governmentOffice,
  },
  {
    id: 'other',
    title: 'Other',
    value: 'Other',
    description: 'Any other public service issue needing attention.',
    image: other,
  },
];
