import { ArtistFanCountPipe } from './artist-fan-count.pipe';

describe('ArtistFanCountPipe', () => {

  let pipe: ArtistFanCountPipe;
  beforeEach(() => pipe = new ArtistFanCountPipe());

  it('create an instance', () => expect(pipe).toBeTruthy());

  it('should show no fans if non provided', () => expect(pipe.transform(undefined)).toBe('No fans'));

  it('should show 1 fan when artist has one', () => expect(pipe.transform(1)).toBe('1 fan'));

  it('should not format less than 1000 fans', () => {
    expect(pipe.transform(50)).toBe('50 fans');
    expect(pipe.transform(999)).toBe('999 fans');
  });

  it('should format thousands of fans to K fans', () => {
    expect(pipe.transform(1000)).toBe('1k fans');
    expect(pipe.transform(104900)).toBe('105k fans');
    expect(pipe.transform(999999)).toBe('1M fans');
  });

  it('should format millions of fans to M fans', () => {
    expect(pipe.transform(1000000)).toBe('1M fans');
    expect(pipe.transform(104900000)).toBe('105M fans');
    expect(pipe.transform(999999999)).toBe('1B fans');
  });

  it('should format billions of fans to B fans', () => {
    expect(pipe.transform(1000000000)).toBe('1B fans');
    expect(pipe.transform(10000000000)).toBe('10B fans');
  });
});
