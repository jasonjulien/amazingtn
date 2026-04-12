import * as migration_20260319_020347 from './20260319_020347';
import * as migration_20260321_042530 from './20260321_042530';
import * as migration_20260323_033428 from './20260323_033428';
import * as migration_20260328_014803 from './20260328_014803';
import * as migration_20260328_164515 from './20260328_164515';
import * as migration_20260412_020048 from './20260412_020048';

export const migrations = [
  {
    up: migration_20260319_020347.up,
    down: migration_20260319_020347.down,
    name: '20260319_020347',
  },
  {
    up: migration_20260321_042530.up,
    down: migration_20260321_042530.down,
    name: '20260321_042530',
  },
  {
    up: migration_20260323_033428.up,
    down: migration_20260323_033428.down,
    name: '20260323_033428',
  },
  {
    up: migration_20260328_014803.up,
    down: migration_20260328_014803.down,
    name: '20260328_014803',
  },
  {
    up: migration_20260328_164515.up,
    down: migration_20260328_164515.down,
    name: '20260328_164515',
  },
  {
    up: migration_20260412_020048.up,
    down: migration_20260412_020048.down,
    name: '20260412_020048'
  },
];
