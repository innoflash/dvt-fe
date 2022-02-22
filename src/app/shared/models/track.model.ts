import { AlbumModel } from './album.model';
import { ArtistModel } from './artist.model';

export interface TrackModel {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  explicit_lyrics: boolean;
  preview: string;
  md5_image: string;
  artist: ArtistModel;
  album: AlbumModel;
}
