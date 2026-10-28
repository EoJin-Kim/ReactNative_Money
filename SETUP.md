# 프로젝트 구조 설정 가이드

이 문서는 POC Bank 아키텍처를 기반으로 프로젝트 구조를 설정하는 과정을 기록합니다.

## 요청

POC Bank 프로젝트의 아키텍처 문서(`/Users/kej/ReactNative/poc-bank/ARCHITECTURE.md`)를 기반으로 프로젝트 구조를 적용 요청



## 유의사항
    - DeeplinkProvider, ToastProvider, LoadingProvider, QueryProvider 해당 프로바이더 적용
    - 최대한 전체적으로 샘플 파일 만들기(api, screen 등등)
    - IntroScreen.tsx 랑 화면당 커스텀 훅 전부 적용해줘
    - package.json 필요 라이브러리 추가
    - SETUP.MD은 agent 수정불가
    - 결과는 AGENT_RESULT.MD 파일에 적용

## 이슈사항
    - 동일한 명령어를 실행시켜도 결과값이 일정하지 않다.(같은 요청 다른 결과값)
    - 기존 참고했던 프로젝트 코드에서 없는 코드들을 AI 가 만들어서 추가해놓는다.
    - 아키텍쳐 가지고 올때 같은 파일가져오는 경우도 있고 파일이름만 갖고 내부 코드는 다른 경우 발생
    - 안가지고 오는 코드들이 너무 많다