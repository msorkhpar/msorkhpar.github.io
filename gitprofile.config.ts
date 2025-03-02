// gitprofile.config.ts

const CONFIG = {
  github: {
    username: "msorkhpar" // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: "/",
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: "Github Projects",
      mode: "manual", // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: "updated", // Sort projects by 'stars' or 'updated'
        limit: 4, // How many projects to display.
        exclude: {
          forks: true, // Forked projects will not be displayed if set to true.
          projects: [] // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        }
      },
      manual: {
        // Properties for manually specifying projects
        projects: [
          "msorkhpar/wiki-entity-summarization",
          "msorkhpar/wiki-entity-summarization-preprocessor",
          "msorkhpar/wiki-entity-summarization-toolkit",
          "msorkhpar/neo4j-bootcamp",
          "msorkhpar/energy-barrier-problem"
        ] // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      }
    },
    external: {
      header: "Projects",
      // To hide the `External Projects` section, keep it empty.
      projects: []
    }
  },
  seo: {
    title: "Mohammad 'Mo' Sorkhpar (msorkhpar), a Senior Software Engineer based in Dallas.",
    description: "Software Engineer, 8+ years in Java, Python, Spring, and cloud techs.",
    imageURL: "https://raw.githubusercontent.com/msorkhpar/msorkhpar/main/Who-I-am.png",
    schema: {
      "@context": "http://schema.org",
      "@type": "Person",
      name: "Mo Sorkhpar",
      alternateName: [
        "Mohammad Sorkhpar",
        "Mohammad.K Sorkhpar",
        "msorkhpar",
        "Sorkhpar",
        "محمد سرخ‌پر",
        "محمد کاظم سرخ‌پر",
        "سرخ‌پر"
      ],
      email: "msorkhpar@outlook.com",
      familyName: "Sorkhpar",
      givenName: "Mo",
      knowsLanguage: ["English", "Persian"],
      jobTitle: "Senior Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Indiana State University"
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Indiana State University"
      },
      url: "https://sorkhpar.dev",
      image: "https://raw.githubusercontent.com/msorkhpar/msorkhpar/main/Who-I-am.png",
      sameAs: [
        "http://www.linkedin.com/in/msorkhpar",
        "http://www.github.com/msorkhpar",
        "http://msorkhpar.github.io/",
        "https://scholar.google.com/citations?user=1M5LFmIAAAAJ",
        "https://orcid.org/0009-0006-2856-9225",
        "https://www.researchgate.net/profile/Mo-Sorkhpar"
      ],
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "75230",
          addressLocality: "Dallas",
          addressRegion: "TX"
        }
      }
    }
  },
  social: {
    linkedin: "msorkhpar",
    twitter: "",
    mastodon: "",
    researchGate: "",
    googleScholar: { name: "Mo Sorkhpar", user: "1M5LFmIAAAAJ" },
    facebook: "",
    instagram: "",
    reddit: "",
    threads: "",
    youtube: "", // example: 'pewdiepie'
    udemy: "",
    dribbble: "",
    behance: "",
    medium: "",
    dev: "",
    stackoverflow: "", // example: '1/jeff-atwood'
    skype: "",
    telegram: "",
    website: "",
    phone: "",
    email: "msorkhpar@outlook.com"
  },
  resume: {
    fileUrl: "https://raw.githubusercontent.com/msorkhpar/msorkhpar/main/Mo-Sorkhpar-Resume.pdf" // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    "Java",
    "Python",
    "OOP",
    "Design Patterns",
    "Spring Boot",
    "Docker",
    "Kubernetes",
    "Microservices",
    "RESTful API",
    "RabbitMQ",
    "Apache Kafka",
    "PostgreSQL",
    "Orcale DB",
    "MongoDB",
    "Neo4j",
    "Redis",
    "Hibernate",
    "JPA",
    "Maven",
    "Gradle",
    "NetowrkX",
    "Junit",
    "Mockito",
    "Cucumber",
    "TestContainers",
    "Jenkins",
    "Gitlab CI/CD",
    "Bitbucket",
    "Jira",
    "Git"
  ],
  banner: {
    imageURL: "https://raw.githubusercontent.com/msorkhpar/msorkhpar/main/Who-I-am-large.gif",
    name: "Mo Sorkhpar Portfolio"
  },
  experiences: [
    {
      company: "Ascendion",
      position: "Senior Java Developer",
      from: "09/2024",
      to: "Present",
      logo: "/logos/0.png",
      companyLink: "https://ascendion.com/",
      achievements: [
        "Contributed to existing card authentication systems that process ISO-8583 messages for one of the top 5 U.S. Credit Card Companies serving over 10 partners. Familiarizing with complex transaction routing logic, authentication mechanisms, and format conversion across multiple partnerships and payload types, including Mastercard, Visa, and others.",
        "Participated as a Scrum team member in adopting a major project to integrate a new card network, actively deploying, cloning, modifying, testing, and refactoring existing flows. Ensured new payload and network requirements aligned seamlessly with current architecture while maintaining system integrity.",
        "Developed an innovative IntelliJ plugin to interpret and auto-complete the internal custom CI/CD syntax.",
        "Utilized Java 17, Spring, jPOS (ISO-8583), AWS, BDD with Cucumber, JUnit, Shell scripting, Docker, Maven, Wiremock, Splunk, Mockito,  Jira, Confluence, and GitHub."
      ]
    },
    {
      company: "Indiana State University",
      position: "Senior Software Engineer",
      from: "06/2024",
      to: "09/2024",
      logo: "/logos/1.png",
      companyLink: "https://cs.indstate.edu",
      achievements: [
        "Led the development of a large-scale dataset generator, orchestrating an ETL process that extracted 150GB of raw data, transformed data using advanced NLP techniques and graph sampling algorithms to optimize data quality and relevance, and loaded the refined data into databases, resulting in a high-quality knowledge graph with 58 million nodes and 330 million edges.",
        "Developed an unsupervised entity summarization model leveraging Relational Graph Convolutional Networks (RGCN), achieving a 5% increase in accuracy by utilizing indirect relationships. (Under review)",
        "Collaborated in developing a graph-aware unsupervised model, leveraging knowledge graph structures and multi-semantic information, achieving a 6% increase in accuracy over existing models. (Under review)",
        "Developed a Mixed Integer Programming solver to address the optimal vertex ordering problem in bipartite graphs, leveraging Python, NetworkX, and PostgreSQL to translate complex models into efficient, real-world solutions."
      ]
    },
    {
      company: "Intellias",
      position: "Senior Software Engineer",
      from: "10/2021",
      to: "06/2022",
      logo: "/logos/2.png",
      companyLink: "https://intellias.com",
      achievements: [
        "Developed a reactive microservices-based sales platform for a telecom’s ePOS system using Kotlin, Spring, MongoDB, Oracle DB, Kubernetes, and Apache Wicket, enhancing operational efficiency across 3,000 retail branches.",
        "Implemented a cost-effective contract service solution, replacing an expensive licensing model with an open-source tool. This yielded an annual savings of $10,000 and maintained system adaptability for future infrastructure changes.",
        "Orchestrated a team of 8 in a scrum-based environment, collaborating with over 70 developers."
      ]
    },
    {
      company: "Routetitan",
      position: "Senior Software Engineer",
      from: "04/2021",
      to: "09/2021",
      logo: "/logos/3.png",
      companyLink: "https://routetitan.com",
      achievements: [
        "Spearheaded the back-end development of a Route Optimizer application, enhancing delivery efficiency by solving up to 5000 vehicle routing problems daily with Java, Quarkus, PostgreSQL, MongoDB, and Stripe API. Achieved a groundbreaking improvement in system performance, reducing load times from 1800ms to 200ms.",
        "Persuaded the team to adopt a strategic pivot to a Product-as-a-Service (PaaS) model, fostering Routetitan’s growth by optimizing resource allocation, aligning business processes with market demands, and establishing an innovative and competitive path.",
        "Led the deployment architecture overhaul using Terraform and Gitlab CI, integrating Hetzner-Cloud, GCP, and AWS, which optimized deployment processes and significantly cut operational costs.",
        "Note: I continued working with this company till 06/2022 as a part-time software consultant."
      ]
    },
    {
      company: "Devolon",
      position: "Senior Backend Developer",
      from: "02/2020",
      to: "02/2021",
      logo: "/logos/4.png",
      companyLink: "https://www.devolon.fi/",
      achievements: [
        "Architected and developed a fintech platform for children's financial management using microservices-based architecture, serving as an issuer for multiple branded card programs.",
        "Designed sophisticated parental control features, including transaction monitoring, approval workflows, and programmable allowance systems.",
        "Implemented comprehensive REST APIs and ISO-8583 message handling for mobile clients and partner companies, enabling seamless integration with the Mastercard network.",
        "Utilized Java, Spring, Quarkus, JPA, jPOS, PostgreSQL, AWS, Spock, JUnit, Mockito, LocalStack, Grafana, Bitbucket, Jira."
      ]
    },
    {
      company: "Farazpardazan",
      position: "Senior Software Engineer",
      from: "12/2016",
      to: "01/2020",
      logo: "/logos/5.png",
      companyLink: "https://www.farazpardazan.com",
      achievements: [
        "Delivered the Hamrahcard Payment Assistant application, overseeing its growth to over 12 million users and managing 2 million daily financial transactions. This marked a significant contribution to the company’s portfolio and user base expansion.",
        "Enhanced SQL query performance, achieving a 90% improvement in report generation speed and reduced execution times for complex queries, boosting system responsiveness and user satisfaction.",
        "Implemented and maintained a robust suite of internal services supporting continuous integration and continuous delivery pipelines, including Jira, Gitlab, Gitlab CI/CD, Nginx, SonarQube, Artifactory, and Nexus, laying the foundation for agile development practices.",
        "Directed the development of a Personal Financial Management application as Product Owner, overseeing a scrum team of 6. Achieved a milestone of 500K active users by enhancing user engagement and product features.",
        "Streamlined the software development life cycle by integrating System Requirements Specifications (SRS), wireframes, UI designs, and API contracts, significantly improving efficiency and clarity in production processes."
      ]
    },
    {
      company: "PartGames Studio",
      position: "Java Back-end Developer",
      from: "01/2015",
      to: "11/2016",
      logo: "/logos/6.png",
      companyLink: "https://www.partgames.com",
      achievements: [
        "Crafted a high-performance back-end service for an online physics game with 230K players, utilizing Java, Spring, MySQL, Redis, Vaadin, and WebSocket. Introduced comprehensive features, including real-time interactions, payment management, and a versatile back-office system for user and parameter management.",
        "Created and commercialized a scalable leaderboard management service, handling up to 5,000 requests per minute for 7 multiplayer games. This innovation extended beyond studio use, offering an API to external services and marking a significant contribution to the studio’s technological portfolio."
      ]
    }
  ],
  certifications: [],
  educations: [
    {
      institution: "Indiana State University",
      degree: "Master of Science in Computer Science",
      from: "",
      to: ""
    },
    {
      institution: "University of Mazandaran",
      degree: "Bachelor of Engineering in Information Technology",
      from: "",
      to: ""
    }
  ],
  publications: [
     {
      title: "Untapping the Power of Indirect Relationships in Entity Summarization",
      conferenceName: "WSDM 2025",
      journalName: "",
      authors: "Atefeh Moradan, Mohammad Sorkhpar, Atsushi Miyauchi, Davide Mottin, Ira Assent",
      link: "https://doi.org/10.1145/3701551.3703566",
      description:
        "Knowledge graphs form large networks of millions of entities (e.g., Michelle Obama, Barack Obama) and relationships (e.g., married). To obtain an overview of the entity, we need to inspect a potentially large number of relationships to other entities. For this reason, entity summarization aims to extract succinct but expressive descriptions of each entity. Yet, existing methods build their summaries only based on the immediate connections of an entity, disregarding how indirect relationships contain essential information for describing the entity (e.g., understanding Michelle Obama also via her husband's role as former president). We propose IRES, an unsupervised entity summarization method built on graph theoretical principles. We draw a notable connection between the informativeness of a summary and graph partitioning, and devise an effective approach to learn diverse aspects that characterize an entity. In a comprehensive experimental study, IRES shows superior summary quality. In particular, when full neighborhood information is available, IRES outperforms existing methods by 6 percentage points F1 while maintaining competitive computational efficiency."
    },
    {
      title: "Wiki Entity Summarization Benchmark",
      conferenceName: "Preprint",
      journalName: "",
      authors: "Saeedeh Javadi*, Atefeh Moradan*, Mohammad Sorkhpar*, Klim Zaporojets, Davide Mottin & Ira Assent (* as equal contribution)",
      link: "https://doi.org/10.48550/arXiv.2406.08435",
      description:
        "Entity summarization aims to compute concise summaries for entities in knowledge graphs. Existing datasets and benchmarks are often limited to a few hundred entities and discard graph structure in source knowledge graphs. This limitation is particularly pronounced when it comes to ground-truth summaries, where there exist only a few labeled summaries for evaluation and training. We propose WikES, a comprehensive benchmark comprising of entities, their summaries, and their connections. Additionally, WikES features a dataset generator to test entity summarization algorithms in different areas of the knowledge graph. Importantly, our approach combines graph algorithms and NLP models as well as different data sources such that WikES does not require human annotation, rendering the approach cost-effective and generalizable to multiple domains. Finally, WikES is scalable and capable of capturing the complexities of knowledge graphs in terms of topology and semantics. WikES features existing datasets for comparison. Empirical studies of entity summarization methods confirm the usefulness of our benchmark."
    },
    {
      title: "Vertex Ordering with Precedence Constraints",
      conferenceName: "FCT 2023",
      journalName: "",
      authors: "Jeff Kinne, Akbar Rafiey, Arash Rafiey & Mohammad Sorkhpar (alphabetical order)",
      link: "https://doi.org/10.1007/978-3-031-43587-4_22",
      description:
        "We study bipartite graph ordering problem, which arises in various domains such as production management, bioinformatics, and job scheduling with precedence constraints. In the bipartite vertex ordering problem, we are given a bipartite graph H=(B,S,E) where each vertex in B has a cost and each vertex in S has a profit. The goal is to find a minimum K together with an ordering < of the vertices of H, so that i<j whenever i∈B is adjacent to j∈S . Moreover, at each sub-order the difference between the costs and profits of the vertices in the sub-order does not exceed K."
    }
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: "", // medium | dev
    username: "", // to hide blog section, keep it empty
    limit: 0 // How many articles to display. Max is 10.
  },
  clarity: {
    id: "" // Clarity analytics tracking id. e.g. '
  },
  googleAnalytics: {
    id: "G-RJ2GES11E6" // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: "",
    snippetVersion: 6
  },
  themeConfig: {
    defaultTheme: "procyon",

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      "procyon"
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: "rgba(113,206,109,0.68)",
      "base-100": "rgba(31,31,37,0.09)",
      "base-400": "rgba(233,233,253,0.09)",
      "--rounded-box": "1rem",
      "--rounded-btn": "1rem"
    }
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a 
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,
  enablePWA: false
};

export default CONFIG;
