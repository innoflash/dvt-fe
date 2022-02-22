import { ArtistFanCountPipe } from './artist-fan-count.pipe';

describe('ArtistFanCountPipe', () => {
  it('create an instance', () => {
    const pipe = new ArtistFanCountPipe();
    expect(pipe).toBeTruthy();
  });
});
