import * as migration_20260319_020347 from './20260319_020347';
import * as migration_20260321_042530 from './20260321_042530';
import * as migration_20260323_033428 from './20260323_033428';

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
    name: '20260323_033428'
  },
];
