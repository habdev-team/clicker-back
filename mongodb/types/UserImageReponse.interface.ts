export interface UserImageReponse {
  ok: boolean;
  result: {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    file_path: string;
  };
}
