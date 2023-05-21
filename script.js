// audio 시작 정지 convas로 구현
var convas_play = document.getElementById("canvas_play");
var ctx = convas_play.getContext("2d");
function play(c) {
    c.clearRect(0, 0, 20, 20);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, 20);
    c.lineTo(20, 10);
    c.lineTo(0, 0);
    c.closePath();
    c.fillStyle = "#d3d3d3";
    c.fill();
    c.stroke();
}
function pause(c) {
    c.clearRect(0, 0, 20, 20);
    c.beginPath();
    c.rect(0, 0, 7, 20);
    c.rect(13, 0, 20, 20);
    c.fillStyle = "#d3d3d3";
    c.fill();
}
function on_hover() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.stroke();
}
function out_hover() {
    ctx.fillStyle = "#d3d3d3";
    ctx.fill();
    ctx.stroke();
}
play(ctx);
var play_flag = false;
convas_play.onclick = function () {
    if (play_flag) {
        var autio = document.getElementById("autio");
        audio.pause();
        play(ctx);
        play_flag = false;
    } else {
        audio.play();
        pause(ctx);
        play_flag = true;
    }
}
// -- audio 관련 설정 --

// 페이지 전환
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var ios = document.getElementById("ios");
var technology = document.getElementById("technology");
var futurePlan = document.getElementById("futurePlan");
ios.onclick = function () {
    page1.style.display = 'block'
    page2.style.display = 'none'
    page3.style.display = 'none'
}
technology.onclick = function () {
    page1.style.display = 'none'
    page2.style.display = 'block'
    page3.style.display = 'none'
}
futurePlan.onclick = function () {
    page1.style.display = 'none'
    page2.style.display = 'none'
    page3.style.display = 'block'
}
// -- 페이지 전환 --

// 역량 마우스 올리면 숨겨진 p태그를 보여주고 z인덱스를 위로
var competence = document.getElementsByClassName("competence");
for (i = 0; i < 6; i++) {
    competence[i].style.zIndex = i;
    competence[i].querySelector('p').style.visibility = 'hidden';

    competence[i].onmouseover = function () {
        this.querySelector('p').style.visibility = 'visible';
        this.style.zIndex = 10;
    }

    competence[i].onmouseout = function () {
        this.querySelector('p').style.visibility = 'hidden';
        this.style.zIndex = this.dataset.index;
    }

    competence[i].dataset.index = i;
}
// -- 역량 마우스 이벤트 --

// 공부 시간표
var ary = ['<br>기초', '<br>기초', '<br>프로젝트', '<br>디자인', '<br>개발', '<br>개발', '<br>개발', '<br>테스트', '<br>배포'];
var color_ary = ['#FAEDCD', '#FAEDCD', '#FEFAE0', '#E9EDC9', '#CCD5AE', '#CCD5AE', '#CCD5AE', '#BBD6B8', '#94AF9F'];
var aryContent = ['<h3>1. 기초 지식 습득 (2주간)</h3><hr><p>인프런 강의 누구나 할 수 있는 - SwiftUI Basic with iOS 16 을 수강<br>iOS 개발 기초 개념 학습: iOS 앱 개발 환경, Swift 언어, Xcode IDE 등에 대한 이해<br>Swift 언어 학습: 문법, 데이터 타입, 조건문, 반복문 등 기본 개념 학습<br>UIKit 또는 SwiftUI 기초 학습: 인터페이스 구성, 뷰 관리, 이벤트 처리 등에 대한 기본적인 이해</p>', '<h3>2. 프로젝트 구성 (1주간)</h3><hr><p>간단한 iOS 앱 프로젝트 아이디어 도출<br> 프로젝트 구성: 프로젝트 디렉토리 구조, 버전 관리 시스템 설정</p>', '<h3>3. UI/UX 디자인 (1주간)</h3><hr><p>디자인 툴 활용: Sketch, Figma, Adobe XD 등을 사용하여 앱의 기획과 디자인 구성<br>인터페이스 디자인: 레이아웃, 컬러 팔레트, 아이콘 등의 디자인 요소 결정</p>', '<h3>4. 기능 개발 (3주간)</h3><hr><p>프로젝트에 필요한 기능 개발: 데이터 처리, 네트워킹, 사용자 입력 처리, 데이터베이스 연동<br>UIKit 또는 SwiftUI를 활용한 UI 구현<br>필요한 프레임워크 및 라이브러리 사용: Alamofire, Firebase, Core Data 등</p>', '<h3>5. 테스트 및 디버깅 (1주간)</h3><hr><p>단위 테스트: 기능별로 단위 테스트 작성 및 실행<br>디버깅: 앱의 버그 및 오류를 찾아 수정</p>', '<h3>6. 완성 및 배포 (1주간)</h3><hr><p>마무리 작업: 앱 아이콘, 스플래시 화면 등의 추가 작업<br>앱 스토어 등록 준비: 앱 설명, 스크린샷, 앱 버전 관리<br>앱 배포: 앱 스토어에 앱을 등록하고 배포</p>'];

function mkcal() {
    // 동적으로 생성된 div 모두 삭제
    var obj = document.getElementById("calendar");
    var schedule = document.getElementById("schedule");
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
    while (schedule.firstChild) {
        schedule.removeChild(schedule.firstChild);
    }

    var input_startDay = document.getElementById("input_startDay");
    
    // 정규식을 이용하여 입력된 문자열(날짜)가 제대로 되었는지 확인
    var exitFlag = true;
    var dataRegex = [/^\d{4}-\d{1}-\d{1}$/, /^\d{4}-\d{1}-\d{2}$/, /^\d{4}-\d{2}-\d{1}$/, /^\d{4}-\d{2}-\d{2}$/];
    for (i = 0; i < dataRegex.length; i++) {
        if (dataRegex[i].test(input_startDay.value)) {
            exitFlag = false;
        }
    }
    if (exitFlag) {
        alert('잘못된 입력');
    } else {
        var index_cal_header = ['일', '월', '화', '수', '목', '금', '토'];

        for (i = 0; i < index_cal_header.length; i++) {
            mk_cal_heaer(obj, index_cal_header[i]);
        }
        // ex)2023-07-01
        var startDay = new Date(input_startDay.value).getDay();
        // 시작하는 요일을 가져와서 빈 div생성 후 삽입
        for (i = 0; i < startDay; i++) {
            var newDIV = document.createElement("div");
            newDIV.setAttribute("class", "calendar_day");
            obj.appendChild(newDIV);
        }
        // 시작 날짜와 달의 마지막 날짜를 가져와 div생성 후 삽입
        var startDate = new Date(input_startDay.value).getDate();
        var lastDate = new Date(new Date(input_startDay.value).getFullYear(), new Date(input_startDay.value).getMonth() + 1, 0).getDate();
        if ((new Date(input_startDay.value).getMonth() + 1) == 12) {
            var lastDate2 = new Date(new Date(input_startDay.value).getFullYear() + 1, 1, 0).getDate();
        } else {
            var lastDate2 = new Date(new Date(input_startDay.value).getFullYear(), new Date(input_startDay.value).getMonth() + 2, 0).getDate();
        }
        if ((new Date(input_startDay.value).getMonth() + 1) == 11) {
            var lastDate3 = new Date(new Date(input_startDay.value).getFullYear() + 1, 2, 0).getDate();
        } else if ((new Date(input_startDay.value).getMonth() + 1) == 12) {
            var lastDate3 = new Date(new Date(input_startDay.value).getFullYear() + 1, 2, 0).getDate();
        } else {
            var lastDate3 = new Date(new Date(input_startDay.value).getFullYear(), new Date(input_startDay.value).getMonth() + 3, 0).getDate();
        }
        var cnt = 0;
        var end = 63;
        for (i = startDate; i <= lastDate; i++) {
            var newDIV = document.createElement("div");
            if (i == startDate) {
                newDIV.innerHTML = new Date(input_startDay.value).getMonth() + 1 + '.' + i + ary[Math.floor(cnt / 7)];
            } else {
                newDIV.innerHTML = i + ary[Math.floor(cnt / 7)];
            }
            newDIV.style.backgroundColor = color_ary[Math.floor(cnt / 7)];
            newDIV.setAttribute("class", "calendar_day");
            obj.appendChild(newDIV);
            cnt++;
        }
        for (i = 1; i <= lastDate2; i++) {
            var newDIV = document.createElement("div");
            if (i == 1) {
                if (new Date(input_startDay.value).getMonth() + 2 == 13) {
                    newDIV.innerHTML = 1 + '.' + i + ary[Math.floor(cnt / 7)];
                } else {
                    newDIV.innerHTML = new Date(input_startDay.value).getMonth() + 2 + '.' + i + ary[Math.floor(cnt / 7)];
                }
            } else {
                newDIV.innerHTML = i + ary[Math.floor(cnt / 7)];
            }
            newDIV.style.backgroundColor = color_ary[Math.floor(cnt / 7)];
            newDIV.setAttribute("class", "calendar_day");
            obj.appendChild(newDIV);
            cnt++;
        }
        for (i = 1; i <= lastDate3; i++) {
            var newDIV = document.createElement("div");
            if (i == 1) {
                if (new Date(input_startDay.value).getMonth() + 3 == 13) {
                    newDIV.innerHTML = 1 + '.' + i + ary[Math.floor(cnt / 7)];
                } else if (new Date(input_startDay.value).getMonth() + 3 == 14) {
                    newDIV.innerHTML = 2 + '.' + i + ary[Math.floor(cnt / 7)];
                }
                else {
                    newDIV.innerHTML = new Date(input_startDay.value).getMonth() + 3 + '.' + i + ary[Math.floor(cnt / 7)];
                }
            } else {
                newDIV.innerHTML = i + ary[Math.floor(cnt / 7)];
            }
            newDIV.style.backgroundColor = color_ary[Math.floor(cnt / 7)];
            newDIV.setAttribute("class", "calendar_day");
            obj.appendChild(newDIV);
            cnt++;
            if (cnt == end) {
                break;
            }
        }

        // 일정 내용 div 생성 삽입 함수 호출
        for (i = 0; i < aryContent.length; i++) {
            mk_content(schedule, i);
        }

    }


}

// 시간표 헤더 div를 만들어 삽입하는 함수
function mk_cal_heaer(obj, day) {
    var newDIV = document.createElement("div");
    newDIV.innerHTML = day;
    newDIV.setAttribute("class", "calendar_header");
    obj.appendChild(newDIV);
}

// 일정 내용 div를 만들어 삽입하는 함수
function mk_content(obj, index) {
    var newDIV = document.createElement("div");
    newDIV.innerHTML = aryContent[index];
    newDIV.setAttribute("class", "inner");
    newDIV.style.backgroundColor = color_ary[index];
    obj.appendChild(newDIV);
}
// -- Future Plan --

// 화면 상단으로 이동 버튼 클릭시 실행되는 함수
function go_top() {
    window.scrollTo(0, 0);
}
// -- 상단 이동 --