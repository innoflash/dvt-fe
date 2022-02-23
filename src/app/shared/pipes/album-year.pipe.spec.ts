import { AlbumYearPipe } from './album-year.pipe';

describe('AlbumYearPipe', () => {

  let pipe: AlbumYearPipe;
  beforeEach(() => pipe = new AlbumYearPipe());
  it('create an instance', () => expect(pipe).toBeTruthy());

  it('should get a year from the release date', () => expect(pipe.transform('2020-12-23')).toBe('2020'));
});
