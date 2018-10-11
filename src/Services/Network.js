import { images } from './images';
import { colonies } from './coloniesService';
import { colony } from './colony';
import { drafts } from './drafts';
import { posts } from './postsService' ;
import { profileColony } from './profileColony';
import { recaptcha } from './recaptcha';
import { tidbitQueue } from './tidbitQueue';
import { liveTidbits } from './liveTidbits';

const Network = {
  service: {
    images,
    colonies,
    drafts,
    posts,
    colony,
    profileColony,
    recaptcha,
    tidbitQueue,
    liveTidbits,
  }
}

export { Network };
