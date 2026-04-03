const starField = document.querySelector("#stars");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#site-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const revealItems = document.querySelectorAll("[data-reveal]");
const sections = Array.from(document.querySelectorAll("main section[id]"));
const yearTarget = document.querySelector("[data-year]");
const chatbotPanel = document.querySelector("#chatbot-panel");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotClose = document.querySelector(".chatbot-close");
const chatbotForm = document.querySelector("#chatbot-form");
const chatbotInput = document.querySelector("#chatbot-input");
const chatbotMessages = document.querySelector("#chatbot-messages");
const chatbotPromptButtons = Array.from(
  document.querySelectorAll("[data-chat-prompt]")
);

const interviewAnswers = [
  {
    keywords: [
      "about",
      "introduce",
      "yourself",
      "background",
      "education",
      "school",
      "degree",
      "study",
      "studied",
      "computer engineering",
      "who are you",
      "summary",
    ],
    answer:
      "I'm Adrian Charles, a 4th-year Computer Engineering student at Queen's University. My experience sits at the intersection of software, data, and cloud engineering, and I'm especially interested in building reliable internal tools, data workflows, and practical systems that make engineering work easier.",
  },
  {
    keywords: [
      "experience",
      "ge vernova",
      "intern",
      "work",
      "job",
      "professional",
      "report",
      "dashboard",
      "php",
      "mysql",
      "sql",
      "html",
      "css",
      "javascript",
    ],
    answer:
      "At GE Vernova, I worked as an Engineering Intern across two summers in Peterborough. In 2024, I designed a PHP report-generation tool, built a standardized HTML/CSS web UI, maintained internal tools, and collaborated with stakeholders on data-driven engineering workflows. In 2023, I developed full-stack internal tools with PHP, MySQL, and JavaScript, including a Customer Service Dashboard and a Document Locator Tool, and designed relational data models and SQL queries for better data access.",
  },
  {
    keywords: [
      "teaching",
      "ta",
      "queen",
      "students",
      "c programming",
      "mentoring",
      "communication",
    ],
    answer:
      "I was a Teaching Assistant for Intro to Computer Programming at Queen's University, where I supported first-year engineering students with C programming, debugging, and algorithmic problem solving. I also graded assignments and gave technical feedback, which strengthened my ability to explain complex concepts clearly to beginner and non-technical audiences.",
  },
  {
    keywords: [
      "project",
      "nba",
      "etl",
      "aws",
      "resume ats",
      "portfolio",
      "built",
    ],
    answer:
      "My featured project is an end-to-end NBA ETL pipeline that collects, transforms, and presents performance insights through a Streamlit app. I'm also working on a Resume ATS Scanner and an AWS Cloud Engineer Agent project, which reflect my interest in applied data tooling and cloud automation.",
  },
  {
    keywords: [
      "skill",
      "stack",
      "technology",
      "technical",
      "language",
      "tools",
      "strength",
      "php",
      "mysql",
      "sql",
      "javascript",
      "java",
      "html",
      "css",
    ],
    answer:
      "My core technical stack includes PHP, MySQL, SQL, JavaScript, HTML, CSS, Java, and C. My strongest areas are building internal web tools, structuring data with relational models and SQL, debugging and improving deployed systems, and translating operational requirements into usable software.",
  },
  {
    keywords: [
      "why hire",
      "why should",
      "strengths",
      "value",
      "fit",
      "team",
      "ownership",
    ],
    answer:
      "I'd bring a mix of hands-on software experience, ownership, and communication. I've built internal tools used by engineers, improved reliability in existing systems, collaborated with stakeholders, and taught programming concepts as a TA. That combination helps me learn quickly, contribute steadily, and explain technical work clearly to different audiences.",
  },
  {
    keywords: [
      "goal",
      "future",
      "career",
      "internship",
      "data engineer",
      "cloud",
      "looking for",
    ],
    answer:
      "I'm currently looking for internship opportunities where I can contribute as an engineering student while growing toward my long-term goal of becoming a professional data engineer. I'm especially drawn to roles involving software systems, data pipelines, cloud tooling, and practical engineering problem solving.",
  },
  {
    keywords: ["contact", "email", "linkedin", "github", "reach", "connect"],
    answer:
      "You can reach me by email at adrian6charles23@gmail.com, connect with me on LinkedIn at linkedin.com/in/adrian-charles-6a8991253, or view my GitHub at github.com/AdrianCharless.",
  },
];

const fallbackAnswer =
  "I can answer interview-style questions about my background, GE Vernova experience, Queen's TA role, technical skills, projects, career goals, or contact details. Try asking something like: \"Why should we hire you?\" or \"Tell me about your ETL project.\"";

if (starField) {
  const starCount = window.innerWidth < 768 ? 36 : 58;

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("span");
    const size = (Math.random() * 1.8 + 0.6).toFixed(2);
    const duration = (Math.random() * 7 + 6).toFixed(2);
    const delay = (Math.random() * 8).toFixed(2);

    star.className = "star";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${(Math.random() * 100).toFixed(2)}%`;
    star.style.top = `${(Math.random() * 78).toFixed(2)}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;
    star.style.opacity = `${(Math.random() * 0.48 + 0.18).toFixed(2)}`;

    starField.appendChild(star);
  }
}

const closeMenu = () => {
  if (!menuToggle || !navMenu) {
    return;
  }

  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
};

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const syncActiveNav = () => {
  const scrollPosition = window.scrollY + 180;
  let activeId = sections[0]?.id ?? "";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
};

window.addEventListener("scroll", syncActiveNav, { passive: true });
window.addEventListener("load", syncActiveNav);

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const addChatMessage = (message, sender) => {
  if (!chatbotMessages) {
    return null;
  }

  const bubble = document.createElement("p");
  bubble.className = `chat-message chat-message--${sender}`;
  bubble.textContent = message;
  chatbotMessages.appendChild(bubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  return bubble;
};

const getInterviewReply = (question) => {
  const normalizedQuestion = question.trim().toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  interviewAnswers.forEach((entry) => {
    const score = entry.keywords.reduce((total, keyword) => {
      return normalizedQuestion.includes(keyword) ? total + keyword.length : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  return bestScore > 0 && bestMatch ? bestMatch.answer : fallbackAnswer;
};

const setChatbotOpen = (isOpen) => {
  if (!chatbotPanel || !chatbotToggle) {
    return;
  }

  chatbotPanel.classList.toggle("is-open", isOpen);
  chatbotPanel.setAttribute("aria-hidden", String(!isOpen));
  chatbotToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    window.setTimeout(() => chatbotInput?.focus(), 180);
  }
};

const submitChatbotPrompt = (prompt) => {
  const cleanPrompt = prompt.trim();

  if (!cleanPrompt) {
    return;
  }

  addChatMessage(cleanPrompt, "user");
  const typingBubble = addChatMessage("Thinking...", "bot");

  if (typingBubble) {
    typingBubble.classList.add("is-typing");
  }

  window.setTimeout(() => {
    if (!typingBubble) {
      return;
    }

    typingBubble.textContent = getInterviewReply(cleanPrompt);
    typingBubble.classList.remove("is-typing");
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 420);
};

if (chatbotPanel && chatbotToggle && chatbotForm && chatbotInput && chatbotMessages) {
  addChatMessage(
    "Hi, I'm Adrian AI. Ask me interview questions about my experience, projects, technical skills, or career goals.",
    "bot"
  );

  chatbotToggle.addEventListener("click", () => {
    const shouldOpen = !chatbotPanel.classList.contains("is-open");
    setChatbotOpen(shouldOpen);
  });

  chatbotClose?.addEventListener("click", () => setChatbotOpen(false));

  chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const prompt = chatbotInput.value;
    chatbotInput.value = "";
    submitChatbotPrompt(prompt);
  });

  chatbotPromptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setChatbotOpen(true);
      submitChatbotPrompt(button.dataset.chatPrompt ?? "");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setChatbotOpen(false);
    }
  });
}
