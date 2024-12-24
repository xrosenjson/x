export interface MagnetFile {
  path: string;
  size: number;
  index: number;
}

export interface MagnetLink {
  id: number;
  hash: string;
  title: string;
  size: number;
  files: MagnetFile[];
  created_by: number;
  created_at: string;
}

export interface MagnetLinkList {
  links: MagnetLink[];
  total: number;
}

export interface StreamInfo {
  stream_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  duration?: number;
}

export interface MagnetLinkParseResponse {
  magnet_link: MagnetLink;
  stream_info?: StreamInfo;
}
