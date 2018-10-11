import { createAction } from 'AppUtils';

export const OMIT_COLONY = 'colonies/OMIT_COLONY';

export const colonyActionCreators = {
  omitColony: createAction(OMIT_COLONY),
}
