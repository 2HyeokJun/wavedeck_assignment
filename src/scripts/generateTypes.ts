import { convertFromDirectory } from "joi-to-typescript";

async function generateTypes() {
  console.log("Generating TypeScript interfaces from Joi schemas...");

  const result = await convertFromDirectory({
    schemaDirectory: "./src/schemas", // Joi 스키마가 있는 디렉토리
    typeOutputDirectory: "./src/types/generated", // 생성된 인터페이스를 저장할 디렉토리
    debug: true, // 디버그 정보 출력
    defaultToRequired: false, // 필수가 아닌 경우 optional로 처리
    useLabelAsInterfaceName: false, // .meta({className: ''}) 사용
    fileHeader:
      "/* 이 파일은 joi-to-typescript에 의해 자동 생성되었습니다. 수동으로 수정하지 마세요. */",
    sortPropertiesByName: true, // 속성을 알파벳 순으로 정렬
  });

  if (result) {
    console.log("타입 생성 성공!");
  } else {
    console.error("타입 생성 실패!");
  }
}

generateTypes().catch(console.error);
