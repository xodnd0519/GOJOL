// 나중에 워크넷 API 데이터로 교체하기 쉽게 jobs 배열만 분리
const jobs = [
  {
    id: 1,
    company: "에이치소프트",
    title: "웹 프론트엔드 신입 개발자 채용",
    region: "서울",
    jobType: "IT/개발",
    education: "고졸 이상",
    career: "신입",
    salary: "월급 240만원",
    salaryNumber: 240,
    employmentType: "정규직",
    deadline: "2026-05-11",
    link: "https://www.work.go.kr",
    description: "HTML, CSS, JavaScript를 활용한 웹 화면 개발 및 유지보수 업무"
  },
  {
    id: 2,
    company: "블루오피스",
    title: "사무보조 및 회계자료 정리 담당자",
    region: "경기",
    jobType: "사무/회계",
    education: "학력무관",
    career: "경력 관계없음",
    salary: "월급 225만원",
    salaryNumber: 225,
    employmentType: "정규직",
    deadline: "2026-05-20",
    link: "https://www.work.go.kr",
    description: "엑셀을 활용한 문서 정리, 전표 입력, 거래처 자료 관리"
  },
  {
    id: 3,
    company: "인천스마트물류",
    title: "물류센터 입출고 관리 신입 채용",
    region: "인천",
    jobType: "물류",
    education: "고졸 이상",
    career: "신입",
    salary: "월급 230만원",
    salaryNumber: 230,
    employmentType: "계약직",
    deadline: "2026-05-09",
    link: "https://www.work.go.kr",
    description: "상품 입고, 출고 확인 및 재고 수량을 관리하는 업무"
  },
  {
    id: 4,
    company: "부산디자인랩",
    title: "콘텐츠 디자인 보조 채용",
    region: "부산",
    jobType: "디자인",
    education: "학력무관",
    career: "신입",
    salary: "월급 210만원",
    salaryNumber: 210,
    employmentType: "정규직",
    deadline: "2026-05-25",
    link: "https://www.work.go.kr",
    description: "SNS 이미지, 상세페이지, 홍보 배너 디자인 보조 업무"
  },
  {
    id: 5,
    company: "경기테크팩토리",
    title: "생산 품질관리 보조 사원 모집",
    region: "경기",
    jobType: "생산/품질",
    education: "고졸 이상",
    career: "경력 관계없음",
    salary: "월급 260만원",
    salaryNumber: 260,
    employmentType: "정규직",
    deadline: "2026-05-08",
    link: "https://www.work.go.kr",
    description: "제품 상태 확인, 불량 체크, 생산 기록 작성 업무"
  },
  {
    id: 6,
    company: "서울데이터서비스",
    title: "데이터 입력 및 운영 지원",
    region: "서울",
    jobType: "사무/회계",
    education: "학력무관",
    career: "경력 관계없음",
    salary: "월급 218만원",
    salaryNumber: 218,
    employmentType: "정규직",
    deadline: "2026-05-14",
    link: "https://www.work.go.kr",
    description: "고객 정보 입력, 데이터 검수, 간단한 운영 지원 업무"
  },
  {
    id: 7,
    company: "넥스트앱스",
    title: "앱 서비스 QA 테스트 신입",
    region: "서울",
    jobType: "IT/개발",
    education: "고졸 이상",
    career: "신입",
    salary: "월급 235만원",
    salaryNumber: 235,
    employmentType: "정규직",
    deadline: "2026-05-30",
    link: "https://www.work.go.kr",
    description: "앱을 직접 사용해보고 오류를 찾아 개발팀에 전달하는 업무"
  },
  {
    id: 8,
    company: "부산푸드팩",
    title: "식품 포장 생산직 채용",
    region: "부산",
    jobType: "생산/품질",
    education: "학력무관",
    career: "경력 관계없음",
    salary: "월급 205만원",
    salaryNumber: 205,
    employmentType: "계약직",
    deadline: "2026-06-05",
    link: "https://www.work.go.kr",
    description: "식품 포장, 제품 검수, 작업장 정리 업무"
  }
];

const regionFilter = document.getElementById("regionFilter");
const jobTypeFilter = document.getElementById("jobTypeFilter");
const sortFilter = document.getElementById("sortFilter");
const jobList = document.getElementById("jobList");
const jobCount = document.getElementById("jobCount");

function calculateFitScore(job) {
  let score = 0;

  if (job.education.includes("고졸") || job.education.includes("학력무관")) {
    score += 30;
  }

  if (job.career.includes("신입") || job.career.includes("경력 관계없음")) {
    score += 30;
  }

  if (job.employmentType === "정규직") {
    score += 15;
  }

  if (job.salaryNumber >= 220) {
    score += 15;
  }

  if (isDeadlineWithin7Days(job.deadline)) {
    score += 10;
  }

  return Math.min(score, 100);
}

function isDeadlineWithin7Days(deadline) {
  const today = new Date("2026-05-06");
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 && diffDays <= 7;
}

function getRecommendText(score) {
  if (score >= 80) return "바로 지원 추천";
  if (score >= 60) return "조건 확인 추천";
  return "신중히 확인";
}

function getRecommendClass(score) {
  if (score >= 80) return "high";
  if (score >= 60) return "middle";
  return "low";
}

function makeEasyDescription(job) {
  const typeMap = {
    "IT/개발": "컴퓨터와 웹 서비스를 다루는 일입니다.",
    "사무/회계": "문서, 엑셀, 자료 정리를 주로 하는 일입니다.",
    "생산/품질": "제품을 만들거나 상태를 확인하는 일입니다.",
    "디자인": "이미지, 홍보물, 콘텐츠를 보기 좋게 만드는 일입니다.",
    "물류": "상품 입고, 출고, 재고를 관리하는 일입니다."
  };

  return `${job.company}에서 ${typeMap[job.jobType] || "실무를 배우며 일하는 공고입니다"} ${job.career}도 지원 가능하고, ${job.education} 조건입니다.`;
}

function makeTags(job) {
  const tags = [];

  if (job.education.includes("고졸")) tags.push("고졸가능");
  if (job.education.includes("학력무관")) tags.push("학력무관");
  if (job.career.includes("신입")) tags.push("신입가능");
  if (job.career.includes("경력 관계없음")) tags.push("경력무관");
  if (job.employmentType === "정규직") tags.push("정규직");
  if (job.salaryNumber >= 220) tags.push("월 220만원 이상");

  return tags;
}

function renderJobs() {
  const selectedRegion = regionFilter.value;
  const selectedJobType = jobTypeFilter.value;
  const selectedSort = sortFilter.value;

  let filteredJobs = jobs.map(job => ({
    ...job,
    score: calculateFitScore(job)
  }));

  if (selectedRegion !== "전체") {
    filteredJobs = filteredJobs.filter(job => job.region === selectedRegion);
  }

  if (selectedJobType !== "전체") {
    filteredJobs = filteredJobs.filter(job => job.jobType === selectedJobType);
  }

  if (selectedSort === "score") {
    filteredJobs.sort((a, b) => b.score - a.score);
  }

  if (selectedSort === "deadline") {
    filteredJobs.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  if (selectedSort === "salary") {
    filteredJobs.sort((a, b) => b.salaryNumber - a.salaryNumber);
  }

  jobCount.textContent = filteredJobs.length;

  if (filteredJobs.length === 0) {
    jobList.innerHTML = `
      <div class="empty">
        조건에 맞는 공고가 없습니다. 필터를 다시 선택해보세요.
      </div>
    `;
    return;
  }

  jobList.innerHTML = filteredJobs.map(job => {
    const tags = makeTags(job);
    const recommendText = getRecommendText(job.score);
    const recommendClass = getRecommendClass(job.score);

    return `
      <article class="job-card">
        <div class="card-top">
          <div>
            <p class="company">${job.company}</p>
            <h3 class="title">${job.title}</h3>
          </div>

          <div class="score-badge">
            <div>
              <span>${job.score}</span>
              <small>적합도</small>
            </div>
          </div>
        </div>

        <div class="recommend ${recommendClass}">
          ${recommendText}
        </div>

        <p class="easy-desc">
          ${makeEasyDescription(job)}
        </p>

        <div class="info-grid">
          <div class="info-item">
            <small>지역</small>
            <strong>${job.region}</strong>
          </div>
          <div class="info-item">
            <small>직무</small>
            <strong>${job.jobType}</strong>
          </div>
          <div class="info-item">
            <small>급여</small>
            <strong>${job.salary}</strong>
          </div>
          <div class="info-item">
            <small>고용형태</small>
            <strong>${job.employmentType}</strong>
          </div>
        </div>

        <div class="tags">
          ${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>

        <div class="card-bottom">
          <span class="deadline">마감일 ${job.deadline}</span>
          <a class="worknet-btn" href="${job.link}" target="_blank" rel="noopener noreferrer">
            워크넷에서 보기
          </a>
        </div>
      </article>
    `;
  }).join("");
}

regionFilter.addEventListener("change", renderJobs);
jobTypeFilter.addEventListener("change", renderJobs);
sortFilter.addEventListener("change", renderJobs);

renderJobs();