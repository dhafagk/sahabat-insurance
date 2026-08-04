import * as migration_20260608_174533 from './20260608_174533';
import * as migration_20260609_061054 from './20260609_061054';
import * as migration_20260609_130000 from './20260609_130000';
import * as migration_20260610_000000 from './20260610_000000';
import * as migration_20260802_100554_add_garage_branches from './20260802_100554_add_garage_branches';
import * as migration_20260803_070000_garage_branches_row_category from './20260803_070000_garage_branches_row_category';
import * as migration_20260803_080000_garage_branches_category_default_general from './20260803_080000_garage_branches_category_default_general';
import * as migration_20260803_090000_garage_branch_rows_split from './20260803_090000_garage_branch_rows_split';
import * as migration_20260803_100000_garage_branch_rows_name from './20260803_100000_garage_branch_rows_name';
import * as migration_20260803_110000_garage_branch_rows_category_all_general from './20260803_110000_garage_branch_rows_category_all_general';

export const migrations = [
  {
    up: migration_20260608_174533.up,
    down: migration_20260608_174533.down,
    name: '20260608_174533',
  },
  {
    up: migration_20260609_061054.up,
    down: migration_20260609_061054.down,
    name: '20260609_061054',
  },
  {
    up: migration_20260609_130000.up,
    down: migration_20260609_130000.down,
    name: '20260609_130000',
  },
  {
    up: migration_20260610_000000.up,
    down: migration_20260610_000000.down,
    name: '20260610_000000',
  },
  {
    up: migration_20260802_100554_add_garage_branches.up,
    down: migration_20260802_100554_add_garage_branches.down,
    name: '20260802_100554_add_garage_branches'
  },
  {
    up: migration_20260803_070000_garage_branches_row_category.up,
    down: migration_20260803_070000_garage_branches_row_category.down,
    name: '20260803_070000_garage_branches_row_category'
  },
  {
    up: migration_20260803_080000_garage_branches_category_default_general.up,
    down: migration_20260803_080000_garage_branches_category_default_general.down,
    name: '20260803_080000_garage_branches_category_default_general'
  },
  {
    up: migration_20260803_090000_garage_branch_rows_split.up,
    down: migration_20260803_090000_garage_branch_rows_split.down,
    name: '20260803_090000_garage_branch_rows_split'
  },
  {
    up: migration_20260803_100000_garage_branch_rows_name.up,
    down: migration_20260803_100000_garage_branch_rows_name.down,
    name: '20260803_100000_garage_branch_rows_name'
  },
  {
    up: migration_20260803_110000_garage_branch_rows_category_all_general.up,
    down: migration_20260803_110000_garage_branch_rows_category_all_general.down,
    name: '20260803_110000_garage_branch_rows_category_all_general'
  },
];
