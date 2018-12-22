import { createSelector } from 'reselect'
const getUserCreatedUtc = state => state.user.created_utc;

export const getUserEligible = createSelector(
    getUserCreatedUtc,
    createdUtc => createdUtc < 1525132800 // only account before aug 1st
  )
  