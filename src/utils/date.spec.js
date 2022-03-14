import { addDays, toIsoString } from './date';

describe('toIsoString', () => {
  it('returns the date as a string in YYYY-MM-DD format', () => {
    const date = new Date(2022, 1, 2);
    expect(toIsoString(date)).toEqual('2022-02-02');
  });
});

describe('addDays', () => {
  it('adds a number of days to the date', () => {
    const date = new Date(2022, 1, 7);
    expect(addDays(date, 1)).toEqual(new Date(2022, 1, 8));
  });

  it('can sutract a number of days to the date', () => {
    const date = new Date(2022, 1, 7);
    expect(addDays(date, -1)).toEqual(new Date(2022, 1, 6));
  });
});
