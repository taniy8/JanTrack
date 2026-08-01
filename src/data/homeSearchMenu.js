import roadDamage from '../assets/search-menu/road-damage.svg';
import streetLight from '../assets/search-menu/street-light.svg';
import waterSupply from '../assets/search-menu/water-supply.svg';
import garbage from '../assets/search-menu/garbage.svg';
import electricity from '../assets/search-menu/electricity.svg';
import drainage from '../assets/search-menu/drainage.svg';
import illegalConstruction from '../assets/search-menu/illegal-construction.svg';
import transport from '../assets/search-menu/transport.svg';
import governmentOffice from '../assets/search-menu/government-office.svg';
import track from '../assets/search-menu/track.svg';
import dashboard from '../assets/search-menu/dashboard.svg';
import faq from '../assets/search-menu/faq.svg';
import support from '../assets/search-menu/support.svg';

export const homeSearchMenuItems = [
  { id: 'road-damage', title: 'Road Damage', description: 'Report potholes and road defects', image: roadDamage, route: '/complaint/new', defaultComplaintCategory: 'Road Damage' },
  { id: 'street-light', title: 'Street Light', description: 'Report broken lamps and lighting issues', image: streetLight, route: '/complaint/new', defaultComplaintCategory: 'Street Light' },
  { id: 'water-supply', title: 'Water Supply', description: 'Report water interruption and leaks', image: waterSupply, route: '/complaint/new', defaultComplaintCategory: 'Water Supply' },
  { id: 'garbage', title: 'Garbage Collection', description: 'Report missed pickups and overflow', image: garbage, route: '/complaint/new', defaultComplaintCategory: 'Garbage Collection' },
  { id: 'electricity', title: 'Electricity', description: 'Report power outages and faults', image: electricity, route: '/complaint/new', defaultComplaintCategory: 'Electricity' },
  { id: 'drainage', title: 'Drainage', description: 'Report blocked drains and flooding', image: drainage, route: '/complaint/new', defaultComplaintCategory: 'Drainage' },
  { id: 'illegal-construction', title: 'Illegal Construction', description: 'Report unsafe or unauthorized work', image: illegalConstruction, route: '/complaint/new', defaultComplaintCategory: 'Illegal Construction' },
  { id: 'transport', title: 'Transport', description: 'Report bus and traffic issues', image: transport, route: '/complaint/new', defaultComplaintCategory: 'Transport' },
  { id: 'government-office', title: 'Government Office', description: 'Report office delays and service gaps', image: governmentOffice, route: '/complaint/new', defaultComplaintCategory: 'Government Office' },
  { id: 'track', title: 'Track Complaint', description: 'Follow your request in real time', image: track, route: '/tracking' },
  { id: 'dashboard', title: 'Public Dashboard', description: 'Explore civic stats and progress', image: dashboard, route: '/dashboard' },
  { id: 'faq', title: 'FAQs', description: 'Find answers to common questions', image: faq, route: '/#faq' },
  { id: 'support', title: 'Contact Support', description: 'Get help from citizen support', image: support, route: '/contact' },
];
