import * as migration_20260608_174533 from './20260608_174533';
import * as migration_20260609_061054 from './20260609_061054';
import * as migration_20260609_130000 from './20260609_130000';

export const migrations = [
  {
    up: migration_20260608_174533.up,
    down: migration_20260608_174533.down,
    name: '20260608_174533'
  },
  {
    up: migration_20260609_061054.up,
    down: migration_20260609_061054.down,
    name: '20260609_061054'
  },
  {
    up: migration_20260609_130000.up,
    down: migration_20260609_130000.down,
    name: '20260609_130000'
  },
];
