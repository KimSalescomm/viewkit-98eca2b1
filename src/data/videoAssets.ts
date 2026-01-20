/**
 * 비디오 및 썸네일 URL 중앙 관리 파일
 * 
 * 운영자가 영상/썸네일을 교체하려면 이 파일의 URL만 수정하면 됩니다.
 * 
 * 사용법:
 * 1. Lovable Cloud Storage에 영상/썸네일 업로드
 * 2. 아래 URL을 업로드된 파일 URL로 교체
 * 
 * 폴더 구조 예시:
 * /balance/q1/a.mp4, /balance/q1/b.mp4 (영상)
 * /balance/q1/a.jpg, /balance/q1/b.jpg (썸네일)
 */

export interface VideoAsset {
  id: string;
  label: string;
  videoUrl: string;
  posterUrl: string;
}

export interface QuestionAssets {
  questionId: string;
  questionLabel: string;
  optionA: VideoAsset;
  optionB: VideoAsset;
}

/**
 * 질문별 영상 에셋 정의
 * - 로컬 파일은 /videos/ 폴더에 저장
 * - Lovable Cloud Storage 사용 시 해당 URL로 교체
 */
export const questionVideoAssets: QuestionAssets[] = [
  {
    questionId: "q1",
    questionLabel: "Balance 질문 1",
    optionA: {
      id: "q1_a",
      label: "선택지 A",
      // TODO: 실제 영상 URL로 교체
      videoUrl: "/videos/balance/q1/a.mp4",
      posterUrl: "/videos/balance/q1/a.jpg",
    },
    optionB: {
      id: "q1_b",
      label: "선택지 B",
      // TODO: 실제 영상 URL로 교체
      videoUrl: "/videos/balance/q1/b.mp4",
      posterUrl: "/videos/balance/q1/b.jpg",
    },
  },
  {
    questionId: "q2",
    questionLabel: "Balance 질문 2",
    optionA: {
      id: "q2_a",
      label: "선택지 A",
      videoUrl: "/videos/balance/q2/a.mp4",
      posterUrl: "/videos/balance/q2/a.jpg",
    },
    optionB: {
      id: "q2_b",
      label: "선택지 B",
      videoUrl: "/videos/balance/q2/b.mp4",
      posterUrl: "/videos/balance/q2/b.jpg",
    },
  },
];

/**
 * 결과 화면용 영상 에셋 (필요 시 사용)
 */
export const resultVideoAssets: VideoAsset[] = [
  {
    id: "result_1",
    label: "결과 영상 1",
    videoUrl: "/videos/results/result1.mp4",
    posterUrl: "/videos/results/result1.jpg",
  },
];

/**
 * Helper: questionId로 에셋 찾기
 */
export const getQuestionAssets = (questionId: string): QuestionAssets | undefined => {
  return questionVideoAssets.find(q => q.questionId === questionId);
};

/**
 * Helper: 결과 영상 ID로 에셋 찾기
 */
export const getResultAsset = (resultId: string): VideoAsset | undefined => {
  return resultVideoAssets.find(r => r.id === resultId);
};
