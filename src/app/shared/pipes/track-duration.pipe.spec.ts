import { TrackDurationPipe } from './track-duration.pipe';

describe('TrackDurationPipe', () => {
  let pipe: TrackDurationPipe;
  beforeEach(() => pipe = new TrackDurationPipe());

  it('create an instance', () => expect(pipe).toBeTruthy());

  it('should transform a time', () => expect(pipe.transform(90)).toBe('01:30'));

  it('should pad minutes on time', () => expect(pipe.transform(40)).toBe('00:40'));

  it('should pad seconds on time', () => expect(pipe.transform(3)).toBe('00:03'));
});
