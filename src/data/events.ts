import { RobotEvent } from '../types';

export const ROBOT_EVENTS: RobotEvent[] = [
  {
    id: 'robo-wars',
    title: 'Robo Wars',
    category: 'Combat',
    shortDescription: 'Custom combat robots battle inside a reinforced steel arena to immobilize or knock out rivals in high-impact mechanical warfare.',
    fullDescription: 'The flagship combat robotics tournament of Central India. Custom-engineered remote-controlled war machines equipped with active spinning discs, pneumatic flippers, or crushing jaws clash in a reinforced polycarbonate arena under high-impact conditions.',
    prize: '₹35,000 Pool',
    highlight: '15kg & 30kg Weight Classes · Double Elimination',
    teamSize: '2 - 5 Members (1 Leader + 1 to 4 Members)',
    minMembers: 2,
    maxMembers: 5,
    arenaSpecs: '16ft x 16ft reinforced steel floor with dual flipper hazards and bulletproof polycarbonate blast walls.',
    botSpecs: 'Max weight 15kg (featherweight) or 30kg (middleweight). Pneumatic/electric weapons permitted. Internal combustion banned.',
    rounds: [
      'Round 1: Qualifying safety inspection and fail-safe calibration',
      'Round 2: Group stage 3-minute combat skirmishes',
      'Round 3: Semifinals & Grand Arena Championship match'
    ],
    rules: [
      'Active weapon is strictly mandatory for combat qualification.',
      'Robot must have an easily accessible mechanical master kill-switch.',
      'A robot is considered knocked out if immobilized for 10 consecutive seconds.',
      'Flame throwers, radio jamming, liquid projectiles, and entangling nets are prohibited.'
    ],
    schedule: 'Day 2 · Main Arena Ground · 11:00 AM IST',
    coordinator: {
      name: 'Aditya Verma',
      contact: '+91 98765 43211'
    },
    image: '/src/assets/images/real/combat_robot_machine.jpg'
  },
  {
    id: 'line-follower',
    title: 'Line Follower Sprint',
    category: 'Autonomous',
    shortDescription: 'Autonomous robots race along an intricate high-contrast circuit at high speed with precision sensor guidance.',
    fullDescription: 'High-speed algorithmic velocity engineering. Autonomous robots fitted with IR/optical sensor arrays and tuned PID algorithms must track an intricate black-and-white circuit featuring sharp 90-degree hairpins, crossover grids, and inverted gradients.',
    prize: '₹20,000 Pool',
    highlight: 'Microsecond Lap Telemetry · Dynamic Obstacle Gates',
    teamSize: '2 - 4 Members (1 Leader + 1 to 3 Members)',
    minMembers: 2,
    maxMembers: 4,
    arenaSpecs: '12m continuous high-contrast vinyl course with sharp chicane turns and optical finish gates.',
    botSpecs: 'Dimensions strictly under 25cm x 25cm x 15cm. Maximum bot weight 2.5kg. Onboard microcontrollers only (STM32, ESP32, Arduino, Teensy).',
    rounds: [
      'Time Trials: 2 solo hot laps to set baseline leaderboard standing',
      'Elimination: Head-to-head sprint duel on twin mirrored circuits',
      'Finals: Inverted contrast speed run on championship grid'
    ],
    rules: [
      'Bot must start autonomously upon releasing the start gate button.',
      'Up to 2 track recalibrations allowed per heat (with minor time penalty).',
      'Off-track excursion of all drive wheels requires restart from last checkpoint.',
      'PID parameters must be tuned without external radio guidance during the run.'
    ],
    schedule: 'Day 1 · Innovation Hall B · 02:00 PM IST',
    coordinator: {
      name: 'Sneha Patel',
      contact: '+91 98765 43212'
    },
    image: '/src/assets/images/real/line_follower_robot.jpg'
  },
  {
    id: 'maze-solver',
    title: 'Maze Solver (Micromouse)',
    category: 'Autonomous',
    shortDescription: 'Robots autonomously map and navigate an unknown labyrinth using real-time sensor processing and pathfinding.',
    fullDescription: 'The ultimate computational robotics showdown. Completely autonomous micromice must systematically explore an uncharted 16x16 modular maze, map dead ends and junctions, calculate the shortest mathematical path (Floodfill / A* search), and execute a sprint to the center.',
    prize: '₹25,000 Pool',
    highlight: 'Floodfill & Dijkstra Benchmarks · 16x16 Competition Grid',
    teamSize: '2 - 3 Members (1 Leader + 1 to 2 Members)',
    minMembers: 2,
    maxMembers: 3,
    arenaSpecs: 'Standard IEEE 16x16 cell maze, 18cm wall height, precision matte black non-reflective finish.',
    botSpecs: 'Max footprint 16cm x 16cm. Optical LiDAR, ToF, or ultrasonic distance sensors allowed. Must be self-contained battery powered.',
    rounds: [
      'Exploration Phase: Up to 5 minutes to explore and construct maze graph',
      'Sprint Phase: 3 timed high-speed runs using computed shortest path',
      'Blindfolded Reverse Run: Bonus algorithmic challenge for top finalists'
    ],
    rules: [
      'Zero external wireless transmission or telemetry allowed once in the maze.',
      'Bot must not jump over or deliberately damage maze boundary walls.',
      'Touching the bot during active exploration incurs a 30-second penalty.',
      'Fastest sprint time determines final leaderboard ranking.'
    ],
    schedule: 'Day 2 · Robotics Lab Annex · 10:00 AM IST',
    coordinator: {
      name: 'Devanshu Soni',
      contact: '+91 98765 43213'
    },
    image: '/src/assets/images/real/micromouse_robot.jpg'
  },
  {
    id: 'bot-design-showcase',
    title: 'Bot Design Showcase',
    category: 'Design',
    shortDescription: 'Engineering teams present mechanical CAD design, structural novelty, build craftsmanship, and prototyping ingenuity.',
    fullDescription: 'A premier engineering expo celebrating mechanical elegance, functional ingenuity, and prototyping craft. Teams present novel robotic mechanisms—including bipedal walkers, robotic arms, biomimetic bots, and soft robotics—to expert industry and academic juries.',
    prize: '₹20,000 Pool',
    highlight: 'CAD Topology Review · Live Jury Defense · Best Innovation Award',
    teamSize: '2 - 5 Members (1 Leader + 1 to 4 Members)',
    minMembers: 2,
    maxMembers: 5,
    arenaSpecs: 'Showcase exhibition pavilion equipped with 3-phase power, workbench display stands, and digital presentation displays.',
    botSpecs: 'Open category. Custom 3D-printed chassis, CNC aluminum parts, carbon fiber assemblies, and custom PCB designs are highlighted.',
    rounds: [
      'Jury Walkthrough: 5-minute technical mechanism demonstration',
      'Engineering Deep-Dive: 10-minute viva on CAD files, stress FEA, and component selection',
      'Public Open Expo: Live interactive demo for festival attendees and student voting'
    ],
    rules: [
      'Teams must present comprehensive CAD models and design documentation.',
      'Novelty of mechanism and fabricated parts weighted heavily over off-the-shelf kits.',
      'Working functional prototype demonstration is strictly required.',
      'Open-source hardware attribution must be clearly disclosed.'
    ],
    schedule: 'Day 3 · Central Auditorium Foyer · 01:30 PM IST',
    coordinator: {
      name: 'Priyanka Sen',
      contact: '+91 98765 43214'
    },
    image: '/src/assets/images/real/hexapod_design_robot.jpg'
  }
];
