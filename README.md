## CRA 로 앱 생성 후 npm test 실행 시 에러 발생

### 해결방법

```
    npm install -D jest-watch-typeahead@0.6.5
```

## 1. 테스팅의 이유

### 왜 어플리케이션을 TEST 해야되는가?

```
간단하게 더 안정적인 어플리케이션을 위해서는 여러 방법으로 테스트를 해줘야
더 안정적인 어플리케이션이 될 수 있다.
```

### 테스팅으로 얻는 이점은 무엇인가?

```
1. 디버깅 시간을 단축 해준다. 만약 데이터가 잘못 나왔다면,
    그것이 UI의 문제인지 DB의 문제 인지 전부 테스트를 해서 찾아야하는데,
    테스트 환경이 구축되어 있다면 자동화 된 유닛 테스트로 특정 버그를 쉽게
    찾아낼 수 있다.
2. 더욱 안정적인 어플리케이션. 많은 테스트코드와 함께 작성된 코드의 어플리케이션이
    되기 때문에 훨씬 안정적인 어플리케이션이 된다.
3. 이밖에도 재설계 시간의 단축, 추라고 무언가를 더 구현해야 할 때 더 용이하게
    할 수 있는 등의 이점들이 있다.
```

## 2. React Testing Library

```
    Create Reat App 으로 리액트 프로젝트를 생성하면 기본적으로
    테스팅할 때 React Testing Library를 사용하는 것을 볼 수 있다.
    그럼 이 React Testing Library는 무엇일까?
```

[공식문서](https://testing-library.com/docs/react-testing-library/intro/)

### React Testing Library란 무엇인가?

```
    React Testing Library는 React 구성 요소 작업을 위한 API를 추가하여
    DOM Testing Library 위에 구축된다.

    DOM Testing Library란 Dom 노드(Node)를 테스트하기 위한 매우 가벼운
    솔루션이다.

    Create React App으로 생성된 프로젝트는 즉시 React Testing Library
    를 지원한다. 그렇지 않은 경우 다음과 같이 npm 을 통해서 추가할 수 있다.

    * npm install --save-dev @testing-library/react

    RTL은 에어비앤비에서 만든 Enzyme을 대처하는 솔루션이다.
    Enzyme이 React 개발자에게 React 구성 요소의 내부를 테스트 할 수 있는
    유틸리티를 제공하는 동안 React Testing Library는 한 걸음 물러서서
    "React 구성 요소를 테스트하여 React 구성 요소를 완전히 신뢰하는 방법"
    에 대해 질문한다.
    구성 요소의 구현 세부 정보를 테스트하는 대신 React Testing Library
    개발자를 React 애플리케이션 사용자 입장에 둔다.

    Enzyme -> 구현 주도 테스트(Implementation Driven Test)
    React Testing Library -> 행위 주도 테스트(Behavior Driven Test)

    React Testing Library 와 Enzyme 의 차이는
    RTL의 경우 A 컴포넌트와 B 컴포넌트끼리 어떠한 행위를 테스트 하는 것.
    어떠한 기능이, 어떠한 행위가 이루어지고 있는지를 테스트 함.

    Enzyme 같은 경우는
    A 컴포넌트와 B 컴포넌트가 기능을 만들 때, props를 교환을 하면서 만들텐데.
    A 컴포넌트에서는 state가 흐르면서 기능을 만들 것이고,
    B 컴포넌트에서도 state가 흐르면서 기능을 만들 것인데.
    이 때 흐르는 props 나 state를 교환하는 부분을 구현해서 테스트를 하는 것이다.
```

## 3. DOM 이란?

```
    Document -> 문서
    Object -> 객체
    model -> 모델
    DOM(문서 객체 모델)은 XML, HTML 문서의 각 항목을 계층으로 표현하여,
    생성, 변형, 삭제할 수 있도록 돕는 인터페이스다.
```

### 웹 페이지 빌드 과정(Critical Rendering Path CRP)

```
    브라우저가 서버에서 페이제애 대한 HTML 응답을 받고,
    화면에 표시하기 전에 여러 단계가 있다.

    웹 브라우저가 HTML 문서를 읽고, 스타일 입히고 뷰포트에 표시하는 과정이다.
    HTML ---> DOM             Accessibility Tree
            JS  +--> RenderTree -> Layout -> Paint
    CSS  ---> CSSOM
        1       ->      2       ->   3     ->  4

    1. 문서를 읽어들여서 그것들을 파싱하고 어떤 내용을 페이지에 렌더링할지 결정한다.
    (HTML, CSS) + JS
    2. 이 단계는 브라우저가 DOM과 CSSOM을 겹합하는 곳이며, 이 프로세스는 화면에
    보이는 모든 콘텐츠의 콘텐츠와 스타일 정보를 모두 포함하는 최종 렌더링 트리를 출력한다.
    즉 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보를 포함한다.
    3. 이 단계는 브라우저가 페이지에 표시되는 각 요소의 크기와 위치를 계산하는 단계
    4. 페인트 단계에 도달하면 브라우저는 레이아웃과 결과를 선택하고 픽셀을 화면에
    페인트해야한다.


    브라우저에 url을 입력할 경우 서버에서 HTML 문서를 보내준다.
    HTML 문서를 파싱해서 Bytes 부터 시작해서 돔트리를 그리기 시작한다.
    처음에는 Bytes로 문자열을 만든다.
    예시 -> <html><head></head><body></body></html>
    그리고 문자열을 HTML 표준에 따라서 토큰으로 변경한다.
    예시 -> [StratTag: html] [StartTag:head] ... [EndTag:head] ... [EndTag: html]
    그리고 이 토큰들을 노드로 변경하고, 노드들을 트리 형식으로 돔트리를 생성한다.

    DOM -> HTML 요소들의 구조화된 표현
    DOM은 HTML이 브라우저의 렌더링 엔진에 의해 분석되고 분석이 모두 끝나고 난
    HTML파일이 DOM이다.

    HTML은 화면에 보이고자 하는 모양과 구조를 문서로 만들어서 단순 텍스트로
    구성되어있으며 DOM은 HTML문서의 내용과 구조가 객체 모델로 변화되어 다양한 프로그램에서
    사용될 수 있다.

    HTML 문서가 유효하지 않게 작성됐을때는 브라우저가 올바르게 교정 해주며,
    DOM은 자바스크립트에 의해 수정될 수 있다. 하지만 HTML은 수정하지 않는다.
```

## Jest에 대하여

### Jest란 무엇인가?

```
    FaceBook에 의해서 만들어진 테스팅 프레임 워크이다.
    최소한의 설정으로 동작하여 Test Case를 만들어서 어플리케이션 코드가
    잘 돌아가는지 확인해준다.
    단위 (Unit) 테스트를 위해서 이용한다.
```

### Jest 시작하기

```
    1. Jest 라이브러리 설치 npm install jest --seve-dev
    2. Test 스크립트 변경  "test": "jest" or "jest-watchAll"
    3. 테스트 작성할 폴더 및 파일 기본 구조 생성
               (Unit Test)      <대상 이름>.test.js
         ---> 단위 테스트 폴더 --> 단위 테스트 파일
    Test +
         ---> 통합 테스트     --> 통합 테스트
        (Intergration Test)    <대상 이름>.test.init.js

    Jest가 Test 파일을 찾는 방법

                    -> {filename}.<test>.js
    TRYING TO FIND  -> {filename}.<spec>.js
                    -> All files inside "tests" folders
```

## 쿼리 함수에 대해서

[공식문서](https://testing-library.com/docs/queries/about/)

### 쿼리 함수란?

```
     get, find, query의 차이점

     쿼리는 '페이지에서 요소를 찾기 위해' 테스트 라이브러리가 제공하는 방법이다.
     여러 유형의 쿼리('get', 'find', 'query')가 있다. 이들 간의 '차이점'은
     요소가 발견되지 않으면 쿼리에서 오류가 발생하는지 또는 Promise를 반환하고
     다시 시도하는지 여부이다. 선택하는 페이지 콘텐츠에 따라 다른 쿼리가 다소 적적할 수
     있다.

    'getBy...' : 쿼리에 대해 일치하는 노드를 반환하고
    일치하는 요소가 없거나 둘 이상의 일치가 발견되면 설명 '오류를 발생'시킨다.
    (둘 이상의 요소가 예상되는 경우 대신 getAllBy 사용)

    'queryBy...' : 쿼리에 대해 일치하는 노드를 반환하고
    일치하는 '요소가 없으면 null'을 반환한다.
    이것은 존재하지 않는 요소를 어설션하는데 유용하다.
    둘 이상의 일치 항목이 발견되면 오류가 발생한다.
    (확인된 경우 대신 queryAllBy 사용)

    'findBy' : 주어진 쿼리와 일치하는 요소가 발견되면 해결되는
    'Promise'를 반환한다. 요소가 발견되지 않거나 기본 제한 시간인
    1000ms 후에 둘 이상의 요소가 발견되면 약속이 거부된다.
    (둘 이상의 요소를 찾아야 하는 경우 findAllBy를 사용)

     "render" 함수
      DOM에 컴포넌트를 렌더링하는 함수
      인자로 렌더링할 React 컴포넌트가 들어감
      Return은 TRL에서 제공하는 쿼리 함수와 기타 유틸리티 함수를 담고 있는 객체를 리턴
      (Destructuring 문법으로 원하는 쿼리 함수만 얻어올 수 있다.)
      ==> 소스 코드가 복잡해지면 비추천 -> screen 객체를 사용하기
      왜냐하면 사용해야할 쿼리가 많아질수록 코드가 복잡해질 수 있다.
```

## 테스트 주도 개발(Test Driven Development)

### Test Driven Development란 무엇인가?

```
    실제 코드를 작성하기 전에 테스트 코드를 먼저 작성한다.
    테스트 코드를 작성한 후 그 테스트 코드를 Pass 할 수 있는 실제 코드를 작성한다.

    원하고자 하는 기능의 테스트 코드 작성 -> 테스트 실행 Fail ->
    테스트 코드에 맞는 실제 코드 작성 -> 테스트 실행 Pass
```

### TDD를 하면 좋은 점

```
    1. TDD를 하므로 인해 많은 테스트하기에 소스 코드에 안정감이 부여된다.
    2. 실제 개발하면서 많은 시간이 소요되는 부분은 디버깅 부분이기에 TDD를 사용하면
    디버깅 시간이 줄어들고 실제 개발 시간도 줄어든다.
    3. 소스 코드 하나하나를 더욱 신중하게 짤 수 있기 때문에 깨끗한 코드가 나올 확률이
    높다.
```

### FireEvent API

[공식문서](https://testing-library.com/docs/dom-testing-library/api-events/)

```
    유저가 발생시키는 액션(이벤트)에 대한 테스트를 해야하는 경우 사용한다.
```

## 더 나은 리액트 테스트를 위해 참고할 것들

### Query 사용 우선 순위

[공식문서](https://testing-library.com/docs/queries/about/#proiority)

```
    screen.getByTestId()
    현재까지는 getByTestId 쿼리를 이용해서 엘레멘트에 접근해서 테스트를 진행했는데,
    이 방법이 편리하긴 하지만 testing library에서 추천하는 쿼리 사용 우선 순위가
    있기 때문에 위에 링크를 한번 보고 가도록 하자.
```

### userEvent -> fireEvent

[참고문서](https://github.com/testing-library/user-event/blob/5feaa942f46bb37d96c2f2fbeb4b33e8beff75ad/src/click.js#L87-L103)

```
    이전에 테스팅에서 버튼을 클릭했을 때 fireEvent API를 사용했다.
    이때 fireEvent를 사용해서 잘 처리를 해줬지만 userEvent API를
    사용하는게 더 좋은 방법이다. fireEvent.click() < userEvent.click()

    userEvent
    userEvent는 fireEvent를 사용해서 만들어졌다. userEvent의 내부 코드를 보면
    fireEvent를 사용하면서 엘리먼트의 타입에 따라서 Label을 클릭 했을 때,
    checkbox, radio를 클릭했을 때 그 엘리먼트 타입에 맞는 더욱 적절한 반응을
    보여준다.

    예를 들어서 fireEvent 로 버튼을 클릭하면 fireEvent.click(button) 버튼이
    focus되지 않는다. 하지만 userEvent로 클릭하면 userEvent.click(button)
    버튼이 focuse가 된다. 이렇게 실제 사용하는 유저가 보기에 실제 버튼을
    클릭하는 행위가 더 잘 표현되기 때문에 userEvent를 사용하는게 더 좋은 방법이다.
```
