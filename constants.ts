import { Category, NewsArticle, LaunchEvent } from './types';
import { Bot, Monitor, Smartphone, Layers, Cpu } from 'lucide-react';

// EMAIL CONFIGURATION
// Please replace these with your actual keys from emailjs.com
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_fpfazxm',    // e.g., 'service_gmail'
  TEMPLATE_ID: 'template_hr334s3',  // e.g., 'template_grid7'
  PUBLIC_KEY: 'pNYvWtNpnp1gnMN_kH'     // e.g., 'user_123456'
};

export const CATEGORY_CONFIG: Record<Category, { color: string; icon: any; bg: string; border: string; gradient: string }> = {
  [Category.ALL]: { 
    color: 'text-white', 
    icon: Layers, 
    bg: 'bg-white/5', 
    border: 'border-white/20',
    gradient: 'from-gray-700 to-gray-900'
  },
  [Category.AI]: { 
    color: 'text-violet-400', 
    icon: Bot, 
    bg: 'bg-violet-900/20', 
    border: 'border-violet-500/50',
    gradient: 'from-violet-900/40 to-purple-900/40'
  },
  [Category.OS]: { 
    color: 'text-emerald-400', 
    icon: Monitor, 
    bg: 'bg-emerald-900/20', 
    border: 'border-emerald-500/50',
    gradient: 'from-emerald-900/40 to-teal-900/40'
  },
  [Category.GADGETS]: { 
    color: 'text-amber-400', 
    icon: Smartphone, 
    bg: 'bg-amber-900/20', 
    border: 'border-amber-500/50',
    gradient: 'from-amber-900/40 to-orange-900/40'
  },
  [Category.OTHER]: { 
    color: 'text-cyan-400', 
    icon: Cpu, 
    bg: 'bg-cyan-900/20', 
    border: 'border-cyan-500/50',
    gradient: 'from-cyan-900/40 to-blue-900/40'
  },
};

// Massive Pool of Reliable Tech Images to avoid repetition
export const TECH_IMAGES = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Chip
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Cyberpunk
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Matrix code
  "https://images.unsplash.com/photo-1550009158-9ebf690569ba?auto=format&fit=crop&w=800&q=80", // Circuit board
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", // AI Brain visualization
  "https://images.unsplash.com/photo-1531297461136-82lw8e076336?auto=format&fit=crop&w=800&q=80", // VR Headset
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", // Humanoid Robot
  "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=800&q=80", // Dual monitor setup
  "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80", // Server rack
  "https://images.unsplash.com/photo-1563770095-39d46e8e71e3?auto=format&fit=crop&w=800&q=80", // Programming screen
  "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80", // Data visualization
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // Network globe
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Coding workspace
  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80", // Drone
  "https://images.unsplash.com/photo-1535378437321-6f8af2311931?auto=format&fit=crop&w=800&q=80", // Cybernetic eye
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", // Manufacturing robot
  "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=800&q=80", // Smart home
  "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=800&q=80", // AI Face
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80", // Laptop code
  "https://images.unsplash.com/photo-1480506132288-68f7705954bd?auto=format&fit=crop&w=800&q=80", // Mobile stack
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80", // Coding text
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80", // Conference
  "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80", // User interface
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // Retro gaming
  "https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=800&q=80", // Security lock
  "https://images.unsplash.com/photo-1614728853913-1e32005e3192?auto=format&fit=crop&w=800&q=80", // 3D Abstract
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Abstract flow
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80", // Neon city
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80", // AR glasses
];

// Utility to ensure better randomization
export const getRandomTechImage = () => TECH_IMAGES[Math.floor(Math.random() * TECH_IMAGES.length)];

// Dynamic Time Helper
const getRelativeTime = (hoursAgo: number) => new Date(Date.now() - 1000 * 60 * 60 * hoursAgo).toISOString();

// Cached Data - 15 Items
// "Timeless" tech news that feels relevant whenever loaded.
export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'c1',
    title: 'The Race for 6G: India’s Strategic Roadmap',
    summary: 'While 5G is still rolling out, India is already laying the groundwork for 6G patents and infrastructure by 2030.',
    content: 'The Department of Telecommunications has released its "Bharat 6G Vision" document. The focus is on terahertz communication, AI-native networks, and non-terrestrial network integration. Major players like Jio and Airtel are beginning preliminary R&D labs in Bengaluru.',
    category: Category.GADGETS,
    source: 'Telecom India',
    timestamp: getRelativeTime(2),
    imageUrl: TECH_IMAGES[0],
    score: 9
  },
  {
    id: 'c2',
    title: 'OpenAI Strawberry: The Next Leap in Reasoning',
    summary: 'Rumors suggest OpenAI’s new model "Strawberry" drastically improves mathematical reasoning and coding capabilities.',
    content: 'Project Strawberry (formerly Q*) is reportedly capable of solving complex math problems that current LLMs struggle with. This marks a shift from pattern matching to actual logical deduction. Developers anticipate a late 2025 API release.',
    category: Category.AI,
    source: 'The Information',
    timestamp: getRelativeTime(4),
    imageUrl: TECH_IMAGES[4],
    score: 10
  },
  {
    id: 'c3',
    title: 'Solid State Batteries: Toyota Claims Breakthrough',
    summary: '745 miles of range and 10-minute charging? The holy grail of EV tech might finally be mass-producible.',
    content: 'Toyota announces a technological breakthrough that resolves durability issues in solid-state batteries. They plan to commercialize this technology by 2027-2028. This could revolutionize the EV market in India, where charging infrastructure is still growing.',
    category: Category.GADGETS,
    source: 'Reuters',
    timestamp: getRelativeTime(5),
    imageUrl: TECH_IMAGES[3],
    score: 8
  },
  {
    id: 'c4',
    title: 'Android 16: Deep Windows Integration',
    summary: 'Google is working to make Android phones seamless extensions of Windows PCs, challenging the Apple Ecosystem.',
    content: 'Code in the latest Android preview suggests a "Cross-Device Services" update that allows streaming Android apps directly to Windows 11 taskbars without third-party tools like Phone Link. A game changer for productivity.',
    category: Category.OS,
    source: 'Android Authority',
    timestamp: getRelativeTime(8),
    imageUrl: TECH_IMAGES[19],
    score: 7
  },
  {
    id: 'c5',
    title: 'OnePlus 13 Renders Leaked: A New Design Era',
    summary: 'OnePlus is ditching the circular camera island for a bold new aesthetic in its upcoming flagship.',
    content: 'Leaked CAD renders show a vertical camera alignment reminiscent of the OnePlus X, but with massive sensors. The device is confirmed to sport the Snapdragon 8 Elite and a 6000mAh glacier battery.',
    category: Category.GADGETS,
    source: 'OnLeaks',
    timestamp: getRelativeTime(10),
    imageUrl: TECH_IMAGES[1],
    score: 9
  },
  {
    id: 'c6',
    title: 'Meta Ray-Ban Smart Glasses: Multimodal AI Update',
    summary: 'Your glasses can now identify landmarks and translate signs in real-time with the new "Look and Ask" update.',
    content: 'Meta has pushed a firmware update to Ray-Ban smart glasses unlocking advanced visual look-up features. Users in India can now ask the AI to identify monuments or translate Hindi text to English instantly.',
    category: Category.GADGETS,
    source: 'The Verge',
    timestamp: getRelativeTime(12),
    imageUrl: TECH_IMAGES[28],
    score: 8
  },
  {
    id: 'c7',
    title: 'Quantum Computing: Google vs. IBM',
    summary: 'Google claims "Quantum Supremacy" again with a new 70-qubit processor, outpacing supercomputers.',
    content: 'Google Sycamore processor has performed a calculation in seconds that would take Frontier, the world’s fastest supercomputer, 47 years. Applications include drug discovery and new material science.',
    category: Category.OTHER,
    source: 'Nature Journal',
    timestamp: getRelativeTime(14),
    imageUrl: TECH_IMAGES[2],
    score: 10
  },
  {
    id: 'c8',
    title: 'Nothing OS 3.0: AI-First Interface',
    summary: 'Carl Pei teases a radical redesign where apps take a backseat to AI-driven intent prediction.',
    content: 'Nothing OS 3.0 aims to reduce screen time by surfacing information dynamically. The "Dot Matrix" design language remains, but with fluid animations and generative wallpapers.',
    category: Category.OS,
    source: 'Nothing Blog',
    timestamp: getRelativeTime(16),
    imageUrl: TECH_IMAGES[23],
    score: 7
  },
  {
    id: 'c9',
    title: 'NVIDIA Rubin Architecture revealed',
    summary: 'Before Blackwell even ships, NVIDIA teases "Rubin", the 2026 GPU architecture for next-gen AI.',
    content: 'Jensen Huang revealed the roadmap for Rubin GPUs, featuring HBM4 memory and a new interconnect switch. This ensures NVIDIA maintains its stranglehold on the AI training market.',
    category: Category.AI,
    source: 'Computex',
    timestamp: getRelativeTime(18),
    imageUrl: TECH_IMAGES[8],
    score: 9
  },
  {
    id: 'c10',
    title: 'Samsung Galaxy Ring India Pricing',
    summary: 'The smart ring arrives in India to compete with Ultrahuman. Expected price tag: ₹35,999.',
    content: 'Samsung brings its health-focused wearable to India. It features sleep apnea detection, menstrual cycle tracking via skin temperature, and a 7-day battery life. It works best with the Samsung Health ecosystem.',
    category: Category.GADGETS,
    source: 'MySmartPrice',
    timestamp: getRelativeTime(20),
    imageUrl: TECH_IMAGES[14],
    score: 6
  },
  {
    id: 'c11',
    title: 'iOS 19: "Apple Intelligence" Expansion',
    summary: 'Siri is getting a "Brain" upgrade. Reports suggest iOS 19 will allow Siri to control third-party apps deeply.',
    content: 'The next iteration of iOS will focus on "App Intents", allowing Siri to perform multi-step actions like "Crop this photo and email it to John". This relies on on-device local LLMs.',
    category: Category.OS,
    source: 'Bloomberg',
    timestamp: getRelativeTime(22),
    imageUrl: TECH_IMAGES[20],
    score: 8
  },
  {
    id: 'c12',
    title: 'Xiaomi SU7 Ultra: EV Speed Record',
    summary: 'Xiaomi’s electric car breaks Nürburgring records, proving they are a serious contender in the auto space.',
    content: 'The SU7 Ultra prototype clocked an impressive lap time, beating Porsche. While not yet available in India, Xiaomi hinted at expanding its EV lineup to Asian markets by 2026.',
    category: Category.OTHER,
    source: 'TopGear',
    timestamp: getRelativeTime(24),
    imageUrl: TECH_IMAGES[27],
    score: 9
  },
  {
    id: 'c13',
    title: 'Neuralink: Second Patient Success',
    summary: 'Elon Musk confirms the second human implant is functioning well, allowing the patient to play CS:GO with their mind.',
    content: 'The brain-computer interface is showing stable electrode connections. Neuralink plans to scale to 10 patients this year, focusing on restoring autonomy to those with spinal cord injuries.',
    category: Category.OTHER,
    source: 'TechCrunch',
    timestamp: getRelativeTime(26),
    imageUrl: TECH_IMAGES[15],
    score: 10
  },
  {
    id: 'c14',
    title: 'Windows 12: Cloud OS Rumors',
    summary: 'Microsoft might offer a "thin client" version of Windows 12 that runs entirely from Azure.',
    content: 'Ideally suited for enterprise and education, this version of Windows would require constant internet but demand zero local hardware power, running on cheap ARM chips.',
    category: Category.OS,
    source: 'Windows Central',
    timestamp: getRelativeTime(28),
    imageUrl: TECH_IMAGES[21],
    score: 6
  },
  {
    id: 'c15',
    title: 'Realme GT 7 Pro: 300W Charging?',
    summary: 'Realme demonstrates charging technology that fills a phone battery in under 5 minutes.',
    content: 'The technology, dubbed "SuperSonic Charge", was demoed at HQ. While not yet in the GT 7 Pro, it hints at what’s coming for the GT 8 series. The current GT 7 Pro settles for a "modest" 120W.',
    category: Category.GADGETS,
    source: 'Weibo',
    timestamp: getRelativeTime(30),
    imageUrl: TECH_IMAGES[22],
    score: 8
  }
];

// Future Launches - using likely dates in late 2025/2026 to ensure they appear "Upcoming"
// Sorting: The app filters for (date > now). We put dates well into the future.
export const UPCOMING_LAUNCHES: LaunchEvent[] = [
  {
    id: 'l_op_open2',
    productName: 'OnePlus Open 2',
    company: 'OnePlus',
    date: '2025-06-15',
    description: 'Refined hinge, Snapdragon 8 Gen 4, lighter build.',
    type: 'Hardware'
  },
  {
    id: 'l_win12',
    productName: 'Windows 12',
    company: 'Microsoft',
    date: '2025-07-01',
    description: 'Major OS overhaul with deep AI core integration.',
    type: 'OS' as any
  },
  {
    id: 'l_nothing4',
    productName: 'Nothing Phone (4)',
    company: 'Nothing',
    date: '2025-07-15',
    description: 'Next-gen glyph interface with transparent ceramic back.',
    type: 'Hardware'
  },
  {
    id: 'l_fold7',
    productName: 'Samsung Galaxy Z Fold 7',
    company: 'Samsung',
    date: '2025-08-10',
    description: 'Wider cover screen and dust resistance rating.',
    type: 'Hardware'
  },
  {
    id: 'l_iphone17',
    productName: 'iPhone 17 Air',
    company: 'Apple',
    date: '2025-09-12',
    description: 'Ultra-thin chassis replacing the Plus model.',
    type: 'Hardware'
  },
  {
    id: 'l_pixel10',
    productName: 'Pixel 10 Pro',
    company: 'Google',
    date: '2025-10-04',
    description: 'First fully custom TSMC Tensor G5 chip.',
    type: 'Hardware'
  },
  {
    id: 'l_meta_quest4',
    productName: 'Meta Quest 4',
    company: 'Meta',
    date: '2025-10-15',
    description: 'Lighter headset with eye-tracking standard.',
    type: 'Hardware'
  },
  {
    id: 'l_gpt5',
    productName: 'GPT-5 "Orion"',
    company: 'OpenAI',
    date: '2025-11-01',
    description: 'The next frontier in autonomous agents.',
    type: 'Software'
  },
  {
    id: 'l_iqoo15',
    productName: 'iQOO 15 Legend',
    company: 'iQOO',
    date: '2025-12-05',
    description: 'BMW M Motorsport edition with 300W charging.',
    type: 'Hardware'
  },
  {
    id: 'l_switch2',
    productName: 'Nintendo Switch 2',
    company: 'Nintendo',
    date: '2026-01-20',
    description: '4K DLSS output with backward compatibility.',
    type: 'Hardware'
  },
  {
    id: 'l_s26',
    productName: 'Samsung Galaxy S26 Ultra',
    company: 'Samsung',
    date: '2026-02-10',
    description: 'First Galaxy with 2nm architecture chip.',
    type: 'Hardware'
  },
  {
    id: 'l_apple_ring',
    productName: 'Apple Ring',
    company: 'Apple',
    date: '2026-03-15',
    description: 'Health tracking wearable integrated with Vision Pro.',
    type: 'Hardware'
  },
  {
    id: 'l_gta6',
    productName: 'GTA VI Online',
    company: 'Rockstar',
    date: '2026-04-01',
    description: 'The biggest entertainment launch in history.',
    type: 'Software'
  },
  {
    id: 'l_vision_air',
    productName: 'Apple Vision Air',
    company: 'Apple',
    date: '2026-06-05',
    description: 'Affordable mixed reality glasses for consumers.',
    type: 'Hardware'
  },
  {
    id: 'l_6g',
    productName: 'Jio 6G Trial',
    company: 'Jio',
    date: '2026-08-15',
    description: 'First public demonstration of 6G in India.',
    type: 'Service'
  }
];
