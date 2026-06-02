# 협업 가이드라인 (Contributing Guidelines)

본 문서는 원활한 협업과 코드 유지보수를 위한 깃(Git) 사용 규칙 및 컨벤션을 정의합니다.

## 1. 브랜치 전략 (Branching Strategy)
**GitHub Flow**를 기반으로 하며, 모든 작업은 `main` 브랜치에서 파생된 개별 `feature` 브랜치에서 진행한 후 Pull Request(PR)를 통해 병합합니다.

* `main` : 언제든 배포 가능한 상태를 유지하는 메인 브랜치
* `feature/이슈번호-작업내용` : 새로운 기능 개발 및 버그 수정을 위한 브랜치 (예: `feature/2-header-design`)

### 작업 프로세스
1. GitHub에서 **Issue**를 생성합니다.
2. 해당 이슈에 대한 브랜치를 생성합니다. (`git checkout -b feature/#이슈번호-간단한설명`)
3. 작업 및 커밋 진행
4. 원격 저장소에 Push (`git push origin feature/#이슈번호-간단한설명`)
5. GitHub에서 **Pull Request** 생성 및 리뷰 후 `main` 브랜치로 Merge
6. 머지된 브랜치는 삭제하여 저장소를 깔끔하게 유지합니다.

## 2. 커밋 메시지 규칙 (Commit Message Convention)
커밋 메시지는 작업 내용을 명확하게 파악할 수 있도록 아래의 Prefix(접두사)를 사용하여 작성합니다.

* `feat:` : 새로운 기능 추가
* `fix:` : 버그 수정
* `docs:` : 문서 수정 (README.md, docs/ 등)
* `style:` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 (CSS UI 변경 포함)
* `refactor:` : 코드 리팩토링 (기능 변화 없음)
* `test:` : 테스트 코드, 리팩토링 테스트 코드 추가
* `chore:` : 빌드 업무 수정, 패키지 매니저 수정 (.gitignore, 설정 파일 등)

**예시:**
> feat: 메인 페이지 반응형 네비게이션 바 추가 (#3)
> fix: 모바일 뷰에서 이미지 깨짐 현상 수정 (#4)

## 3. Pull Request (PR) 가이드
* PR 제목은 커밋 컨벤션과 동일한 형태로 작성합니다. (예: `feat: 카카오 채널 링크 버튼 추가`)
* 내용에는 **어떤 문제를 해결했는지**, **어떻게 테스트했는지**를 작성합니다.
* 관련된 Issue가 있다면 PR 본문에 `Fixes #이슈번호` 또는 `Resolves #이슈번호`를 적어 머지 시 이슈가 자동으로 닫히도록 합니다.
