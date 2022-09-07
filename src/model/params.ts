export interface params {
  DialogTitle: string;
  IsShow: boolean;
  DialogFlag: number;
}

export interface code {
  key: string;
  content: string;
}

export interface codeHeader {
  key: string;
  language: string;
  content: string;
}

export interface codeFileParam {
  header_content: string;
  language: string;
  header_filters: string[];
  content_filters: string[];
  content_keys: string[];
  contents_num: number;
  content_title: string;
}
