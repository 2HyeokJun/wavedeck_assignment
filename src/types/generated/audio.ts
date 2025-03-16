/* 이 파일은 joi-to-typescript에 의해 자동 생성되었습니다. 수동으로 수정하지 마세요. */

/**
 * 오디오 파일 삭제 요청 데이터
 */
export interface AudioDeleteRequest {
  audioId: number;
  duration: number;
  fileName: string;
  fileSize: number;
}

/**
 * 오디오 파일 업로드 요청 데이터
 */
export interface AudioUploadRequest {
  duration: number;
  fileName: string;
  fileSize: number;
}
