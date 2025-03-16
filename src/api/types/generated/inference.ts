/* 이 파일은 joi-to-typescript에 의해 자동 생성되었습니다. 수동으로 수정하지 마세요. */

/**
 * 오디오 파일 AI 변환 서버 응답 데이터
 */
export interface AudioInferenceAIServerResponse {
  convertedPath: string;
  fileSizee: number;
  originalPath: string;
}

/**
 * 오디오 파일 AI 변환 서버간 요청 데이터
 */
export interface AudioInferencePayload {
  originalPath: string;
  pitch: number;
  taskId: number;
  timeOut: number;
  voiceId: number;
}

/**
 * 오디오 파일 AI 변환 요청 데이터
 */
export interface AudioInferenceRequest {
  fileId: number;
  pitch: number;
  timeOut: number;
  voiceId: number;
}
