import * as migration_20261027_122448_initial from './20261027_122448_initial';
import * as migration_20261027_125227_homepage_v2_blocks from './20261027_125227_homepage_v2_blocks';
import * as migration_20261103_071149_ranges_banners_posts from './20261103_071149_ranges_banners_posts';
import * as migration_20261103_072216_drop_product_line from './20261103_072216_drop_product_line';

export const migrations = [
  {
    up: migration_20261027_122448_initial.up,
    down: migration_20261027_122448_initial.down,
    name: '20261027_122448_initial',
  },
  {
    up: migration_20261027_125227_homepage_v2_blocks.up,
    down: migration_20261027_125227_homepage_v2_blocks.down,
    name: '20261027_125227_homepage_v2_blocks',
  },
  {
    up: migration_20261103_071149_ranges_banners_posts.up,
    down: migration_20261103_071149_ranges_banners_posts.down,
    name: '20261103_071149_ranges_banners_posts',
  },
  {
    up: migration_20261103_072216_drop_product_line.up,
    down: migration_20261103_072216_drop_product_line.down,
    name: '20261103_072216_drop_product_line'
  },
];
