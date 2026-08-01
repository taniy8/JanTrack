import roadDamage from '../assets/images/damage-roads.jpg';
import streetLight from '../assets/images/streetlights.jpg';
import waterSupply from '../assets/images/water supply.avif';
import garbage from '../assets/images/garbage collection.jpg';
import electricity from '../assets/images/electricity.jpg';
import drainage from '../assets/images/drainage.jpg';
import illegalConstruction from '../assets/images/illegal construction.jpg';
import transport from '../assets/images/transportation.jpg';
import governmentOffice from '../assets/images/government offices.jpg';

export const homeServices = [
  { id: 'road-damage', title: 'Road Damage', description: 'Report potholes and broken roads', image: roadDamage, route: '/complaint/new', defaultComplaintCategory: 'Road Damage' },
  { id: 'street-light', title: 'Street Light', description: 'Report broken street lamps', image: streetLight, route: '/complaint/new', defaultComplaintCategory: 'Street Light' },
  { id: 'water-supply', title: 'Water Supply', description: 'Report water leakage and outages', image: waterSupply, route: '/complaint/new', defaultComplaintCategory: 'Water Supply' },
  { id: 'garbage-collection', title: 'Garbage Collection', description: 'Report missed pickups and overflow', image: garbage, route: '/complaint/new', defaultComplaintCategory: 'Garbage Collection' },
  { id: 'electricity', title: 'Electricity', description: 'Report power outages and faults', image: electricity, route: '/complaint/new', defaultComplaintCategory: 'Electricity' },
  { id: 'drainage', title: 'Drainage', description: 'Report blocked drains and flooding', image: drainage, route: '/complaint/new', defaultComplaintCategory: 'Drainage' },
  { id: 'illegal-construction', title: 'Illegal Construction', description: 'Report unsafe unauthorized work', image: illegalConstruction, route: '/complaint/new', defaultComplaintCategory: 'Illegal Construction' },
  { id: 'transport', title: 'Transport', description: 'Report bus and traffic issues', image: transport, route: '/complaint/new', defaultComplaintCategory: 'Transport' },
  { id: 'government-office', title: 'Government Offices', description: 'Report office delays and service issues', image: governmentOffice, route: '/complaint/new', defaultComplaintCategory: 'Government Office' },
];
